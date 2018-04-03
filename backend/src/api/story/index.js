const story = require('express').Router()
const jwtMiddleware = require('lib/middleware/jwt')
// const multer = require('multer');
// 기타 express 코드
// const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });

const storyCtrl = require('./story.ctrl')

story.use('/addStory',jwtMiddleware)
story.post('/addStory',storyCtrl.addStory)
story.get('/getStories',storyCtrl.getStories)
story.get('/getStory',storyCtrl.getStory)
story.post('/uploadImage',storyCtrl.uploadImage)

module.exports = story