import { registerUserService, loginUserService } from "../services/authService.js";

// @desc    Register new user
// @route   POST /auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
    try {
        const user = await registerUserService(req.body);
        res.status(201).json(user);
    } catch (error) {
        // Map error message to status code if possible, or let errorHandler handle it
        if (error.message === "User already exists" || error.message === "Please fill all fields") {
            res.status(400);
        }
        next(error);
    }
};

// @desc    Authenticate a user
// @route   POST /auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
    try {
        const user = await loginUserService(req.body);
        res.json(user);
    } catch (error) {
        if (
            error.message.includes("Invalid email or password") ||
            error.message.includes("CAPTCHA") ||
            error.message.includes("locked")
        ) {
            return res.status(401).json({
                message: error.message,
                captchaRequired: error.captchaRequired || false
            });
        }
        next(error);
    }
};
