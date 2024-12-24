const express = require("express");
const router = express.Router();
const axios=require('axios');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { authenticate, authorize } = require("../utility/authorization");
const User = require('../models/User'); // Adjust the path if the location is different

  // JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET_KEY ;

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: "User not found" });
       console.log(user);
        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(401).json({ error: "Invalid credentials" });
        console.log(isPasswordValid);
        let extractName=email.split('@');
        // Generate token valid for 3 hours
      const token = jwt.sign(
        { id: user.id, role: user.role,email:user.email},
        JWT_SECRET,
        { expiresIn: "3h" }
      );
      console.log(token);
      res.status(200).json({ message: "Login successful", token,userName:extractName[0],role:user.role });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });
  


// Example protected route
router.get("/users", authenticate, authorize(["admin"]), async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const users = await User.findAll();
  res.json(users);
});


router.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
  res.json({ message: "Welcome, admin!" });
});

router.get("/profile", authenticate, (req, res) => {
  res.json({ message: `Hello, ${req.user.role}!` });
});

module.exports = router;