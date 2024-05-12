const express = require("express");
const { signupController } = require("../controller/user/SignupController");
const { loginController } = require("../controller/user/LoginController");
const { validateToken, isLogin } = require("../middleware/auth");
const { getUser } = require("../controller/user/GetUser");
const { logoutController } = require("../controller/user/LogoutController");
const { CreateShop } = require("../controller/user/restaurant/CreateShop");
const { GetAllShop } = require("../controller/user/restaurant/GetAllShop");
const { DeleteShop } = require("../controller/user/restaurant/DeleteShop");
const { updateUser } = require("../controller/user/UpdateUser");

const router = express.Router();

router.get("/", (req, res) => {
    res.send({ message: "User router" });
});

// auth
router.post("/signup", isLogin, signupController);
router.post("/login", loginController);
router.get("/logout", logoutController);

// user
router.get("/getuser", validateToken, getUser);
router.put("/updateuser/:userid", updateUser);

// restaurant
router.post("/createshop", CreateShop);
router.get("/getallshop", GetAllShop);
router.delete("/deleteshop/:shopid", DeleteShop);

module.exports = router;