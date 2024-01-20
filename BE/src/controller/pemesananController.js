const express = require("express");
const router = express.Router();
const Pemesanan = require("../models/Pemesanan");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./foto"); // Folder tempat gambar akan disimpan
  },
  filename: (req, file, cb) => {
    // Menghasilkan timestamp saat ini dalam milidetik sebagai bagian dari nama file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    // Menggabungkan semua elemen untuk membentuk nama file yang unik
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

// Route untuk endpoint
router.post("/pemesanan", upload.array("selpi", 1), async (req, res) => {
  try {
    const { tanggalPemesanan, durasi, harga, jenisPembayaran } = req.body;
    const selpi = req.files.map((file) => file.filename);
    const pemesanan = new Pemesanan({
      tanggalPemesanan,
      durasi,
      harga,
      jenisPembayaran,
      selpi,
    });
    const savedPemesanan = await pemesanan.save();
    res.status(200).json({ message: "Pembayaran sukses", data: savedPemesanan });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: error.message }); // Menampilkan pesan kesalahan lebih spesifik
  }
});

module.exports = router;
