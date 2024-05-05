const { RestaurantModel } = require("../../../model/Schema");
const mongoose = require("mongoose");

const DeleteShop = async (req, res) => {
    try {
        //const shopid = new mongoose.Types.ObjectId(req.params.shopid);
        const { shopid } = req.params;
        const deleteShop = await RestaurantModel.findByIdAndDelete(shopid);
        if (!deleteShop) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        res.status(200).json({ message: "Restaurant deleted successfully" });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { DeleteShop };