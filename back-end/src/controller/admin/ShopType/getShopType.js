const { RestaurantTypeModel } = require("../../../model/Schema");

const getShopType = async (req, res) => {
    try {
        const type = await RestaurantTypeModel.find();
        return res.status(200).json({
            message: "All restaurant_type",
            type,
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getShopType };