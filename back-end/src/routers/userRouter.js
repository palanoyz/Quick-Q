const express = require("express");
const { signupController } = require("../controller/user/SignupController");
const { loginController } = require("../controller/user/LoginController");
const { validateToken } = require("../middleware/auth");
const { getUser } = require("../controller/user/GetUser");
const { logoutController } = require("../controller/user/LogoutController");
const { CreateShop } = require("../controller/user/restaurant/CreateShop");
const { GetShop } = require("../controller/user/restaurant/GetShop");
const { GetShopByID } = require("../controller/user/restaurant/GetShopByID");
const { DeleteShop } = require("../controller/user/restaurant/DeleteShop");
const { updateUser } = require("../controller/user/UpdateUser");

const router = express.Router();

router.get("/", (req, res) => {
    res.send({ message: "User router" });
});

// auth
router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/logout", logoutController);

// user
router.get("/getuser", validateToken, getUser);
router.put("/updateuser/:userid", updateUser);

// restaurant
router.post("/createshop", CreateShop);
router.get("/getshop", GetShop); // get all restaurant
router.delete("/deleteshop/:shopid", DeleteShop);
router.get("/getshopbyid/:shopid", GetShopByID); // get restaurant by id

module.exports = router;
