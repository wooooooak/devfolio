const story = require('express').Router()
const jwtMiddleware = require('lib/middleware/jwt')
// const multer = require('multer');
// 기타 express 코드
// const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });

const storyCtrl = require('./story.ctrl')

// story/:id POST로 바꾸자
story.post('/addStory',jwtMiddleware)
story.post('/addStory',storyCtrl.addStory)

// stories도 조회면 stories/:id
// 이게 front 어디에서 호출하는지 모르겟다..
story.get('/getStories',storyCtrl.getStories)
// sotry도 조회면 story/:id

story.get('/story',storyCtrl.getStory)
story.put('/:id',jwtMiddleware)
story.put('/:id',storyCtrl.updateStory)

// image도 upload면 post 조회면 get
story.post('/uploadImage',storyCtrl.uploadImage)
story.delete('/:id',jwtMiddleware)
story.delete('/:id',storyCtrl.deleteStory)
story.get('/viewCount/:count',storyCtrl.getLimitedStory)


module.exports = story