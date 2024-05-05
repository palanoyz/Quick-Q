const { RestaurantModel } = require("../../model/Schema");
const mongoose = require("mongoose");

const editVerifiedShop = async (req, res) => {
    try {
        //const shopid = new mongoose.Types.ObjectId(req.params.shopid);
        const { shopid } = req.params;
        const { isVerified } = req.body;
        await RestaurantModel.findByIdAndUpdate(shopid, { isVerified: isVerified });
        res.status(200).json({ message: "Verified status updated" });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { editVerifiedShop };