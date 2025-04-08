const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    console.log("📥 Registration Request:", { username, email, role });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("⚠️ User already exists with this email:", email);
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "core",
    });

    await newUser.save();
    console.log("✅ New user registered:", newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(500).json({ error: "Registration failed", details: err.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📥 Login Request:", { email });

  
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ Login failed: User not found");
      return res.status(404).json({ error: "User not found" });
    }

  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Login failed: Invalid credentials");
      return res.status(401).json({ error: "Invalid credentials" });
    }

  
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    console.log("✅ Login successful - Token Generated:", token);
    console.log("🔑 JWT_SECRET Used:", process.env.JWT_SECRET);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ error: "Login failed", details: err.message });
  }
});

module.exports = router;
