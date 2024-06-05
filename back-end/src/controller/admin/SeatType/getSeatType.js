const { SeatTypeModel } = require("../../../model/Schema");

const getSeatType = async (req, res) => {
    try {
        const result = await SeatTypeModel.find();
        if (!result) {
            return res.status(400).json({ message: "Seat_type not found" });
        }
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { getSeatType };
