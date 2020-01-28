const swag = require('../models/swag')

module.exports = {
  search: (req, res) => {
    const {category} = req.query
    const i = swag.findIndex(el => el.category === category)
    if(i === -1){
      res.status(200).send(swag)
    }else{
      const filteredArray = swag.filter(el => el.category)
      res.status(200).send(filteredArray)
    }
  }
}