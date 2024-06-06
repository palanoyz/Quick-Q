const { RestaurantModel, UserModel } = require("../../../model/Schema");
const mongoose = require("mongoose");

const DeleteShop = async (req, res) => {
    try {
        //const shopid = new mongoose.Types.ObjectId(req.params.shopid);
        const { shopID } = req.params;
        const deleteShop = await RestaurantModel.findByIdAndDelete(shopID);
        if (!deleteShop) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        await UserModel.updateOne({ _id: deleteShop.OwnerID }, { $pull: { RestaurantID: deleteShop._id } }, { new: true });
        
        return res.status(200).json({ message: "Restaurant deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { DeleteShop };