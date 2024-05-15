const { RestaurantModel } = require("../../../model/Schema");
const jwt = require("jsonwebtoken");
const { secret_jwt } = require("../../../config/config");
const { uploadImageLogo, uploadImageBanner } = require("../../../utils/ImageUpload");

const CreateShop = async (req, res) => {
    try {
        const {
            rest_name,
            rest_type,
            branch,
            location,
            isVerified,
        } = req.body;
        const files = req.files;

        const token = req.cookies.token;
        const validToken = jwt.verify(token, String(secret_jwt));
        if (!validToken) {
            return res.status(400).send("Invalid token");
        }

        const logoFile = files.find(file => file.fieldname === 'rest_logo');
        const bannerFile = files.find(file => file.fieldname === 'rest_banner');
        if (!logoFile || !bannerFile) {
            return res.status(400).send('Please upload logo and banner');
        }

        const logoUrl = await uploadImageLogo(logoFile);
        const bannerUrl = await uploadImageBanner(bannerFile);
        const OwnerID = validToken.UserID;

        const shop = new RestaurantModel({
            rest_name,
            rest_type,
            branch,
            location,
            isVerified: isVerified || false,
            OwnerID,
            rest_logo: logoUrl,
            rest_banner: bannerUrl,
        });
        await shop.save();
        res.status(201).send("Restaurant created successfully");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { CreateShop };
