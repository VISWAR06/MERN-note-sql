const db = require('../db');
const enct = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, password, contact, email } = req.body;
    const profile_image = null;
    if (!username || !password || !email) {
      return res.status(400).json({ msg: "Username, email, and password are required" });
    }

    const [existing] = await db.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, email]);
    if (existing.length > 0) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashpass = await enct.hash(password, 10);
    await db.query("INSERT INTO users (username, email, contact, password, profile_image) VALUES (?, ?, ?, ?, ?)",
      [username, email, contact || null, hashpass, profile_image]);

    res.status(201).json({ msg: "Created successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error: " + err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const [users] = await db.query("SELECT * FROM users WHERE email = ? OR username = ?", [username, username]);

    if (users.length === 0) {
      return res.status(400).json({ msg: "User not registered" });
    }

    const user = users[0];
    const check = await enct.compare(password, user.password);
    if (!check) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '1d',
    });

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + (process.env.COOKIE_EXP || 7) * 24 * 60 * 60 * 1000),
    });

    res.status(200).json({ msg: "Logged in successfully" });
  } catch (e) {
    res.status(500).json({ msg: "Server side error: " + e.message });
  }
};

const curruser = async (req, res) => {
  try {
    const userid = req.user.id;
    const [users] = await db.query("SELECT id, username, contact, email FROM users WHERE id = ?", [userid]);
    if (users.length === 0) {
      return res.status(500).json({ msg: "No user found" });
    }
    res.json(users[0]);
  } catch (err) {
    res.status(500).json({ msg: "Server side problem" });
  }
};

module.exports = { register, login, curruser };
