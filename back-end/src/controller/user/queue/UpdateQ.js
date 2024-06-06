const { QueueModel } = require("../../../model/Schema");

const UpdateQ = async (req, res) => {
    try {
        const { queueID } = req.params;
        const { status } = req.body;
        const result = await QueueModel.findByIdAndUpdate(queueID, { status: status }, { new: true });
        if (!result) {
            return res.status(400).json({ message: "Queue not found" });
        }
        return res.status(200).json({ message: "Queue updated", result });
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }
}

module.exports = { UpdateQ }
