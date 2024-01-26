const express = require("express");
const router = express.Router();
const Pemesanan = require("../models/Pemesanan");
const multer = require("multer");
const path = require("path");
const Selesai = require("../models/selesai");
const Batal = require("../models/batal")
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
router.post("/pemesanan", upload.fields([{ name: 'selpi', maxCount: 1 }, { name: 'transfer', maxCount: 1 }]), async (req, res) => {
  try {
    const { title, name, tanggalPemesanan, durasi, harga, jenisPembayaran, status } = req.body;

    // Pemeriksaan untuk memastikan file 'selpi' dan 'transfer' ada
    const selpiFile = req.files['selpi'];
    const transferFile = req.files['transfer'];

    if (!selpiFile || !selpiFile[0] || (jenisPembayaran === 'Transfer Bank' && (!transferFile || !transferFile[0]))) {
      // Handle error, mungkin dengan memberikan respon kesalahan
      res.status(400).json({ error: "File 'selpi' atau 'transfer' tidak ditemukan." });
      return;
    }

    const selpi = selpiFile[0].filename;
    const transfer = transferFile ? transferFile[0].filename : null;

    const pemesanan = new Pemesanan({
      tanggalPemesanan,
      title,
      name,
      durasi,
      harga,
      jenisPembayaran,
      selpi,
      transfer,
      status
    });

    const savedPemesanan = await pemesanan.save();
    res.status(200).json({ message: "Pembayaran sukses", data: savedPemesanan });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: error.message });
  }
});
router.get("/dataPesanan", async (req, res) => {
  try {
    const purchases = await Pemesanan.find();
    res.status(200).json(purchases);
  } catch (error) {
    console.error("Error fetching purchases:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/prosesPemesanan/:purchaseId", async (req, res) => {
  try {
    const { purchaseId } = req.params;
    // Temukan pemesanan yang akan diproses
    const purchase = await Pemesanan.findById(purchaseId);
    if (!purchase) {
      return res.status(404).json({ success: false, message: 'Pemesanan tidak ditemukan' });
    }

    const selesaiData = {
      title: purchase.title,
      tanggalPemesanan: purchase.tanggalPemesanan,
      durasi: purchase.durasi,
      harga: purchase.harga,
      name: purchase.name,
      status: 'Selesai',
      jenisPembayaran: purchase.jenisPembayaran,
      selpi: purchase.selpi,
      transfer: purchase.transfer,
    };

    const selesai = new Selesai(selesaiData);
    const savedSelesai = await selesai.save();
    await Pemesanan.findByIdAndRemove(purchaseId);
    res.status(200).json({ success: true, message: 'Pemesanan berhasil diproses', data: savedSelesai });
  } catch (error) {
    console.error('Error processing purchase:', error);
    res.status(500).json({ success: false, message: `Terjadi kesalahan saat memproses pemesanan: ${error.message}` });
  }
});

router.post("/batalPemesanan/:batalId", async (req, res) => {
  try {
    const { batalId } = req.params;
    // Temukan pemesanan yang akan dibatalkan
    const pemesanan = await Pemesanan.findById(batalId);
    if (!pemesanan) {
      return res.status(404).json({ success: false, message: 'Pemesanan tidak ditemukan' });
    }

    // Simpan data pembatalan
    const batalData = {
      title: pemesanan.title,
      tanggalPemesanan: pemesanan.tanggalPemesanan,
      durasi: pemesanan.durasi,
      harga: pemesanan.harga,
      name: pemesanan.name,
      status: 'Dibatalkan',
      jenisPembayaran: pemesanan.jenisPembayaran,
      selpi: pemesanan.selpi,
      transfer: pemesanan.transfer,
    };

    const batal = new Batal(batalData);
    const savedBatal = await batal.save();

    // Hapus pemesanan yang dibatalkan
    await Pemesanan.findByIdAndRemove(batalId);

    res.status(200).json({ success: true, message: 'Pemesanan berhasil dibatalkan', data: savedBatal });
  } catch (error) {
    console.error('Error processing cancellation:', error);
    res.status(500).json({ success: false, message: `Terjadi kesalahan saat memproses pembatalan pemesanan: ${error.message}` });
  }
});
module.exports = router;
