const auth = require('express').Router()
const authCtrl = require('./auth.ctrl')

auth.get('/emailCheck',authCtrl.registerEmailCheck)
auth.post('/register',authCtrl.register)
auth.post('/login',authCtrl.socaiLogin)
auth.post('/localLogin',authCtrl.localLogin)


module.exports = auth