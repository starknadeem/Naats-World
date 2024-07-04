const userModel = require("../models/userModel");

async function registerUser(req, res) {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const existedUser = await userModel.findOne({ email: email });
        if (existedUser) {
            return res.status(409).json({ message: "User is already registered" });
        }

        const newUser = await userModel.create({ email, password });
        if (newUser) {
            return res.status(201).json({ message: "Account created successfully" });
        } else {
            return res.status(500).json({ message: "Something went wrong" });
        }
    } catch (error) {
        console.error("Error in registerUser: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = registerUser;
