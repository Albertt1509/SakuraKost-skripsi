const express = require("express");
const router = express.Router();
const batalController = require("../controller/batalcontrooler")

router.use("/api", batalController);
router.delete("/api", batalController)

module.exports = router;