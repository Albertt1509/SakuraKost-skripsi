const express = require("express");
const router = express.Router();
const favoriteController = require("../controller/favoriteController");

// Menambahkan kost ke daftar favorit pengguna
router.post(
  "/user/:userId/favorites/:kostId",
  favoriteController.addToFavorites
);
router.delete(
  "/user/:userId/favorites/:kostId",
  favoriteController.removeFromFavorites
);
router.get("/user/:userId/favorites", favoriteController.getFavorites);
module.exports = router;
