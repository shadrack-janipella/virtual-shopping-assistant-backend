require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      console.log("✅ Admin user already exists:", existingAdmin.email);
    } else {
      const hashedPassword = await bcrypt.hash("admin123", 10); 
      const adminUser = new User({
        username: "admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
      });

      await adminUser.save();
      console.log("✅ Admin user created: admin@example.com / admin123");
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    mongoose.connection.close();
  }
};

createAdmin();
