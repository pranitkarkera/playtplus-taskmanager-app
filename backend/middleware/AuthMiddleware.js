const jwt = require("jsonwebtoken");

const ensureAuthenticated = async (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is required" });
  }

  try {
    const token = auth.split(" ")[1]; // Extract the token from "Bearer <token>"
    console.log("Token received:", token); // Debugging

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Debugging

    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification error:", err); // Debugging
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token wrong or expired" });
  }
};

module.exports = ensureAuthenticated;
