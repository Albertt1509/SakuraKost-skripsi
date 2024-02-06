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
//get all user
router.use("/api/users", authController.getAllUsers);
module.exports = router;
