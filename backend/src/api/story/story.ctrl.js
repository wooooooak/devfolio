const chalk = require('chalk')
const User = require('db/model/user')
const Story = require('db/model/story')

exports.addStory = async (req,res) => {
  try {
    const email = req.decoded.email
    const displayName = req.decoded.displayName
    console.log(chalk.blue(req.decoded));
    let user = await User.findOneByEmail(email)
    let story = await Story.create(req.body.storyInfo, email, displayName)
    console.log(chalk.green('here'));
    console.log(story._id)
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

exports.getStories = async (req,res) => {
  const email = req.query.email
  const displayName = req.query.displayName
  try {
    const stories = await Story.find({displayName:displayName})
    // const user = await User.findOne({email:email}).populate('stories')
    console.log(chalk.yellow(displayName))


    res.status(200).json(stories)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message : 'get story failed.....'
    })
  }
}

exports.getStory = async (req,res) => {
  console.log(req.query.storyId)
  console.log('getStory')
}