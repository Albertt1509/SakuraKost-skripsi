const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");

//register
router.post("/register", authController.createRegisterUser);
//login
router.use("/login", authController.postLoginUser);
//profile
router.use("/profile", authController.getProfile);
//logout
router.use("/logout", authController.getLogout);

module.exports = router;
