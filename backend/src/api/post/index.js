const post = require('express').Router()

const postCtrl = require('./post.ctrl')

post.get('/',postCtrl.get)

module.exports = post