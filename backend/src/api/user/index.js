const user = require('express').Router()
const jwtMiddleware = require('lib/middleware/jwt')

const userCtrl = require('./user.ctrl')

user.get('/getUserData',userCtrl.getUserData)


user.post('/follow', jwtMiddleware)
user.post('/follow', userCtrl.addfollow)

user.put('/:email', jwtMiddleware)
user.put('/:email', userCtrl.updateData)

user.delete('/:email', jwtMiddleware)
user.delete('/:email', userCtrl.updateData)

user.post('/tag',userCtrl.findByTags)

module.exports = user