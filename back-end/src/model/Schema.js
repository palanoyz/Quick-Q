const { Schema, model } = require("mongoose");

const User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstname: String,
    lastname: String,
    phonenumber: String,
    birthdate: Date,
    lineID: String,
});
const UserModel = model("User", User);

const Restaurant = new Schema({
    rest_name: String,
    rest_type: String,
    province: String,
    seat_type: [
        {
            type: String
        }
    ],
    isVerified: Boolean,
    OwnerID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    rest_logo: String,
    rest_banner: String,
});
const RestaurantModel = model("Restaurant", Restaurant);

// admin
const RestaurantType = new Schema({
    rest_type: {
        type: String,
        unique: true
    },
});
const RestaurantTypeModel = model("RestaurantType", RestaurantType);

// admin
const SeatType = new Schema({
    seat_type: {
        type: String,
        unique: true
    },
    RestaurantID: [
        {
            type: Schema.Types.ObjectId,
            ref: "Restaurant"
        }
    ],
});
const SeatTypeModel = model("SeatType", SeatType);

const Queue = new Schema({
    RestaurantID: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    SeatTypeID: {
        type: Schema.Types.ObjectId,
        ref: "SeatType"
    },
    UserID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    queue_number: String,
});
const QueueModel = model("Queue", Queue);



module.exports = { UserModel, RestaurantModel, RestaurantTypeModel, SeatTypeModel, QueueModel };
