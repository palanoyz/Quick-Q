const { UserModel } = require("../../model/Schema");

const UpdateUser = async (req, res) => {
    try {
        const { userID } = req.params;
        const updateFields = req.body;
        const result = await UserModel.findByIdAndUpdate(userID, updateFields, { new: true });
        if (!result) {
            return res.status(400).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User updated", result });
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }
}

module.exports = { UpdateUser };
