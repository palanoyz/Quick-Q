const { RestaurantModel, RestaurantTypeModel } = require("../../../model/Schema");
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

        // upload image
        const logoUrl = "";
        const bannerUrl = "";
        const logoFile = files.find(file => file.fieldname === 'rest_logo');
        const bannerFile = files.find(file => file.fieldname === 'rest_banner');
        if (logoFile) {
            logoUrl = await uploadImageLogo(logoFile);
        }
        if (bannerFile) {
            bannerUrl = await uploadImageBanner(bannerFile);
        }

        // const logoUrl = await uploadImageLogo(logoFile);
        // const bannerUrl = await uploadImageBanner(bannerFile);
        const OwnerID = validToken.UserID;

        const findRestType = await RestaurantTypeModel.findById(rest_type);
        if (!findRestType) {
            return res.status(400).send('Restaurant type not found');
        }

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
        return res.status(201).send({
            message: "Create restaurant success",
            shop
        });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { CreateShop };
