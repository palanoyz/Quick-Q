const { SeatTypeModel } = require("../../../model/Schema");

const deleteSeatType = async (req, res) => {
    try {
        const { seatID } = req.params;
        const result = await SeatTypeModel.findByIdAndDelete(seatID);
        if (!result) {
            return res.status(400).json({ message: "Seat_type not found" });
        }
        return res.status(200).json({ message: "Seat_type deleted" });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { deleteSeatType };
