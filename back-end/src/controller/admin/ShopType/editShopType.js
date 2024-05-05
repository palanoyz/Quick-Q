const { RestaurantTypeModel } = require("../../../model/Schema");
const mongoose = require("mongoose");

const editShopType = async (req, res) => {
    try {
        //const typeid = new mongoose.Types.ObjectId(req.params.typeid);
        const { typeid } = req.params;
        const { rest_type } = req.body;
        await RestaurantTypeModel.findByIdAndUpdate(typeid, {rest_type: rest_type});
        res.status(200).json({ message: "Restaurant_type updated" });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { editShopType };