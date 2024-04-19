const express = require("express");
const { signupController } = require("../controller/SignupController");
const { validateToken } = require("../middleware/auth");
const { getUser } = require("../controller/GetUser");
const { loginController } = require("../controller/LoginController");

const router = express.Router();

router.get("/", (req, res) => {
    res.send({
        message: "User router",
    });
});

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/getuser", validateToken, getUser);

module.exports = router;