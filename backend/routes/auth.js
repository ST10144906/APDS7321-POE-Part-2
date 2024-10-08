const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Regular expressions
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
const idNumberRegex = /^\d{13,}$/; // ID must be at least 13 digits, numbers only
const accountNumberRegex =  /^[0-9]{10}$/; // Account number must be 10 digits, numbers only
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/; // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character

// REGISTER a new user
router.post('/register', async (req, res) => {
  const { name, email, password, idNumber, accountNumber } = req.body;

  // Validate email format
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: 'Invalid email format' });
  }

  // Validate ID number length and format
  if (!idNumberRegex.test(idNumber)) {
    return res.status(400).json({ msg: 'ID number must be at least 13 digits long and contain only numbers' });
  }

// Validate account number format
if (!accountNumberRegex.test(accountNumber)) {
  return res.status(400).json({ msg: 'Account number must be exactly 10 digits long and contain only numbers' });
  }

  // Validate password complexity
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ msg: 'Password must be at least 8 characters long, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character' });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Create new user
    user = new User({ name, email, password, idNumber, accountNumber });

    // Hash the password  
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// LOGIN an existing user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate email format
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: 'Invalid email format' });
  }

  try {
    // Find user by email
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    res.json({ 
      userId: user.idNumber,
      role: user.role,
      msg: 'Login successful'
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
