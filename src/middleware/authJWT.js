const jwt = require('jsonwebtoken');
const config = require('../config/auth');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/');
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log(err.message);
      return res.json(err);
    }

    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
