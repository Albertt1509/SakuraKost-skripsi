const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./src/routes/auth");
const kostRoute = require("./src/routes/kostAdd");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

mongoose.connect(process.env.MONGO);

app.use(cookieParser());
//user connected
app.use("/", authRoute);
app.use("/", kostRoute);

// app.get("/test", (req, res) => {
//   res.json("test ok");
// });

app.listen(4000, () => {
  console.log("Connect on port 4000");
});
