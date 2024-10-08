const express = require('express');
const Transaction = require('../models/Transaction'); 
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions' });
  }
});

router.post('/add', async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json({ msg: 'Transaction created successfully!', transaction });
  } catch (err) {
    res.status(400).json({ msg: 'Error creating transaction', error: err.message });
  }
});

// GET /api/transactions - Get all transactions
router.get('/getTransactions', async (req, res) => {
  try {
    // Fetch all transactions
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching transactions', error: err.message });
  }
});

router.patch('/:id/verify', async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, { verified: true }, { new: true });
    res.json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: 'Error verifying transaction' });
  }
});

router.patch('/:id/submit', async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, { submittedToSwift: true }, { new: true });
    res.json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: 'Error submitting transaction to SWIFT' });
  }
});

module.exports = router;
