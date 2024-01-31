// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
//const { generateSecretKey } = require('../auth'); // Update the path accordingly
const config = require('../config');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing Token' });
  }
  //const secretKey = generateSecretKey(); // You can use your own method to get the secret key
  const secretKey = config.jwtSecret;

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden - Invalid Token' });
    }

    // Attach the user to the request object for later use in route handling
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
