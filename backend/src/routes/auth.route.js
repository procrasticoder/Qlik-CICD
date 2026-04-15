// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const pool = require("../config/db");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check user exists
    const user = await pool.query(
      "Select * From user_details where user_email = $1;",
      [email],
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    // 2. Compare password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password,
    );

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Generate JWT
    const token = jwt.sign(
      { userId: user.rows[0].id, role: user.rows[0].user_role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
