import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
    let { message } = err;
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    const response = {
        error: message || "Server Error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    };

    logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    res.status(statusCode).json(response);
};

export default errorHandler;
