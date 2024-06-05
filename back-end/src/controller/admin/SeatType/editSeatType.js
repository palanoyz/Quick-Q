const { SeatTypeModel } = require("../../../model/Schema");

const editSeatType = async (req, res) => {
    try {
        const { seatID } = req.params;
        const { seat_type } = req.body;
        const result = await SeatTypeModel.findByIdAndUpdate(seatID, { seat_type: seat_type }, { new: true });
        if (!result) {
            return res.status(400).json({ message: "Seat_type not found" });
        }
        return res.status(200).json({ message: "Seat_type updated", result });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { editSeatType };
