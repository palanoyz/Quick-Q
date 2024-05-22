const { RestaurantTypeModel } = require("../../../model/Schema");

const editShopType = async (req, res) => {
    try {
        const { typeID } = req.params;
        const { rest_type } = req.body;
        const result = await RestaurantTypeModel.findByIdAndUpdate(typeID, { rest_type: rest_type }, { new: true });
        if (!result) {
            return res.status(400).json({ message: "Restaurant_type not found" });
        }
        res.status(200).json({ message: "Restaurant_type updated", result });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { editShopType };