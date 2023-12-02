const User = require("../models/users");
const Kost = require("../models/kost");

// Menambahkan kost ke daftar favorit pengguna
exports.addToFavorites = async (req, res) => {
  const { userId, kostId } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: kostId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await Kost.findByIdAndUpdate(kostId, { $addToSet: { savedBy: userId } });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.removeFromFavorites = async (req, res) => {
  const { userId, kostId } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: kostId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await Kost.findByIdAndUpdate(kostId, { $pull: { savedBy: userId } });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getFavorites = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("favorites");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
