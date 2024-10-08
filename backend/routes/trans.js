// routes/transaction.js
const express = require('express');
const Transaction = require('../models/Transaction'); // The Transaction model
const router = express.Router();

// POST /api/transactions to create a new transaction
router.post('/', async (req, res) => {
  try {
    // Create a new transaction with the data from the request body
    const transaction = new Transaction(req.body);

    // Save the transaction to the database
    await transaction.save();

    // Respond with a success message
    res.status(201).json({ msg: 'Transaction created successfully!', transaction });
  } catch (err) {
    res.status(400).json({ msg: 'Error creating transaction', error: err.message });
  }
});

module.exports = router;