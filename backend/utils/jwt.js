const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET, // Add this to your .env file
    { expiresIn: '1h' }
  );
};

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
