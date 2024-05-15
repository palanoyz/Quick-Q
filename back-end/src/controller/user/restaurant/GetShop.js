const { RestaurantModel } = require("../../../model/Schema");

const GetShop = async (req, res) => {
    try {
        const shops = await RestaurantModel.find({});
        res.status(200).json(shops);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { GetShop };
