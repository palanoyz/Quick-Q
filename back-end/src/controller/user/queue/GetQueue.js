const { QueueModel } = require("../../../model/Schema");

const GetQueue = async (req, res) => {
    try {
        const { shopID } = req.params;
        const result = await QueueModel.find({ RestaurantID: shopID })
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

module.exports = { GetQueue }
