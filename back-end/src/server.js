// import zone
const express = require("express");
const { PORT, MONGO_URI } = require("./config/config");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRouter = require("./routers/userRouter");
const adminRouter = require("./routers/adminRouter");
const multer = require("multer");



const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.get("/", async (req, res) => {
    res.send({ message: "test server.js" });
});

const multerMid = multer({
    storage: multer.memoryStorage(),
}).any();
// app.use(multerMid.array("files"));
app.use(multerMid);


// router zone
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);



app.listen(PORT, async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`Server is running at http://localhost:${PORT}`);
    } catch (error) {
        console.log("error : ", error);
    }
});

// node --watch ./src/server.js
