const express = require("express");
const router = express.Router();
const pemesananController = require("../controller/pemesananController");

router.use("/api", pemesananController);
module.exports = router;
