const express = require("express");
const { signupController } = require("../controller/user/SignupController");
const { loginController } = require("../controller/user/LoginController");
const { validateToken } = require("../middleware/auth");
const { getUser } = require("../controller/user/GetUser");
const { logoutController } = require("../controller/user/LogoutController");
const { CreateShop } = require("../controller/user/restaurant/CreateShop");
const { GetAllShop } = require("../controller/user/restaurant/GetAllShop");

const router = express.Router();

router.get("/", (req, res) => {
    res.send({ message: "User router" });
});

// auth
router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/getuser", validateToken, getUser);
router.get("/logout", logoutController);

// restaurant
router.post("/createshop", CreateShop);
router.get("/getallshop", GetAllShop);

module.exports = router;