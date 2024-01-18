const dotenv = require('dotenv').config()
const AUTH_SECRET = dotenv.parsed.AUTH_SECRET

const db = require('../models')
const User = db.user
const Role = db.role
const Account = db.account

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
const Transaction = require('../models/transaction.model')

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })

  user.save(async (err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err })
            return
          }

          user.roles = roles.map((role) => role._id)
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err })
              return
            }

            res.send({ message: 'User registered successfully!' })
          })
        }
      )
    } else {
      Role.findOne({ name: 'user' }, async (err, role) => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }


        const mockAcctNum = Math.floor(100000 + Math.random() * 900000000)

        const mockTransactions = []


        const newAccount = await Account.create({ accountNum: mockAcctNum, status: true, balance: 100, owner: user._id, transactions: mockTransactions })


        for (let i = 0; i < 10; i++) {
          const mockTxNum = Math.floor(100000 + Math.random() * 900000000)
          const mockTxAmount = Math.floor(Math.random() * (10 * 100 - 100) + 100) / (100)
          const mockVendors = ['WALMART', 'KROGER', 'AMAZON', 'BESTBUY', 'TARGET', 'MEIJER', 'COSTCO', 'LOWES', 'HOME DEPOT', 'AUTO ZONE']
          const mockVendorIdx = Math.floor(Math.random() * 10)

          const newMockTx = await Transaction.create({ account: newAccount._id, amount: mockTxAmount, category: mockVendors[mockVendorIdx], status: true, transactionNum: mockTxNum })
          mockTransactions.push(newMockTx._id)
        }

        user.roles = [role._id]

        newAccount.transactions = mockTransactions
        newAccount.save()
        console.log(newAccount);
        user.accounts.push(newAccount)
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err })
            return
          }

          res.send({ message: 'User registered successfully!' })
        })
      })


    }
  })
}

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate('roles', '-__v')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }

      if (!user) {
        return res.status(404).send({ message: 'User Not found.' })
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

      if (!passwordIsValid) {
        return res.status(401).send({ message: 'Invalid Password!' })
      }

      const token = jwt.sign({ id: user.id }, AUTH_SECRET, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      })

      var authorities = []

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push('ROLE_' + user.roles[i].name.toUpperCase())
      }

      req.session.token = token

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
      })
    })
}

exports.signout = async (req, res) => {
  try {
    req.session = null
    return res.status(200).send({ message: "User logged out successfuly." })
  } catch (err) {
    this.next(err)
  }
}
