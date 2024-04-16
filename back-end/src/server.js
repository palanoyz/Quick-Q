express = require("express");
cors = require("cors");
mongoose = require("mongoose");
cookieParser = require("cookie-parser");



PORT = 5000;
MONGO_URI = "mongodb+srv://kritamet:1234@cluster0.kdvkhdy.mongodb.net/";

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
    res.send({
        message: "testๆ",
    });
});

app.listen(PORT, async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`Server is running at http://localhost:${PORT}`);
    } catch (error) {
        console.log("error : ", error);
    }
});
