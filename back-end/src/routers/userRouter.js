const express = require("express");
const { signupController } = require("../controller/user/SignupController");
const { loginController } = require("../controller/user/LoginController");
const { validateToken } = require("../middleware/auth");
const { getUser } = require("../controller/user/GetUser");
const { logoutController } = require("../controller/user/LogoutController");

const router = express.Router();

router.get("/", (req, res) => {
    res.send({
        message: "User router",
    });
});

// auth
router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/getuser", validateToken, getUser);
router.get("/logout", logoutController);

module.exports = router;