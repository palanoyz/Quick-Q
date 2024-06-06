const { UserModel, RestaurantModel, SeatTypeModel, QueueModel } = require("../../../model/Schema");

const GenerateQueue = async (req, res) => {
    try {
        const { shopID } = req.params;
        const { username, seat_type } = req.body;

        const restaurant = await RestaurantModel.findById(shopID);
        if (!restaurant) {
            return res.status(400).json({ message: "Restaurant not found" });
        }

        const user = await UserModel.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check if the provided seat_type is valid
        const seatTypeIndex = restaurant.seat_type.findIndex(
            (type) => type.toLowerCase() === seat_type.toLowerCase()
        );
        if (seatTypeIndex === -1) {
            return res.status(400).json({ message: "Invalid seat type" });
        }

        // Get the next available queue number for the provided seat type
        const queueCounts = await QueueModel.aggregate([
            { $match: { RestaurantID: restaurant._id, queue_number: { $regex: `^${String.fromCharCode(65 + seatTypeIndex)}` } } },
            { $group: { _id: null, maxCount: { $max: { $toInt: { $ifNull: [{ $substr: ["$queue_number", 1, null] }, 0] } } } } },
            { $project: { _id: 0, maxCount: { $ifNull: ["$maxCount", 0] } } },
        ]);

        const nextQueueNumber = queueCounts.length > 0 ? queueCounts[0].maxCount + 1 : 1;
        const queueNumber = `${String.fromCharCode(65 + seatTypeIndex)}${nextQueueNumber}`;

        // Create a new queue document
        const newQueue = new QueueModel({
            RestaurantID: restaurant._id,
            UserID: user._id,
            queue_number: queueNumber,
        });
        await newQueue.save();

        return res.status(200).json({ message: "Generate queue success", queue: newQueue });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { GenerateQueue };
