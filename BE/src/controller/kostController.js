const Kost = require("../models/kost");
const multer = require("multer");
const path = require("path");
const router = require("express").Router();
const fs = require("fs");
// Konfigurasi Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images"); // Folder tempat gambar akan disimpan
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Nama file akan menjadi timestamp unik
  },
});
const upload = multer({
  storage: storage,
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
    const savedKost = await newKost.save();
    res.json(savedKost);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Terjadi kesalahan dalam menyimpan data Kost." });
  }
});
// Rute GET untuk mengambil data Kos
router.get("/kost", async (req, res) => {
  try {
    const { search } = req.query;

    let kostData;
    if (search) {
      kostData = await Kost.find({
        owner: { $regex: new RegExp(search, "i") },
      });
    } else {
      kostData = await Kost.find();
    }

    // Tambahkan URL lengkap gambar ke setiap objek Kost
    const kostsWithImageUrls = kostData.map((kost) => ({
      ...kost.toObject(),
      photos: kost.photos.map((photo) => `${photo}`),
    }));

    res.json(kostsWithImageUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data Kost." });
  }
});
//get detail

router.get("/api/kost/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const kostData = await Kost.findById(id);

    if (!kostData) {
      return res.status(404).json({ error: "Data Kost tidak ditemukan." });
    }

    const kostWithImageUrls = {
      ...kostData.toObject(),
      photos: kostData.photos.map((photo) => `${photo}`),
    };

    res.json(kostWithImageUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data Kost." });
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
    const deletedKost = await Kost.findByIdAndRemove(id);

    if (!deletedKost) {
      return res.status(404).json({ error: "Data Kost tidak ditemukan." });
    }

    // Hapus gambar dari direktori
    deletedKost.photos.forEach((photo) => {
      const filePath = path.join("/images", photo);
      fs.unlinkSync(filePath);
    });

    res.json({ message: "Data Kost berhasil dihapus." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menghapus data Kost." });
  }
});

module.exports = router;
