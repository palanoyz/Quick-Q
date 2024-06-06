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

        // Check if seat_type input is valid
        const seatTypeIndex = restaurant.seat_type.findIndex(
            (type) => type.toLowerCase() === seat_type.toLowerCase()
        );
        if (seatTypeIndex === -1) {
            return res.status(400).json({ message: "Invalid seat type" });
        }

        // Get the next available queue number by seat_type
        const queueCounts = await QueueModel.aggregate([
            { $match: { RestaurantID: restaurant._id, queue_number: { $regex: `^${String.fromCharCode(65 + seatTypeIndex)}` } } },
            {
                $group: {
                    _id: null,
                    maxCount: {
                        $max: {
                            $convert: {
                                input: { $substr: [{ $ifNull: ["$queue_number", "A0"] }, 1, -1] },
                                to: "int",
                                onError: 0,
                                onNull: 0
                            }
                        }
                    }
                }
            }
        ]);

        const nextQueueNumber = queueCounts.length > 0 ? queueCounts[0].maxCount + 1 : 1;
        const queueNumber = `${String.fromCharCode(65 + seatTypeIndex)}${nextQueueNumber}`;

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
