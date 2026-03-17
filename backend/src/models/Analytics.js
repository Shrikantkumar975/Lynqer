import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
    url: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "URL",
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    ip: String,
    userAgent: String,
    browser: String,
    os: String,
    device: String,
    country: String,
    referrer: String,
});

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;
