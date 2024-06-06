const express = require("express");
const { signupController } = require("../controller/user/SignupController");
const { loginController } = require("../controller/user/LoginController");
const { validateToken } = require("../middleware/auth");
const { GetUser } = require("../controller/user/GetUser");
const { GetUserByID } = require("../controller/user/GetUserByID");
const { logoutController } = require("../controller/user/LogoutController");
const { CreateShop } = require("../controller/user/restaurant/CreateShop");
const { GetShop } = require("../controller/user/restaurant/GetShop");
const { GetShopByID } = require("../controller/user/restaurant/GetShopByID");
const { DeleteShop } = require("../controller/user/restaurant/DeleteShop");
const { EditShop } = require("../controller/user/restaurant/EditShop");
const { UpdateUser } = require("../controller/user/UpdateUser");
const { GenerateQueue } = require("../controller/user/queue/GenerateQueue");
const { UpdateQ } = require("../controller/user/queue/UpdateQ");
const { GetUserQ } = require("../controller/user/queue/GetUserQ");

const router = express.Router();

router.get("/", (req, res) => {
    res.send({ message: "User router" });
});

// auth
router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/logout", logoutController);

// user
router.get("/getuser", validateToken, GetUser); // get all users, must login
router.get("/getuserbyid", GetUserByID); // must login
router.put("/updateuser/:userID", UpdateUser);

// restaurant
router.post("/createshop", CreateShop);
router.get("/getshop", GetShop); // get all restaurant
router.delete("/deleteshop/:shopID", DeleteShop);
router.get("/getshopbyid/:shopID", GetShopByID); // get restaurant by id
router.put("/editshop/:shopID", EditShop);

// Queue
router.post("/generatequeue/:shopID", GenerateQueue);
router.put("/updateq/:queueID", UpdateQ);
router.get("/getuserq/:userID/:shopID", GetUserQ);

module.exports = router;
