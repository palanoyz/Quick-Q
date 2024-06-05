const { RestaurantModel, RestaurantTypeModel } = require("../../../model/Schema");
const jwt = require("jsonwebtoken");
const { secret_jwt } = require("../../../config/config");
const { uploadImageLogo, uploadImageBanner } = require("../../../utils/ImageUpload");

const CreateShop = async (req, res) => {
    try {
        const {
            rest_name,
            rest_type,
            province
        } = req.body;
        const files = req.files;

        // get UserID
        const token = req.cookies.token;
        const validToken = jwt.verify(token, String(secret_jwt));
        if (!validToken) {
            return res.status(400).send("Invalid token");
        }
        const OwnerID = validToken.UserID;

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

        const findRestType = await RestaurantTypeModel.findOne({ rest_type: rest_type });
        if (!findRestType) {
            return res.status(400).send('Restaurant type not found');
        }

        const shop = new RestaurantModel({
            rest_name,
            rest_type,
            province,
            isVerified: false,
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
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { CreateShop };
