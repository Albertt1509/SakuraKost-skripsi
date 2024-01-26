const express = require("express")
const router = express.Router()
const Selesai = require("../models/selesai")

router.get("/selesai", async (req, res) => {
    try {
        const selesaiPemesanan = await Selesai.find();
        res.status(200).json(selesaiPemesanan);
    } catch (error) {
        console.log('error data order', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;