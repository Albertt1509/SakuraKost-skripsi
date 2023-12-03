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
    // Menghasilkan timestamp saat ini dalam milidetik sebagai bagian dari nama file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    // Menggabungkan semua elemen untuk membentuk nama file yang unik
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });
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
      rekening,
      location,
      jenis,
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
      jenis,
      kamar,
      owner,
      rekening,
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
    const { search, jenis, hargaMin, hargaMax } = req.query;
    let filter = {};
    if (search) {
      filter.owner = { $regex: new RegExp(search, "i") };
    }
    if (jenis) {
      filter.jenis = jenis;
    }
    if (hargaMin || hargaMax) {
      filter.price = {};
      if (hargaMin) {
        filter.price.$gte = parseInt(hargaMin);
      }
      if (hargaMax) {
        filter.price.$lte = parseInt(hargaMax);
      }
    }
    const kostData = await Kost.find(filter);

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
}); //update data
router.put("/api/kost/:id", upload.array("photos", 5), async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari parameter rute
    const {
      title,
      address,
      description,
      moreinfo,
      capacity,
      jenis,
      rekening,
      owner,
      location,
      phoneNumber,
      price,
      kamar,
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
    const newPhotos = req.files.map((file) => file.filename);

    // Dapatkan data Kost yang akan diperbarui
    const kostToUpdate = await Kost.findById(id);

    if (!kostToUpdate) {
      return res.status(404).json({ error: "Data Kost tidak ditemukan." });
    }
    // Buat objek yang berisi data yang akan diperbarui
    const updatedKost = {
      title,
      address,
      photos: newPhotos,
      jenis,
      description,
      moreinfo,
      capacity,
      owner,
      kamar,
      rekening,
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

    // Hapus gambar-gambar lama dari direktori setelah pembaruan berhasil
    kostToUpdate.photos.forEach((photo) => {
      const filePath = path.join("./images", photo);
      fs.unlinkSync(filePath);
    });

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
      const filePath = path.join("./images", photo);
      fs.unlinkSync(filePath);
    });

    res.json({ message: "Data Kost berhasil dihapus." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menghapus data Kost." });
  }
});

module.exports = router;
