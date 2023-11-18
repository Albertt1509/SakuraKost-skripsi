const Kost = require("../models/kost"); // Pastikan Anda memiliki file kostModel.js yang Anda berikan di proyek Anda
const multer = require("multer");
const path = require("path");
const router = require("express").Router();
const fs = require("fs");
// Konfigurasi Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); // Folder tempat gambar akan disimpan
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Nama file akan menjadi timestamp unik
  },
});
const upload = multer({ storage: storage });

// Rute GET untuk mengambil data Kost
router.get("/kost", async (req, res) => {
  try {
    const kostData = await Kost.find(); // Mengambil semua data Kost dari database
    res.json(kostData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data Kost." });
  }
});
// Mengunggah gambar dan menyimpan data Kost ke database
router.post("/kost", upload.array("photos", 5), async (req, res) => {
  try {
    const {
      title,
      address,
      description,
      moreinfo,
      capacity,
      owner,
      location,
      kamar,
      phoneNumber,
      price,
      wifi,
      parking,
      kitchen,
      laundry,
      servant,
      free,
      fullRoom,
      pet,
      energy,
      water,
    } = req.body;
    const photos = req.files.map((file) => file.filename); // Ambil nama file dari gambar yang diunggah

    const newKost = new Kost({
      title,
      address,
      photos,
      description,
      moreinfo,
      capacity,
      kamar,
      owner,
      location,
      phoneNumber,
      price,
      wifi,
      parking,
      kitchen,
      laundry,
      servant,
      free,
      fullRoom,
      pet,
      energy,
      water,
    });

    //delete data
    const deleteDataKost = async (req, res) => {
      try {
        const { id } = req.params;
        // Lakukan operasi penghapusan data Kost berdasarkan ID
        // Contoh: Kost.findByIdAndRemove(id)
        await Kost.findByIdAndRemove(id);
        res.json({ message: "Data Kost berhasil dihapus." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Gagal menghapus data Kost." });
      }
    };

    const savedKost = await newKost.save();
    res.json(savedKost);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Terjadi kesalahan dalam menyimpan data Kost." });
  }
});
//upadate data
router.put("/api/kost/:id", upload.array("photos", 5), async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari parameter rute
    const {
      title,
      address,
      description,
      moreinfo,
      capacity,
      kamar,
      owner,
      location,
      phoneNumber,
      price,
      wifi,
      parking,
      kitchen,
      laundry,
      servant,
      free,
      fullRoom,
      pet,
      energy,
      water,
    } = req.body;
    const photos = req.files.map((file) => file.filename);

    // Buat objek yang berisi data yang akan diperbarui
    const updatedKost = {
      title,
      address,
      photos,
      kamar,
      description,
      moreinfo,
      capacity,
      owner,
      location,
      phoneNumber,
      price,
      wifi,
      parking,
      kitchen,
      laundry,
      servant,
      free,
      fullRoom,
      pet,
      energy,
      water,
    };

    // Lakukan operasi pembaruan data Kost berdasarkan ID
    const result = await Kost.findByIdAndUpdate(id, updatedKost, { new: true });

    if (!result) {
      return res.status(404).json({ error: "Data Kost tidak ditemukan." });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal memperbarui data Kost." });
  }
});
//delete
router.delete("/kost/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Lakukan operasi penghapusan data Kost berdasarkan ID
    // Contoh: Kost.findByIdAndRemove(id)
    const deletedKost = await Kost.findByIdAndRemove(id);

    if (!deletedKost) {
      return res.status(404).json({ error: "Data Kost tidak ditemukan." });
    }

    // Hapus gambar dari direktori
    deletedKost.photos.forEach((photo) => {
      const filePath = path.join("public/uploads/", photo);
      fs.unlinkSync(filePath);
    });

    res.json({ message: "Data Kost berhasil dihapus." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menghapus data Kost." });
  }
});

module.exports = router;
