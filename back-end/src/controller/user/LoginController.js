const { UserModel } = require("../../model/Schema");
const { comparePassword } = require("../../utils/PasswordManager");
const jwt = require("jsonwebtoken");
const { secret_jwt } = require("../../config/config");

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        
        const payload = jwt.sign({ UserID: user._id }, String(secret_jwt), { algorithm: "HS256" })
        res.cookie("token", payload, { httpOnly: true })
        return res.status(200).json({ message: "Login success", payload: payload });
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }
};

module.exports = { loginController };
