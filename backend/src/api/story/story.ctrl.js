const chalk = require('chalk')
const multer = require('multer')
const User = require('db/model/user')
const Story = require('db/model/story')
const fs = require('fs')
const FroalaEditor = require('wysiwyg-editor-node-sdk');

exports.addStory = async (req,res) => {
  try {
    const email = req.decoded.email
    const displayName = req.decoded.displayName
    console.log(chalk.blue(req.body));
    let user = await User.findOneByEmail(email)
    let story = await Story.create(req.body.storyInfo, email, displayName)
    user.stories.push(story._id)
    await user.save()
    res.status(200).json({
      message : 'add story successfully!'
    })
  } catch (error) {
    console.log(chalk.yellow(error))
    res.status(500).json({
      message : 'add story failed.....'
    })
  }
}

exports.uploadImage = async(req,res) => {
  FroalaEditor.Image.upload(req, 'public/uploads/', function(err, data) {
    data.link = data.link.replace('public/','')
    data.link = 'http://localhost:8082/'+data.link
    if (err) {
      console.log(err);
      return res.send(JSON.stringify(err))
    }
 
    res.send(data)
  });
}

exports.getStories = async (req,res) => {
  const email = req.query.email
  const displayName = req.query.displayName
  try {
    const stories = await Story.find({displayName:displayName})
    res.status(200).json(stories)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message : 'get story failed.....'
    })
  }
}

exports.getStory = async (req,res) => {
  const storyId = req.query.storyId
  console.log(storyId)
  try {
    const story = await Story.findById(storyId)
    story.viewCount++
    await story.save()
    res.status(200).json(story)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      messgae : 'getStory faild',
      err : error
    })
  }
}
