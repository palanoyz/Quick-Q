const { UserModel, RestaurantModel, SeatTypeModel, QueueModel } = require("../../../model/Schema");

const GenerateQueue = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { GenerateQueue };
