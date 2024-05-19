const { RestaurantTypeModel } = require("../../../model/Schema");

const editShopType = async (req, res) => {
    try {
        const { typeid } = req.params;
        const { rest_type } = req.body;
        const result = await RestaurantTypeModel.findByIdAndUpdate(typeid, { rest_type: rest_type });
        if (!result) {
            return res.status(400).json({ message: "Restaurant_type not found" });
        }
        res.status(200).json({ message: "Restaurant_type updated" });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { editShopType };