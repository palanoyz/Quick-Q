const express = require("express");
const { addShopType } = require("../controller/admin/ShopType/addShopType");
const { getShopType } = require("../controller/admin/ShopType/getShopType");
const { editShopType } = require("../controller/admin/ShopType/editShopType");
const { editVerifiedShop } = require("../controller/admin/editVerified");

const router = express.Router();

router.get("/", (req, res) => {
    res.send({ message: "Admin router" });
});

// Restaurant Type
router.post("/addshoptype", addShopType);
router.get("/getshoptype", getShopType);
router.put("/editshoptype/:typeid", editShopType);

router.put("/editverified/:shopid", editVerifiedShop);

module.exports = router;