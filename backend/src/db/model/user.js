const mongoose = require('mongoose')
const { Schema } = mongoose

const User = new Schema({
  displayName: String,
  email: String,
  username: String,
  space:{},
  language:{},
  createdAt: {
    type: Date,
    default: Date.now
  },
})

// create new User document
User.statics.create = function(email,username,displayName,space,language) {
  const user = new this({
      email,
      username,
      displayName,
      space,
      language
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