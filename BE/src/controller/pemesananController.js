const Pemesanan = require("../models/Pemesanan");
const router = require("express").Router();

// Route untuk endpoint /api/pemesanan
router.post("/pemesanan", async (req, res) => {
  try {
    const { tanggalPemesanan, durasi, harga, jenisPembayaran } = req.body;

    const pemesanan = new Pemesanan({
      tanggalPemesanan,
      durasi,
      harga,
      jenisPembayaran,
    });

    const savedPemesanan = await pemesanan.save();
    res
      .status(200)
      .json({ message: "Pembayaran sukses", data: savedPemesanan });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: error.message }); // Menampilkan pesan kesalahan lebih spesifik
  }
});

module.exports = router;
