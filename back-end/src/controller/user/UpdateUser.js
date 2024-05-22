const { UserModel } = require("../../model/Schema");

const UpdateUser = async (req, res) => {
    try {
        const { userid } = req.params;
        const updateFields = req.body;
        const result = await UserModel.findByIdAndUpdate(userid, updateFields, { new: true });
        if (!result) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated", user: result });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { UpdateUser };
