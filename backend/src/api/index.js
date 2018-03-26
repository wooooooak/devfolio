const auth = require('./auth')
// const user = require('./user')
// const post = require('./post')

const Router = require('express').Router
const api = new Router()

api.use('/auth', auth)
// api.use('/user', user)
// api.use('/post', post)

module.exports = api