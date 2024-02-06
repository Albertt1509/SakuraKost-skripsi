const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "awdad231e2fdf243tr242d3d23";

//register
const createRegisterUser = async (req, res) => {
  const { name, email, password, alamat, nohp, gender } = req.body;

  // logic passowrd 8 character
  if (password.length < 8 || !/\d/.test(password)) {
    return res.status(422).json({
      message:
        "Password harus memiliki minimal 8 karakter dan mengandung angka.",
    });
  }

  try {
    const userData = await User.create({
      name,
      email,
      alamat,
      nohp,
      gender,
      password: bcrypt.hashSync(password, bcryptSalt),
      role: "user",
    });
    res.json(userData);
  } catch (e) {
    res.status(422).json(e);
  }
};

//login
const postLoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(422).json("Email tidak ditemukan");
    }
    // Verif password
    const passCorrect = bcrypt.compareSync(password, userData.password);

    if (passCorrect) {
      jwt.sign(
        { email: userData.email, id: userData._id },
        jwtSecret,
        {},
        (error, token) => {
          if (error) throw error;
          res.cookie("token", token).json(userData);
        }
      );
    } else {
      // Jika kata sandi salah, kirim respons kesalahan
      res.status(422).json("Password yang Anda Masukkan Salah");
    }
  } catch (e) {
    res.status(500).json("Terjadi kesalahan server");
  }
};
//get all data
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name alamat role");
    res.json(users);
  } catch (error) {
    res.status(500).json("Terjadi kesalahan server");
  }
};
//profile
const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userCookie) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userCookie.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
};

//logout
const getLogout = (req, res) => {
  res.clearCookie('token').json(true);
};
module.exports = {
  createRegisterUser,
  postLoginUser,
  getProfile,
  getLogout,
  getAllUsers,
};
