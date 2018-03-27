const chalk = require('chalk')
const User = require('db/model/user')
const Story = require('db/model/story')

exports.addStory = async (req,res) => {
  try {
    const email = req.decoded.email
    let user = await User.findOneByEmail(email)
    let story = await Story.create(req.body.storyInfo, req.decoded.email)
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