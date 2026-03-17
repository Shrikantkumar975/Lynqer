
import {
    shortenUrlService,
    getUrlForRedirectService,
    processClickAnalyticsService,
    getAnalyticsService,
    getUserUrlsService,
    deleteUrlService
} from "../services/urlService.js";

// @desc    Create Short URL
// @route   POST /shorten
// @access  Optional Auth
export const shortenUrl = async (req, res, next) => {
    try {
        const result = await shortenUrlService({
            ...req.body,
            user: req.user
        });
        res.json(result);
    } catch (error) {
        if (error.message === "Invalid URL provided" || error.message === "Invalid alias format" || error.message === "Alias already in use") {
            res.status(400);
        } else if (error.message.includes("Login required")) {
            res.status(403);
        } else if (error.code === 11000) {
            res.status(400);
            return next(new Error("Alias already in use"));
        }
        next(error);
    }
};

// @desc    Redirect to Long URL
// @route   GET /:shortId
// @access  Public
export const redirectUrl = async (req, res, next) => {
    try {
        const { shortId } = req.params;
        const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;

        const result = await getUrlForRedirectService(shortId, req.ip, req.headers["user-agent"]);

        if (result && result.isCached) {
            return res.redirect(result.longUrl);
        }

        if (!result) {
            return res.status(404).send("URL Not Found");
        }

        const { data } = result;

        // Bot Detection
        const userAgent = req.headers["user-agent"] || "";
        const isBot = /facebookexternalhit|twitterbot|linkedinbot|whatsapp|discordbot|telegrambot/i.test(userAgent);

        if (isBot) {
            return res.send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <meta property="og:title" content="${data.ogTitle || 'Shortened URL'}" />
                    <meta property="og:description" content="${data.ogDescription || 'Click to visit the link.'}" />
                    <meta property="og:image" content="${data.ogImage || ''}" />
                    <meta property="og:url" content="${BASE_URL}/${data.shortId}" />
                </head>
                <body></body>
            </html>
            `);
        }

        // Process Analytics (Set Cache, DB Update)
        await processClickAnalyticsService(data, req.ip, req.headers["user-agent"], req.get('Referrer'));

        res.redirect(data.longUrl);
    } catch (error) {
        if (error.message === "This link has expired") {
            return res.status(410).send("This link has expired");
        }
        next(error);
    }
};

// @desc    Get Analytics
// @route   GET /analytics/:shortId
// @access  Protected
export const getAnalytics = async (req, res, next) => {
    try {
        const result = await getAnalyticsService(req.params.shortId, req.user ? req.user._id : null);
        res.json(result);
    } catch (error) {
        if (error.message === "URL not found") {
            res.status(404);
        } else if (error.message === "Unauthorized to view analytics") {
            res.status(403);
        }
        next(error);
    }
};

// @desc    Get All URLs for User
// @route   GET /urls
// @access  Protected
export const getUserUrls = async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(401);
            throw new Error("Unauthorized");
        }
        const urls = await getUserUrlsService(req.user._id);
        res.json(urls);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete URL
// @route   DELETE /urls/:id
// @access  Protected
export const deleteUrl = async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(401);
            throw new Error("Unauthorized");
        }
        const result = await deleteUrlService(req.params.id, req.user._id);
        res.json(result);
    } catch (error) {
        if (error.message === "URL not found") {
            res.status(404);
        } else if (error.message === "Unauthorized") {
            res.status(403);
        }
        next(error);
    }
};
