const express = require("express");
const { addShopType } = require("../controller/admin/ShopType/addShopType");
const { getShopType } = require("../controller/admin/ShopType/getShopType");
const { editShopType } = require("../controller/admin/ShopType/editShopType");

const router = express.Router();

router.get("/", (req, res) => {
    res.send({ message: "Admin router" });
});

router.post("/addshoptype", addShopType);
router.get("/getshoptype", getShopType);
router.put("/editshoptype/:typeid", editShopType);

module.exports = router;