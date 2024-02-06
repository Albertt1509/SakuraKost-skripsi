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
router.delete("/batal/:batalId", async (req, res) => {
    try {
        const { batalId } = req.params;
        const deletedBatal = await Batal.findByIdAndDelete(batalId);
        if (!deletedBatal) {
            return res.status(404).json({ success: false, message: "Data pembatalan tidak ditemukan" });
        }
        res.status(200).json({ success: true, message: "Data pembatalan berhasil dihapus", data: deletedBatal });
    } catch (error) {
        console.error('Error deleting cancellation data:', error);
        res.status(500).json({ success: false, message: `Terjadi kesalahan saat menghapus data pembatalan: ${error.message}` });
    }
});

module.exports = router;