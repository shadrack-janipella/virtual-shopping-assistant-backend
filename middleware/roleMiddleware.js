const jwt = require("jsonwebtoken");

const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

  
    console.log("🔐 Authorization Header:", authHeader);

  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No token provided");
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

  
    const token = authHeader.split(" ")[1];
    console.log("✅ Token received:", token);

    try {
      
      console.log("🔑 JWT_SECRET from .env:", process.env.JWT_SECRET);

    
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
      console.log("🧠 Decoded token:", decoded);

    
      if (decoded.role !== requiredRole) {
        console.log("🚫 User role is not allowed:", decoded.role);
        return res.status(403).json({ error: "Access denied. Insufficient permissions." });
      }

    
      req.user = decoded;
      next();
    } catch (err) {
      console.log("❌ Token verification failed:", err.message);
      return res.status(401).json({ error: "Invalid token" });
    }
  };
};

module.exports = roleMiddleware;
