const mongoose = require('mongoose')

const Transaction = mongoose.model(
  'Transaction',
  new mongoose.Schema({
    transactionNum: String,
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    amount: Number,
    category: String,
    status: Boolean,
  })
)

module.exports = Transaction
