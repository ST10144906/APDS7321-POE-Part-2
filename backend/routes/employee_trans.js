const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.get('/pending', async (req, res) => {
  try {
    const transactions = await Transaction.find({ verified: false });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching transactions' });
  }
});

router.post('/submit', async (req, res) => {
  try {
    const { transactions } = req.body;
    await Transaction.updateMany(
      { _id: { $in: transactions.map(txn => txn._id) } },
      { $set: { submittedToSwift: true } }
    );
    res.json({ msg: 'Transactions submitted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error submitting transactions' });
  }
});

module.exports = router;