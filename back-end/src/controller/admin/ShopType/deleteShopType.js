const { RestaurantTypeModel } = require("../../../model/Schema");

const deleteShopType = async (req, res) => {
    try {
        const { typeID } = req.params;
        const result = await RestaurantTypeModel.findByIdAndDelete(typeID);
        if (!result) {
            return res.status(400).json({ message: "Restaurant_type not found" });
        }
        return res.status(200).json({ message: "Delete restaurant_type success" });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { deleteShopType }