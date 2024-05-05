const { RestaurantTypeModel } = require("../../../model/Schema");

const addShopType = async (req, res) => {
    try {
        const { rest_type } = req.body;
        const type = new RestaurantTypeModel({ 
            rest_type 
        });
        await type.save();
        res.status(200).json({ message: "Add restaurant_type success" });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { addShopType };