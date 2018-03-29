const story = require('express').Router()
const jwtMiddleware = require('lib/middleware/jwt')

const storyCtrl = require('./story.ctrl')

story.use('/addStory',jwtMiddleware)
story.post('/addStory',storyCtrl.addStory)
story.get('/getStories',storyCtrl.getStories)
story.get('/getStory',storyCtrl.getStory)

module.exports = story