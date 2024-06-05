const { RestaurantTypeModel } = require("../../../model/Schema");

const getShopType = async (req, res) => {
    try {
        const type = await RestaurantTypeModel.find();
        return res.status(200).json(type);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { getShopType };