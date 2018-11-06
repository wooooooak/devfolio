const user = require('express').Router()
const jwtMiddleware = require('lib/middleware/jwt')

const userCtrl = require('./user.ctrl')

// 이 함수가 밑에있으면 /:displayName에 걸려서 실행이 안되는구나
user.get('/test',userCtrl.test)
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
//이것도 get으로 받아야 맞다. query string으로 배열을 분석해서..
user.post('/tag',userCtrl.findByTags)
user.post('/followedUsers',userCtrl.followedUsers)


module.exports = user