const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const batalController = require("../controller/batalcontrooler")
const favoriteController = require("../controller/favoriteController");
const selesaiController = require("../controller/selesaiController")
const kostController = require("../controller/kostController");
const pemesananController = require("../controller/pemesananController");

router.post("/api/register", authController.createRegisterUser);
//login
router.use("/api/login", authController.postLoginUser);
//profile
router.use("/api/profile", authController.getProfile);
//logout
router.use("/api/logout", authController.getLogout);
//get all user
router.use("/api/users", authController.getAllUsers);
// get batal data
router.use("/api", batalController);
//delete batal
router.delete("/api", batalController)
// Menambahkan kost ke daftar favorit pengguna
router.post("/user/:userId/favorites/:kostId", favoriteController.addToFavorites);
//menambahkan data delete favorite
router.delete("/user/:userId/favorites/:kostId", favoriteController.removeFromFavorites);
//melakukan get data favorite
router.get("/user/:userId/favorites", favoriteController.getFavorites);
//get data selesai transaksi
router.use("/api", selesaiController);
//hapus data selesai
router.delete("/api", selesaiController);
//menambahkan data kos
router.use("/api", kostController);
//mengambil data kos
router.get("/api/kost/:id", kostController);
//mengedit data kos
router.put("/api/kost/:id", kostController);
// menghapus data kos
router.delete("/api/kost/:id", kostController);
// membuat data pemesanan
router.use("/api", pemesananController);
// mengambil data pesanan
router.get("/api", pemesananController);
// mengupload data pesanan
router.post("/api", pemesananController);

module.exports = router;
