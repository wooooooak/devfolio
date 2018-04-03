const appInfo = require('express').Router()
const appInfoCtrl = require('./appInfo.ctrl')

appInfo.get('/getLanguageChart',appInfoCtrl.getLanguageChart)
// appInfo.post('/login',appInfoCtrl.login)


module.exports = appInfo