const { RestaurantModel } = require("../../../model/Schema");

const EditShop = async (req, res) => {
    try {
        const { shopID } = req.params;
        const updateFields = req.body;
        const result = await RestaurantModel.findByIdAndUpdate(shopID, updateFields, { new: true });
        if (!result) {
            return res.status(400).json({ message: "Restaurant not found" });
        }
        return res.status(200).json({ message: "Restaurant updated", result });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { EditShop };