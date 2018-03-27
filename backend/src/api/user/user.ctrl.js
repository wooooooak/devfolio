const chalk = require('chalk')
const jwt = require('jsonwebtoken')
const User = require('db/model/user')


exports.getUserData = async (req,res) => {
  console.log(req.decoded)
  try {
    const email = req.decoded.email
    const user = await User.findOneByEmail(email)
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }

}
