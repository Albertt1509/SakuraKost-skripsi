const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require('./src/routes/route.js');
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");

app.use(express.json());
const corsConfig = {
  origin: ["https://vast-cyan-ray-tux.cyclic.app","http://localhost:5173","http://127.0.0.1:5173/"]
  credentials: true,
  methods: ["GET", "UPDATE", "DELETE", "PUT", "POST"],
};

app.use(cors(corsConfig));

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
app.use(cookieParser());

// Serve static files
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/foto", express.static(path.join(__dirname, "foto")));

app.use("/", routes);

// Handle undefined routes
app.get("/", (req, res, next) => {
  res.json("🦄🌈💰💸💳");
});

app.listen(4000, () => {
  console.log("Connected on port 3000");
});
