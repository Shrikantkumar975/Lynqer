import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

export const registerUserService = async ({ name, email, password }) => {
    if (!name || !email || !password) {
        throw new Error("Please fill all fields");

    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new Error("User already exists");
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        return {
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        };
    } else {
        throw new Error("Invalid user data");
    }
};

export const loginUserService = async ({ email, password, captchaToken }) => {
    // Check for user email
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Check if account is locked
    if (user.isLocked) {
        throw new Error("Account is temporarily locked due to multiple failed login attempts. Please try again later.");
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        user.loginAttempts += 1;
        if (user.loginAttempts >= 5) {
            user.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // Lock for 15 minutes
        }
        await user.save();

        const msg = user.loginAttempts >= 5
            ? "Account is temporarily locked due to multiple failed login attempts. Please try again later."
            : "Invalid email or password";

        const error = new Error(msg);
        // Flag for frontend to show CAPTCHA
        if (user.loginAttempts >= 3 && user.loginAttempts < 5) {
            error.captchaRequired = true;
        }
        throw error;
    }

    // Password matches. Now check CAPTCHA if attempts >= 3
    if (user.loginAttempts >= 3) {
        // Placeholder CAPTCHA validation for demonstration purposes
        if (!captchaToken || captchaToken !== "valid_dummy_captcha") {
            const error = new Error("Please complete the CAPTCHA to verify you are human.");
            error.captchaRequired = true;
            throw error;
        }
    }

    // Successful login: reset attempts
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    return {
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
    };
};
