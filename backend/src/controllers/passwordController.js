import Password from "../models/Password.js";

export const savePassword = async (req, res) => {
    try {
        const { alias, password } = req.body;
        if (!alias || !password) {
            return res.status(400).json({ error: "Alias and password are required" });
        }

        const newPassword = new Password({
            userId: req.user._id,
            alias,
            password
        });

        await newPassword.save();
        res.status(201).json(newPassword);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

export const getPasswords = async (req, res) => {
    try {
        const passwords = await Password.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(passwords);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

export const deletePassword = async (req, res) => {
    try {
        const password = await Password.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!password) {
            return res.status(404).json({ error: "Password not found" });
        }
        res.json({ message: "Password deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
