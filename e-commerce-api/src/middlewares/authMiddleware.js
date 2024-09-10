const jwt = require("jsonwebtoken");
const User = require("../domain/models/userModel"); // Assuming you have a User model

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
