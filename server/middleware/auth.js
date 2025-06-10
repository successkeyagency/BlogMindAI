import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    // jwt.verify returns the decoded payload if valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user info (email, isDemo, etc.) to req.user
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default auth;
