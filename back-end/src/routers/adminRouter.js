const express = require("express");
const { addShopType } = require("../controller/admin/ShopType/addShopType");
const { getShopType } = require("../controller/admin/ShopType/getShopType");
const { editShopType } = require("../controller/admin/ShopType/editShopType");
const { editVerifiedShop } = require("../controller/admin/editVerified");
const { deleteShopType } = require("../controller/admin/ShopType/deleteShopType");
const { addSeatType } = require("../controller/admin/SeatType/addSeatType");
const { editSeatType } = require("../controller/admin/SeatType/editSeatType");
const { deleteSeatType } = require("../controller/admin/SeatType/deleteSeatType");
const { getSeatType } = require("../controller/admin/SeatType/getSeatType");

const router = express.Router();

router.get("/", (req, res) => {
    res.send({ message: "Admin router" });
});

// Restaurant Type
router.post("/addshoptype", addShopType);
router.get("/getshoptype", getShopType); // get all restaurant types
router.put("/editshoptype/:typeID", editShopType);
router.delete("/deleteshoptype/:typeID", deleteShopType);

// Verified reastaurant
router.put("/editverified/:shopID", editVerifiedShop);

// Seat Type
router.post("/addseattype", addSeatType);
router.put("/editseattype/:seatID", editSeatType);
router.delete("/deleteseattype/:seatID", deleteSeatType);
router.get("/getseattype", getSeatType); // get all seat types

module.exports = router;