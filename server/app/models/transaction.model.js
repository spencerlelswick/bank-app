const mongoose = require('mongoose')

const Transaction = mongoose.model(
  'Transaction',
  new mongoose.Schema({
    transactionNum: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    amount: Number,
    category: String,
    status: Boolean,
  })
)

module.exports = Transaction
