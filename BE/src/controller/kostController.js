const Kost = require("../models/kost");
const multer = require("multer");
const path = require("path");
const router = require("express").Router();
const fs = require("fs");
const cloudinary = require('../util/cloudynary')
// Konfigurasi Multer
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Menggunakan timestamp sebagai nama file
  },
});

const upload = multer({ storage: storage });
// konfigurasi multer jika ingin disimpan dilokal
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

router.post("/kost", upload.array("photos", 5), async (req, res) => {
  try {
    // Mendapatkan ID admin dari request user
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
      statusKamar,
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
    const uploadedImages = await Promise.all(req.files.map(async (file) => {
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };
      try {
        const result = await cloudinary.uploader.upload(file.path, options); // Mengunggah gambar
        return result.secure_url; // Mengembalikan URL gambar yang diunggah dari Cloudinary
      } catch (error) {
        console.error(error)
      }

    }));

    // Membuat instance Kost dengan menyertakan createdBy(adminId)
    const newKost = new Kost({
      title,
      address,
      photos: uploadedImages,
      description,
      moreinfo,
      capacity,
      statusKamar,
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
router.post("/api/kost/:id", upload.array("photos", 5), async (req, res) => {
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
      statusKamar,
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
    const uploadedImages = await Promise.all(req.files.map(async (file) => {
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };
      try {
        const result = await cloudinary.uploader.upload(file.path, options); // Mengunggah gambar
        return result.secure_url; // Mengembalikan URL gambar yang diunggah dari Cloudinary
      } catch (error) {
        console.error(error)
        throw error; // lemparkan kesalahan untuk ditangkap di bawah
      }
    }));

    // Dapatkan data Kost yang akan diperbarui
    const kostToUpdate = await Kost.findById(id);

    if (!kostToUpdate) {
      return res.status(404).json({ error: "Data Kost tidak ditemukan." });
    }
    // Buat objek yang berisi data yang akan diperbarui
    const updatedKost = {
      title,
      address,
      photos: uploadedImages,
      jenis,
      description,
      moreinfo,
      capacity,
      owner,
      kamar,
      rekening,
      statusKamar,
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

    // Hapus gambar-gambar lama dari Cloudinary setelah pembaruan berhasil
    kostToUpdate.photos.forEach(async (photo) => {
      await cloudinary.uploader.destroy(photo.public_id);
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal memperbarui data Kost." });
  }
});

// Saat menghapus entitas Kost
router.delete("/kost/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const kostToDelete = await Kost.findById(id);

    if (!kostToDelete) {
      return res.status(404).json({ error: "Data Kost tidak ditemukan." });
    }

    // Menggunakan deleteOne untuk menghapus entitas Kost dari database
    await Kost.deleteOne({ _id: id });

    res.json({ message: "Data Kost berhasil dihapus." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menghapus data Kost." });
  }
});


module.exports = router;
