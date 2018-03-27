const story = require('express').Router()

const storyCtrl = require('./story.ctrl')

story.post('/addStory',storyCtrl.addStory)
// story.get('/getmystory',storyCtrl.addStory)

module.exports = story