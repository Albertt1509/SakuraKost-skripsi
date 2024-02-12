const express = require("express");
const router = express.Router();
const Pemesanan = require("../models/Pemesanan");
const path = require("path");
const Selesai = require("../models/selesai");
const Batal = require("../models/batal");
const multer = require("multer");
const cloudinary = require('../util/cloudynary')
// konfigurasi multer jika ingin disimpan di lokal
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null); // Folder tempat gambar akan disimpan jika ingin disimpan di lokal
//   },
//   filename: (req, file, cb) => {
//     // Menghasilkan timestamp saat ini dalam milidetik sebagai bagian dari nama file
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     // Menggabungkan semua elemen untuk membentuk nama file yang unik
//     cb(null, file.fieldname + "-" + uniqueSuffix + ext);
//   },
// });
// const upload = multer({ storage: storage });
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Menggunakan timestamp sebagai nama file
  },
});

const upload = multer({ storage: storage });
// Fungsi untuk mengunggah gambar ke Cloudinary
const uploadImageToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url; // Mengembalikan URL gambar yang diunggah dari Cloudinary
  } catch (error) {
    throw new Error('Gagal mengunggah gambar ke Cloudinary: ' + error.message);
  }
};

// Route untuk endpoint pembayaran
router.post("/pemesanan", upload.fields([{ name: 'selpi', maxCount: 1 }, { name: 'transfer', maxCount: 1 }]), async (req, res) => {
  try {
    const { title, name, tanggalPemesanan, durasi, harga, jenisPembayaran, status } = req.body;
    const selpiFile = req.files['selpi'];
    const transferFile = req.files['transfer'];

    if (!selpiFile || !selpiFile[0] || (jenisPembayaran === 'Transfer Bank' && (!transferFile || !transferFile[0]))) {
      res.status(400).json({ error: "File 'selpi' atau 'transfer' tidak ditemukan." });
      return;
    }

    const selpi = await uploadImageToCloudinary(selpiFile[0]);
    const transfer = jenisPembayaran === 'Transfer Bank' ? await uploadImageToCloudinary(transferFile[0]) : null;

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

// Route untuk endpoint pengambilan data pesanan
router.get("/dataPesanan", async (req, res) => {
  try {
    const purchases = await Pemesanan.find();
    res.status(200).json(purchases);
  } catch (error) {
    console.error("Error fetching purchases:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route untuk endpoint pemrosesan pesanan
router.post("/prosesPemesanan/:purchaseId", async (req, res) => {
  try {
    const { purchaseId } = req.params;
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

// Route untuk endpoint pembatalan pesanan
router.post("/batalPemesanan/:batalId", async (req, res) => {
  try {
    const { batalId } = req.params;
    const pemesanan = await Pemesanan.findById(batalId);
    if (!pemesanan) {
      return res.status(404).json({ success: false, message: 'Pemesanan tidak ditemukan' });
    }

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
    await Pemesanan.findByIdAndRemove(batalId);

    res.status(200).json({ success: true, message: 'Pemesanan berhasil dibatalkan', data: savedBatal });
  } catch (error) {
    console.error('Error processing cancellation:', error);
    res.status(500).json({ success: false, message: `Terjadi kesalahan saat memproses pembatalan pemesanan: ${error.message}` });
  }
});

module.exports = router;
