const users = require('../models/users')
let id = 1

module.exports = {
  login: (req, res) => {
    const {username, password} = req.body
    const user = users.find(u => u.username === username && u.password === password)
    if(user){
      req.session.user.username = username
      res.status(200).send(req.session.user)
    }else{
      res.sendStatus(500)
    }
  },
  register: (req, res) => {
    const {username, password} = req.body
    user = {id, username, password}
    id++
    users.push(user)
    req.session.user.username = username
    res.status(200).send(req.session.user)
  },
  signout: (req, res) => {
    req.session.destroy()
    res.status(200).send(req.session)
  },
  getUser: (req, res) => {
    res.status(200).send(req.session.user)
  }
}