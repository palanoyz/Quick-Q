const { UserModel, RestaurantModel, SeatTypeModel, QueueModel } = require("../../../model/Schema");

const GenerateQueue = async (req, res) => {
    try {
        const { shopID } = req.params;
        const { username } = req.body;

        const shop = await RestaurantModel.findById(shopID);
        if (!shop) {
            return res.status(400).json({ message: "Restaurant not found" });
        }

        const user = await UserModel.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        let qtype = []
        for (let i = 0; i < shop.seat_type.length; i++) {
            qtype.push(String.fromCharCode(65 + i));
        }
        console.log(qtype);

        return res.status(200).json({ message: "Generate queue success", shop });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { GenerateQueue };
