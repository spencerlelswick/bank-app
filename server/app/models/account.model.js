const mongoose = require('mongoose')

const Account = mongoose.model(
  'Account',
  new mongoose.Schema({
    accountNum: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    status: Boolean,
    balance: Number,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],
  })
)

module.exports = Account
