const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract the token from the Authorization header

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Set the user in the request object
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: 'Invalid token' });
  }
};
