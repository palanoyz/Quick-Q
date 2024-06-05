const { UserModel } = require("../../model/Schema");

const GetUser = async (req, res) => {
    try {
        const user = await UserModel.find({});
        return res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }
}

module.exports = { GetUser }