const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      error: true,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: true,
      message: "Invalid token.",
    });
  }
};

// Middleware for Admin Authorization
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      error: true,
      message: "Access denied. Admins only.",
    });
  }
  next();
};

// Middleware for Employee Authorization
const isEmployee = (req, res, next) => {
  if (req.user.role !== "employee") {
    return res.status(403).json({
      error: true,
      message: "Access denied. Employees only.",
    });
  }
  next();
};

module.exports = { verifyToken, isAdmin, isEmployee };
