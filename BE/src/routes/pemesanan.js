const express = require("express");
const router = express.Router();
const pemesananController = require("../controller/pemesananController");

router.use("/api", pemesananController);
router.get("/api", pemesananController);
router.post("/api", pemesananController);
module.exports = router;
