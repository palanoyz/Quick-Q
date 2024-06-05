const { RestaurantTypeModel } = require("../../../model/Schema");

const addShopType = async (req, res) => {
    try {
        const { rest_type } = req.body;
        const type = new RestaurantTypeModel({
            rest_type
        });
        await type.save();
        res.status(200).json({ message: "Add restaurant_type success", type });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { addShopType };