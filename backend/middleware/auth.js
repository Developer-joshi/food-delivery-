import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token)
      return res.status(401).json({ success: false, message: "Token missing" });

    const decoded = jwt.verify(token, jwtSecret);
    req.user = { id: decoded.id, name: decoded.name }; // Set from token payload

    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default authMiddleware;
