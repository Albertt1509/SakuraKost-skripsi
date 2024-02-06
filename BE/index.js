const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require('./src/routes/route.js')
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");

app.use(express.json());
app.use(cors());
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

app.use("/", routes);

app.get("/", (req, res) => {
  res.json("🦄🌈💰💸💳");
});

app.listen(4000, () => {
  console.log("Connect on port 4000");
});
