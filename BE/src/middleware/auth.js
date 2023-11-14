// authenticateMiddleware.js
const jwt = require("jsonwebtoken");
const jwtSecret = "awdad231e2fdf243tr242d3d23";

const authenticateMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        // Token tidak valid, arahkan ke halaman login
        return res.redirect("/login");
      }

      req.user = user; // Setel user dalam objek request
      next();
    });
  } else {
    // Token tidak tersedia, arahkan ke halaman login
    return res.redirect("/login");
  }
};

module.exports = authenticateMiddleware;
