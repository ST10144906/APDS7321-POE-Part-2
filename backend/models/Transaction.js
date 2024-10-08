const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({ 
  accountNumber: { type: String, required: true},
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  provider: { type: String, required: true, default: 'SWIFT' },
  accountInfo: { type: String, required: true },
  swiftCode: { type: String, required: true },
  verified: { type: Boolean, default: false },
  submittedToSwift: { type: Boolean, default: false }
});

module.exports = mongoose.model('Transaction', transactionSchema);
