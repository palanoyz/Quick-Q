const { ObjectId } = require("mongodb");
const { Schema, model } = require("mongoose");

const User = new Schema({
    username: String,
    password: String,
    email: String,
    firstname: String,
    lastname: String,
    phoneNumber: String,
    birthDate: Date,
});
const UserModel = model("User", User);

module.exports = { UserModel };