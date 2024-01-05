const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose
db.user = require('./user.model')
db.role = require('./role.model')
db.account = require('./account.model')
db.transaction = require('./transaction.model')

db.ROLES = ['user', 'admin']

module.exports = db
