const { RestaurantModel } = require("../../../model/Schema");

const GetShopByID = async (req, res) => {
    try {
        const { shopid } = req.params;
        const result = await RestaurantModel.findById(shopid);
        if (!result) {
            return res.status(400).json({ message: "Restaurant not found" });
        }
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { GetShopByID };
