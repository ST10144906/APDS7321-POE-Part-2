const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
});

router.patch('/:id/verify', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, { verified: true }, { new: true });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error verifying transaction', error: error.message });
  }
});

router.patch('/:id/submit', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, { submittedToSwift: true }, { new: true });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting transaction', error: error.message });
  }
});

module.exports = router;
