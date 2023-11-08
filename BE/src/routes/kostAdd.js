const express = require("express");
const router = express.Router();
const kostController = require("../controller/kostController");

router.use("/api", kostController);
router.put("/api/:id", kostController);

module.exports = router;
