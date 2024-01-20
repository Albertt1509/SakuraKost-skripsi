const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./src/routes/auth");
const kostRoute = require("./src/routes/kostAdd");
const favorite = require("./src/routes/favorite");
const pemesanan = require("./src/routes/pemesanan");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
  })
);
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
app.use(cookieParser());
//user connected
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/foto", express.static(path.join(__dirname, "foto")));

app.use("/", authRoute);
app.use("/", kostRoute);
app.use("/", favorite);
app.use("/", pemesanan);

// app.get("/test", (req, res) => {
//   res.json("test ok");
// });

app.listen(4000, () => {
  console.log("Connect on port 4000");
});
