const chalk = require('chalk')
const jwt = require('jsonwebtoken')
const User = require('db/model/user')
const Story = require('db/model/story')

exports.getUserData = async (req,res) => {
  try {
    const displayName = req.query.displayName
    const user = await User.findOne({displayName:displayName}).populate('stories')
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

exports.updateData = async (req,res) => {
  console.log('update')
  const email = req.decoded.email
  try {
    const updatedUser = await User.update({email: email}, {$set : req.body})
    console.dir(updatedUser)
    res.status(200).json(updatedUser)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

exports.leaveDevfolio = async (req,res) => {
  console.log('leave')
  const email = req.decoded.email
  try {
    const result = await User.remove({email: email})
    console.log(result)
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

exports.findByTags = async (req,res) => {
  const tags =  req.body.tags
  let selectedUser = {}
  let users = await User.find()
  users.forEach(user => {
    for (let i=0; i < tags.length; i++){
      if(user.space){
        if (user.space[tags[i].text]) {
          if (selectedUser[user.email]) {
            selectedUser[user.email] = {user, count: ++selectedUser[user.email].count}
          } else {
            selectedUser[user.email] = {user, count:1}
          }
        }
      }
      if(user.language){
        if (user.language[tags[i].text]) {
          if (selectedUser[user.email]) {
            selectedUser[user.email] = {user, count: ++selectedUser[user.email].count}
          } else {
            selectedUser[user.email] = {user, count:1}
          }
        }
      }
    }
  })
  
  const arr = Object.keys(selectedUser).map((el,i)=>{
    return ({count : selectedUser[el].count, user: selectedUser[el].user})
  })
  arr.sort((a,b)=>{return b.count - a.count})
  console.log(arr);
  res.status(200).json({
    users : arr
  })
}

exports.addfollow = async (req,res) => {
  const followedEmail = req.body.followedEmail
  const userEmail = req.decoded.email
  console.log(followedEmail, userEmail);
  try {
    const followedUser = await User.findOne({email : followedEmail})
    const user = await User.findOne({email : userEmail})
    console.log(user);
    //중복된 팔로잉 방지
    //서버에서도 막긴 하지만 클라이언트에서부터 막자
    user.follower.forEach(followId => {
      // console.log("팔로우 하는 사람이 가진 것"+followId.toString());
      // console.log("당하는 사람의 아이디 "+followedUser._id.toString());
      if( followId.toString() == followedUser._id.toString()) {
        res.status(500).json({
          err  : '중복된 팔로우'
        })
        return
      }
    })
    const followedUserId = followedUser._id
    user.follower.push(followedUserId)
    user.save()
    // user.save()
    res.status(200).json({
      messgage : "follow ok",
      user :  user,

    })
  } catch (error) {
    res.status(500).json({
      message : "follow faild",
      error  : error
    })
  }
}

exports.followedUsers = async (req,res) => {
  const { idArr } = req.body
  let dataArr = []
  try {
    let users = await User.find({_id : { $in : idArr}}).populate('stories')
    // console.log(users)
    users.forEach(users => {
      users.stories.forEach(story => {
        if(story.createdAt){
          console.log('createAt 있음')
          // dataArr.push({storyId : story._id, createdAt : story.createdAt})
          dataArr.push(story._id)
        }
      })
    })
    console.log(dataArr)
    const stories = await Story.find({_id : { $in : dataArr}}).sort({createdAt : -1}).limit(10).populate('authorObject')
    console.log(stories)
    res.status(200).json({
      users : users,
      stories : stories
    })
    
  } catch (error) {
    res.status(500).json(error)
  }

}