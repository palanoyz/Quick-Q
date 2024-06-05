const { SeatTypeModel } = require("../../../model/Schema");

const addSeatType = async (req, res) => {
    try {
        const { seat_type } = req.body;
        const seat = new SeatTypeModel({
            seat_type
        });
        await seat.save();
        res.status(200).json({ message: "Add seat_type success", seat }); 
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { addSeatType };
