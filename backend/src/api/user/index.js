const user = require('express').Router()

const userCtrl = require('./user.ctrl')

user.get('/getUserData',userCtrl.getUserData)

module.exports = user