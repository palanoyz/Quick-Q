const { UserModel } = require("../../model/Schema");
const jwt = require("jsonwebtoken");
const { secret_jwt } = require("../../config/config");

const GetUserByID = async (req, res) => {
    try {
        // const { userID } = req.params;
        
        const token = req.cookies.token;
        if (!token) {
            res.json({ message: "Unauthorized" });
            return false;
        }
        const validToken = jwt.verify(token, String(secret_jwt));
        if (!validToken) {
            res.json({ message: "Invalid token" });
            return false;
        }
        const userID = validToken.UserID;

        const user = await UserModel.findById(userID);
        if (!user) {
            res.json({ message: "User not found" });
            return false;
        }
        
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { GetUserByID };
