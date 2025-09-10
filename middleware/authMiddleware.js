// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.verifyUser = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.redirect('/login');

  try {
    const decoded = jwt.verify(token, "secreto123");
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect('/login');
  }
};
