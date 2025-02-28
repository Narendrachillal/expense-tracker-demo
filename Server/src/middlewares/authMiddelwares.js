import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract the actual token

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach decoded user info to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
