const { RestaurantModel } = require("../../model/Schema");
const mongoose = require("mongoose");

const editVerifiedShop = async (req, res) => {
    try {
        //const shopid = new mongoose.Types.ObjectId(req.params.shopid);
        const { shopID } = req.params;
        const { isVerified } = req.body;
        const result = await RestaurantModel.findByIdAndUpdate(shopid, { isVerified: isVerified });
        res.status(200).json({ message: "Verified status updated", result });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { editVerifiedShop };