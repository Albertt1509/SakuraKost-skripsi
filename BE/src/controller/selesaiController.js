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
router.delete("/selesai/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // Lakukan operasi penghapusan data Selesai berdasarkan ID
        const deletedSelesai = await Selesai.findByIdAndRemove(id);

        if (!deletedSelesai) {
            return res.status(404).json({ error: "Data Selesai tidak ditemukan." });
        }

        res.json({ success: true, message: "Data Selesai berhasil dihapus." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Gagal menghapus data Selesai." });
    }
});

module.exports = router;