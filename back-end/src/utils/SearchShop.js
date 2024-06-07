const { RestaurantModel } = require("../model/Schema");

const SearchShop = async (req, res) => {
    try {
        const { keyword } = req.body;
        const result = await RestaurantModel.find({ rest_name: { $regex: keyword, $options: "i" } });
        if (!result) {
            return res.status(400).json({ message: "Restaurant not found" });
        }
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { SearchShop }