import { nanoid } from "nanoid";
import validator from "validator";
import * as cheerio from "cheerio";
import useragent from "useragent";
import URL from "../models/URL.js";
import Analytics from "../models/Analytics.js";
import redis from "../config/redis.js";
import logger from "../utils/logger.js";

const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;

export const shortenUrlService = async ({ longUrl, customAlias, expiresAt, user }) => {
    if (!longUrl || !validator.isURL(longUrl)) {
        throw new Error("Invalid URL provided");
    }

    let shortId;
    let finalExpiresAt = expiresAt ? new Date(expiresAt) : null;

    // Feature Restrictions
    if (!user) {
        // GUEST USER
        const tenDaysFromNow = new Date();
        tenDaysFromNow.setDate(tenDaysFromNow.getDate() + 10);
        finalExpiresAt = tenDaysFromNow;

        if (customAlias) throw new Error("Login required for Custom Aliases");
        if (expiresAt) throw new Error("Login required for Custom Expiration Dates");

        shortId = nanoid(6);
    } else {
        // LOGGED-IN USER
        if (customAlias) {
            const aliasRegex = /^[a-zA-Z0-9-_]+$/;
            if (!aliasRegex.test(customAlias)) throw new Error("Invalid alias format");

            const existing = await URL.findOne({ shortId: customAlias });
            if (existing) throw new Error("Alias already in use");

            shortId = customAlias;
        } else {
            shortId = nanoid(6);
        }
    }

    // Fetch OG Data
    let ogTitle, ogDescription, ogImage;
    try {
        const response = await fetch(longUrl);
        const html = await response.text();
        const $ = cheerio.load(html);
        ogTitle = $('meta[property="og:title"]').attr('content') || $('title').text();
        ogDescription = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content');
        ogImage = $('meta[property="og:image"]').attr('content');
    } catch (err) {
        logger.error(`Failed to fetch OG data: ${err.message}`);
    }

    const newUrl = await URL.create({
        shortId,
        longUrl,
        user: user ? user._id : null,
        expiresAt: finalExpiresAt,
        ogTitle,
        ogDescription,
        ogImage,
    });

    return { shortUrl: `${BASE_URL}/${shortId}` };
};

export const getUrlForRedirectService = async (shortId, ip, userAgentHeaders) => {
    // 1. Check Cache
    const cachedUrl = await redis.get(`short:${shortId}`);

    if (cachedUrl) {
        // Fire-and-forget Analytics Update
        (async () => {
            try {
                await URL.updateOne(
                    { shortId },
                    {
                        $inc: { clicks: 1 },
                        $push: {
                            analytics: {
                                timestamp: new Date(),
                                ip,
                                userAgent: userAgentHeaders
                            }
                        }
                    }
                );
            } catch (err) {
                logger.error(`Analytics update failed: ${err.message}`);
            }
        })();
        return { longUrl: cachedUrl, isCached: true };
    }

    // 2. Database Lookup
    const data = await URL.findOne({ shortId });
    if (!data) return null;

    // Check expiration
    if (data.expiresAt) {
        const now = new Date();
        if (now > data.expiresAt) {
            throw new Error("This link has expired");
        }
    }

    return { data, isCached: false };
};

export const processClickAnalyticsService = async (data, ip, userAgentHeaders, referrer) => {
    // 3. Set Cache (Expiration: 1 hour)
    await redis.set(`short:${data.shortId}`, data.longUrl, { EX: 3600 });

    // Increment clicks
    data.clicks++;
    await data.save();

    // Fire-and-forget Advanced Analytics
    (async () => {
        try {
            const agent = useragent.parse(userAgentHeaders);
            await Analytics.create({
                url: data._id,
                ip,
                userAgent: userAgentHeaders,
                browser: agent.toAgent(),
                os: agent.os.toString(),
                device: agent.device.toString(),
                referrer: referrer || 'Direct'
            });
        } catch (err) {
            logger.error(`Analytics logging failed: ${err.message}`);
        }
    })();
};

export const getAnalyticsService = async (shortId, userId) => {
    const urlDoc = await URL.findOne({ shortId });

    if (!urlDoc) throw new Error("URL not found");

    if (urlDoc.user && (!userId || urlDoc.user.toString() !== userId.toString())) {
        throw new Error("Unauthorized to view analytics");
    }

    // Aggregate Analytics Data
    const analyticsData = await Analytics.aggregate([
        { $match: { url: urlDoc._id } },
        {
            $facet: {
                totalClicks: [{ $count: "count" }],
                byBrowser: [
                    { $group: { _id: "$browser", count: { $sum: 1 } } },
                    { $sort: { count: -1 } }
                ],
                byOS: [
                    { $group: { _id: "$os", count: { $sum: 1 } } },
                    { $sort: { count: -1 } }
                ],
                byDevice: [
                    { $group: { _id: "$device", count: { $sum: 1 } } },
                    { $sort: { count: -1 } }
                ],
                recentActivity: [
                    { $sort: { timestamp: -1 } },
                    { $limit: 20 },
                    { $project: { ip: 0 } }
                ]
            }
        }
    ]);

    const result = analyticsData[0];
    return {
        ...urlDoc.toObject(),
        analytics: {
            totalClicks: result.totalClicks[0] ? result.totalClicks[0].count : 0,
            byBrowser: result.byBrowser,
            byOS: result.byOS,
            byDevice: result.byDevice,
            recentActivity: result.recentActivity
        }
    };
};

export const getUserUrlsService = async (userId) => {
    return await URL.find({ user: userId }).sort({ createdAt: -1 });
};

export const deleteUrlService = async (id, userId) => {
    const url = await URL.findById(id);
    if (!url) throw new Error("URL not found");
    if (url.user.toString() !== userId.toString()) {
        throw new Error("Unauthorized");
    }
    await url.deleteOne();
    return { message: "URL deleted" };
};
