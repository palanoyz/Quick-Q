const express = require("express");
const { signupController } = require("../controller/SignupController");
const { validateToken } = require("../middleware/auth");

const router = express.Router();

router.get("/", (req, res) => {
    res.send({
        message: "User router",
    });
});

router.post("/signup", signupController);

module.exports = router;