const { UserModel, RestaurantModel } = require("../../../model/Schema");
const jwt = require("jsonwebtoken");
const { secret_jwt } = require("../../../config/config");

const GetUserShop = async (req, res) => {
    try {
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
        const shop = await RestaurantModel.find({ OwnerID: user._id });
        if (!shop) {
            res.json({ message: "Shop not found" });
            return false;
        }
        return res.status(200).json(shop);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }
};

module.exports = { GetUserShop }