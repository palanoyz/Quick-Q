const { QueueModel } = require("../../../model/Schema");
const { UserModel, RestaurantModel, SeatTypeModel } = require("../../../model/Schema");
const mongoose = require("mongoose");

const GenerateQueue = async (req, res) => {
    try {
        const { restaurantID, seatTypeID, userID } = req.body;
        const restaurant = await RestaurantModel.findById(restaurantID);
        const seatType = await SeatTypeModel.findById(seatTypeID);
        const user = await UserModel.findById(userID);

        if (!restaurant || !seatType || !user) {
            return res.status(404).json({ message: "Restaurant, Seat Type, or User not found" });
        }

        // Find the latest queue number for the given restaurant and seat type
        const latestQueue = await QueueModel.findOne({ restaurantID, seatTypeID }).sort({ createdAt: -1 });

        // Determine the new queue number
        let newQueueNumber;
        if (latestQueue) {
            const latestNumber = parseInt(latestQueue.queue_number.slice(1), 10);
            newQueueNumber = seatType.seat_type.charAt(0).toUpperCase() + String(latestNumber + 1).padStart(2, '0');
        } else {
            newQueueNumber = seatType.seat_type.charAt(0).toUpperCase() + "01";
        }

        // Create a new queue entry
        const newQueue = new QueueModel({
            restaurantID,
            seatTypeID,
            userID,
            queue_number: newQueueNumber
        });

        await newQueue.save();
        res.status(201).json(newQueue)
    } catch (error) {
        console.log(error);
    }
};

module.exports = { CreateQueue };
