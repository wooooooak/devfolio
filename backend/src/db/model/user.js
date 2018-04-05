const mongoose = require('mongoose')
const config = require('config.js')
const crypto =  require('crypto')
const { Schema } = mongoose

const User = new Schema({
  displayName: String,
  email: String,
  picture: String,
  space:{},
  language:{},
  createdAt: {
    type: Date,
    default: Date.now
  },
  social : Boolean,
  password : String,
  stories:[{type: mongoose.Schema.Types.ObjectId, ref: "Story"}],
  follower: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
})

// create new User document
User.statics.create = function(email,displayName,space,language,picture,social,password) {
  console.log(password);
  if(!social && !password){
    console.log('로컬유저 가입에 비밀번호가 없습니다.')
    new Error("로컬유저 가입에 비밀번호가 없습니다.")
  }
  const encrypted = crypto.createHmac('sha1', config.secret)
  .update(password)
  .digest('base64')

  const user = new this({
      email,
      displayName,
      space,
      language,
      picture,
      follower:[],
      social,
      password : encrypted
  })

  // return the Promise
  return user.save()
}

// find one user by using displayName
User.statics.findOneByEmail = function(email) {
  return this.findOne({
    email
  }).exec()
}

// verify the password of the User documment
User.methods.verify = function(password) {
  const encrypted = crypto.createHmac('sha1', config.secret)
                    .update(password)
                    .digest('base64')
  console.log(this.password === encrypted)

  return this.password === encrypted
}

module.exports = mongoose.model('User', User)