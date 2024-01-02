const express = require('express')
const cors = require('cors')
const cookieSession = require('cookie-session')

const dotenv = require('dotenv').config()
const DATABASE_URI = dotenv.parsed.DATABASE_URI
const COOKIE_SECRET = dotenv.parsed.COOKIE_SECRET

const app = express()

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:4200', 'http://localhost:4205'],
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  cookieSession({
    name: 'bank-session',
    keys: [COOKIE_SECRET],
    httpOnly: true,
  })
)

const db = require('./app/models')
const Role = db.role

db.mongoose
  .connect(DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection successful.')
    initial()
  })
  .catch((err) => {
    console.error('Error connecting to database: ', err)
    process.exit()
  })

app.get('/', (req, res) => {
  res.json({ message: 'Test route' })
})

require('./app/routes/user.routes')(app)
require('./app/routes/auth.routes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user',
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'user' to roles collection")
      })

      new Role({
        name: 'moderator',
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'moderator' to roles collection")
      })

      new Role({
        name: 'admin',
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'admin' to roles collection")
      })
    }
  })
}
