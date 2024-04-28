const { RestaurantModel } = require("../../model/Schema");

const editVerified = async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const { isVerified } = req.body;
        await RestaurantModel.updateOne({ _id: id }, { $set: { isVerified: isVerified } });
        res.status(200).json({ message: "Verified status updated" });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { editVerified };