const { QueueModel } = require("../../../model/Schema");

const GetUserQ = async (req, res) => {
    try {
        const { userID, shopID } = req.params;
        const result = await QueueModel.find({ UserID: userID, RestaurantID: shopID })
            .populate("UserID")
            .populate("RestaurantID");
        if (!result) {
            return res.status(400).json({ message: "Queue not found" });
        }
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { GetUserQ }
