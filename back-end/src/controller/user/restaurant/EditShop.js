const { RestaurantModel } = require("../../../model/Schema");
const { uploadImageLogo, uploadImageBanner } = require("../../../utils/ImageUpload");

const EditShop = async (req, res) => {
    try {
        const { shopID } = req.params;
        const updateFields = req.body;
        const files = req.files;

        // update image
        if (updateFields.removeLogo === 'true') {
            updateFields.rest_logo = "";
        }
        if (updateFields.removeBanner === 'true') {
            updateFields.rest_banner = "";
        }
        
        const logoFile = files.find(file => file.fieldname === 'rest_logo');
        const bannerFile = files.find(file => file.fieldname === 'rest_banner');
        if (logoFile) {
            const logoUrl = await uploadImageLogo(logoFile);
            updateFields.rest_logo = logoUrl;
        }
        if (bannerFile) {
            const bannerUrl = await uploadImageBanner(bannerFile);
            updateFields.rest_banner = bannerUrl;
        }

        const result = await RestaurantModel.findByIdAndUpdate(shopID, updateFields, { new: true });
        if (!result) {
            return res.status(400).json({ message: "Restaurant not found" });
        }
        return res.status(200).json({ message: "Restaurant updated", result });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { EditShop };
