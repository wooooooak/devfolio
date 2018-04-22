const user = require('express').Router()
const jwtMiddleware = require('lib/middleware/jwt')

const userCtrl = require('./user.ctrl')

// 이것도 수정해야될듯ㅅ
// user.get('/getUserData',userCtrl.getUserData)
user.get('/:displayName',userCtrl.getUserData)


user.post('/follow', jwtMiddleware)
user.post('/follow', userCtrl.addfollow)

user.put('/:email', jwtMiddleware)
user.put('/:email', userCtrl.updateData)

user.delete('/:email', jwtMiddleware)
user.delete('/:email', userCtrl.updateData)

// followedUsers를 보여주는 것이라면 get이여야 한다.
user.post('/tag',userCtrl.findByTags)
user.post('/followedUsers',userCtrl.followedUsers)

module.exports = user