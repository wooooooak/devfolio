const auth = require('express').Router()
const authCtrl = require('./auth.ctrl')
const authMiddleware = require('lib/middleware/jwt')

auth.post('/register',authCtrl.register)
auth.post('/login',authCtrl.login)


module.exports = auth