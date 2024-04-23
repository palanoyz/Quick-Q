// import zone
express = require("express");
const { PORT, MONGO_URI } = require("./config/config");
cors = require("cors");
mongoose = require("mongoose");
cookieParser = require("cookie-parser");
const userRouter = require("./routers/userRouter");



const app = express();
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
    }
));
app.use(cookieParser());
app.use(express.json());
app.get("/", async (req, res) => {
    res.send({ message: "test server.js" });
});



// router zone
app.use("/api/user", userRouter);



app.listen(PORT, async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`Server is running at http://localhost:${PORT}`);
    } catch (error) {
        console.log("error : ", error);
    }
});
