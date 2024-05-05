const { UserModel } = require("../../model/Schema");

const getUser = async (req, res) => {
    try {
        const user = await UserModel.find({});
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { getUser }