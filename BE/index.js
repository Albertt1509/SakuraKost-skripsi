const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./src/routes/auth");
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

//database connection
mongoose.connect(process.env.MONGO);
// console.log(process.env.MONGO);

app.use(cookieParser());
app.use("/", authRoute);

// app.get("/test", (req, res) => {
//   res.json("test ok");
// });

app.listen(4000, () => {
  console.log("connected on server");
});
