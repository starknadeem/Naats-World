const userModel = require("../models/userModel");

async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error in loginUser: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = loginUser;
