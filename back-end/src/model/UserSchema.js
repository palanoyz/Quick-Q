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

const Restaurant = new Schema({
    rest_name: String,
    rest_type: String,
    branch: String,
    location: String,
    description: String,
    isVerified: Boolean,
    OwnerID: { 
        type: Schema.Types.ObjectId, 
        ref: "User" 
    },
});
const RestaurantModel = model("Restaurant", Restaurant);

const SeatType = new Schema({
    seat_type: String,
    RestaurantID: { 
        type: Schema.Types.ObjectId, 
        ref: "Restaurant" 
    },
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
});
const QueueModel = model("Queue", Queue);



module.exports = { UserModel, RestaurantModel, SeatTypeModel, QueueModel };
