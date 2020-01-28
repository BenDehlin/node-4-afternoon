const swag = require('../models/swag')

module.exports = {
  add: (req, res) => {
    const {id} = req.params
    const {user} = req.session
    const i = user.cart.findIndex(el => el.id === +id)
    if(i !== -1){
      res.status(200).send(user)
    }else{
      const item = swag.find(el => el.id === +id)
      user.cart.push(item)
      user.total += item.price
      res.status(200).send(user)
    }
  },
  delete: (req, res) => {
    const {id} = req.params
    const i = req.session.user.cart.findIndex(el => el.id === +id)
    if(i !== -1){
      req.session.user.total -= req.session.user.cart[i].price
      req.session.user.cart.splice(i, 1)
    }
    res.status(200).send(req.session.user)
  },
  checkout: (req, res) => {
    const {user} = req.session
    user.cart = []
    user.total = 0
    res.status(200).send(user)
  }
}