const { RestaurantModel } = require("../../../model/Schema");

const GetShop = async (req, res) => {
    try {
        const shops = await RestaurantModel.find({});
        return res.status(200).json(shops);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { GetShop };
