const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
//register
router.post("/api/register", authController.createRegisterUser);
//login
router.use("/api/login", authController.postLoginUser);
//profile
router.use("/api/profile", authController.getProfile);
//logout
router.use("/api/logout", authController.getLogout);
module.exports = router;
