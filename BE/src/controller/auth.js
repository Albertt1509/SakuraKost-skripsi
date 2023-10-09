const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "awdad231e2fdf243tr242d3d23";

//register
const createRegisterUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userData = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userData);
  } catch (e) {
    res.status(422).json(e);
  }
};

//login
const postLoginUser = async (req, res) => {
  const { email, password } = req.body;
  const userData = await User.findOne({ email });
  if (userData) {
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
      res.status(422).json("password salah");
    }
  } else {
    res.json("not found");
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

module.exports = {
  createRegisterUser,
  postLoginUser,
  getProfile,
};
