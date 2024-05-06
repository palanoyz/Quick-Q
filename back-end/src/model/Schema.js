const { Schema, model } = require("mongoose");

const User = new Schema({
    username: String,
    password: String,
    email: String,
    firstname: String,
    lastname: String,
    phoneNumber: String,
    birthDate: Date,
    lineID: String,
    RestaurantID: [
        {
            type: Schema.Types.ObjectId,
            ref: "Restaurant"
        }
    ],
    QueueID: [
        {
            type: Schema.Types.ObjectId,
            ref: "Queue"
        }
    ]
});
const UserModel = model("User", User);

const Restaurant = new Schema({
    rest_name: String,
    rest_type: {
        type: Schema.Types.ObjectId,
        ref: "RestaurantType",
    },
    branch: String,
    location: String,
    isVerified: Boolean,
    OwnerID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    rest_logo: String,
    SeatTypeID: [
        {
            type: Schema.Types.ObjectId,
            ref: "SeatType"
        }
    ],
});
const RestaurantModel = model("Restaurant", Restaurant);

// for admin
const RestaurantType = new Schema({
    rest_type: String,
});
const RestaurantTypeModel = model("RestaurantType", RestaurantType);

const SeatType = new Schema({
    seat_type: String,
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
