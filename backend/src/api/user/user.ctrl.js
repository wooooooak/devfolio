const chalk = require('chalk')
const jwt = require('jsonwebtoken')
const User = require('db/model/user')

exports.getUserData = async (req,res) => {
  console.log(req.query);
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
  console.log(req.body)
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

exports.addfollow = async (req,res) => {
  console.log('addfollow')
  const followedEamil = req.body.followedEamil
  const userEmail = req.decoded.email
  try {
    const followedUser = await User.findOne({email : followedEamil})
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
    // user.save()
    res.status(200).json({
      messgage : "follow ok",
      user :  user,

    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message : "follow faild",
      error  : error
    })
  }
}