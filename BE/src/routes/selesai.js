const express = require("express");
const router = express.Router();
const selesaiController = require("../controller/selesaiController")

router.use("/api", selesaiController);
router.delete("/api", selesaiController);
module.exports = router;