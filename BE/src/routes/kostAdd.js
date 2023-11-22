const express = require("express");
const router = express.Router();
const kostController = require("../controller/kostController");

router.use("/api", kostController);
router.get("/api/kost/:id", kostController);
router.put("/api/kost/:id", kostController);
router.delete("/api/kost/:id", kostController);

module.exports = router;
