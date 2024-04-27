const { RestaurantTypeModel } = require("../../../model/Schema");
const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const editShopType = async (req, res) => {
    try {
        const typeid = new mongoose.Types.ObjectId(req.params.typeid);
        const { rest_type } = req.body;
        await RestaurantTypeModel.updateOne({ _id: typeid }, { $set: { rest_type: rest_type } });
        res.status(200).json({ message: "Restaurant_type updated" });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { editShopType };