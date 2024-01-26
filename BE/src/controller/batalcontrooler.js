const express = require("express")
const router = express.Router()
const Batal = require("../models/batal")

router.get("/batal", async (req, res) => {
    try {
        const batalPemesanan = await Batal.find();
        res.status(200).json(batalPemesanan);
    } catch (error) {
        console.log('error data order', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;