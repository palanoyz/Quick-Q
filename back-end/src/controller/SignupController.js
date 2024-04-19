const { UserModel } = require("../model/UserSchema");
const { hashPassword } = require("../utils/PasswordManager");

const signupController = async (req, res) => {
    try {
        const {
            username,
            password,
            email,
            firstname,
            lastname,
            phoneNumber,
            birthDate
        } = req.body;

        const user = new UserModel({
            username,
            password: await hashPassword(password),
            email,
            firstname,
            lastname,
            phoneNumber,
            birthDate
        })

        await user.save();
        res.status(200).send({ 
            message: "signup success",
            user
        });
    } catch (err) {
        console.log("signupController error", err.message);
    }
};

module.exports = { signupController };