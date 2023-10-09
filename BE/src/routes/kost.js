const express = require("express");
const kost = require("../models/kost");

const router = express.Router();
//create
router.post("/", async (req, res) => {
  const newKost = new kost(req.body);
  try {
    const saveKost = await newKost.save();
    res.status(200).json(saveKost);
  } catch (error) {
    res.status(500).json(err);
  }
});

//upadate
router.put("/:id", async (req, res) => {
  try {
    const updatedKost = await kost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedKost) {
      return res.status(404).json({ message: "Kost not found" });
    }

    res.status(200).json(updatedKost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const deleteKost = await kost.findByIdAndDelete(req.params.id);

    if (!deleteKost) {
      return res.status(404).json({ message: "Kost not found" });
    }

    res.status(200).json({ message: "kost sudah di hapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//get
router.get("/:id", async (req, res) => {
  try {
    const Kost = await kost.findByIdAndDelete(req.params.id);

    if (!Kost) {
      return res.status(404).json({ message: "Kost not found" });
    }
    res.status(200).json(Kost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//getall
router.get("/", async (req, res) => {
  try {
    const allKosts = await kost.find();
    res.status(200).json(allKosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
