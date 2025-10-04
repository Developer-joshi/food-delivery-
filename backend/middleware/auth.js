import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Incoming token:", authHeader);
    console.log("JWT_SECRET loaded:", !!jwtSecret); // ensure not undefined

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret);
    req.user = { id: decoded.id }; // ✅ no name used

    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default authMiddleware;
