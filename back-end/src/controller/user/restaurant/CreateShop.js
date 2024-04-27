const { RestaurantModel } = require("../../../model/Schema");
const jwt = require("jsonwebtoken");
const { secret_jwt } = require("../../../config/config");
const { uploadImageLogo } = require("../../../utils/ImageUpload");

const CreateShop = async (req, res) => {
    try {
        const {
            rest_name,
            rest_type,
            branch,
            location,
            isVerified,
        } = req.body;

        const file = req.file;
        const token = req.cookies.token;
        const validToken = jwt.verify(token, String(secret_jwt));
        if (!validToken) {
            return res.status(400).send("Invalid token");
        }
        if (!file) {
            return res.status(400).send("Please upload a file");
        }
        const imageUrl = await uploadImageLogo(file);
        const OwnerID = validToken.UserID;

        const shop = new RestaurantModel({
            rest_name,
            rest_type,
            branch,
            location,
            isVerified: isVerified || false,
            OwnerID,
            rest_logo: imageUrl,
        });
        await shop.save();
        res.status(201).send("Restaurant created successfully");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { CreateShop };
