const auth = require('./auth')
const story = require('./story')
const user = require('./user')
const appInfo = require('./appInfo')
const jwtMiddleware = require('lib/middleware/jwt')

const Router = require('express').Router
const api = new Router()

api.use('/auth', auth)

// api.use('/story',jwtMiddleware)
api.use('/story', story)
// api.use('/user',jwtMiddleware)
api.use('/user', user)
api.use('/appInfo', appInfo)

module.exports = api