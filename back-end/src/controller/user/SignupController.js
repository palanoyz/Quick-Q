const { UserModel } = require("../../model/Schema");
const { hashPassword } = require("../../utils/PasswordManager");
const jwt = require("jsonwebtoken");
const { secret_jwt } = require("../../config/config");

const signupController = async (req, res) => {
    try {
        const {
            username,
            password,
            email,
            firstname,
            lastname,
            phonenumber,
            birthdate,
            lineID
        } = req.body;

        const user = new UserModel({
            username,
            password: await hashPassword(password),
            email,
            firstname,
            lastname,
            phonenumber,
            birthdate,
            lineID
        })
        await user.save();

        // const playload = jwt.sign({ UserID: user._id }, String(secret_jwt), { algorithm: "HS256" });
        // res.cookie("token", playload, { httpOnly: true });
        return res.status(200).send({
            message: "signup success",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { signupController };