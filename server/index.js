require('dotenv').config()
const express = require('express')
const session = require('express-session')
const app = express()
const {SESSION_SECRET, SERVER_PORT} = process.env
const checkForSession = require('./middlewares/checkForSession')
const swagCtrl = require('./controllers/swagController')
const authCtrl = require('./controllers/authController')
const cartCtrl = require('./controllers/cartController')
const searchCtrl = require('./controllers/searchController')


app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))

app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`))

//ENDPOINTS
//swag
app.get('/api/swag', swagCtrl.read)
//user
app.get('/api/user', authCtrl.getUser)
app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/signout', authCtrl.signout)
//cart
app.post('/api/checkout', cartCtrl.checkout)
app.post('/api/cart/:id', cartCtrl.add)
app.delete('/api/cart/:id', cartCtrl.delete)
//search
app.get('/api/search', searchCtrl.search)