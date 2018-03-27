const mongoose = require('mongoose')
const { Schema } = mongoose

const Story = new Schema({
  content: String,
  title: {type:String,unique:false},
  startDate: Date,
  endDate: Date,
  sourceLink: String,
  tags:[{}],
  author:{type: String}
})

Story.statics.create = function(storyInfo, author) {
  const { title, content, startDate, endDate, sourceLink, tags } = storyInfo
  const story = new this({
    title : title,
    content, 
    startDate, 
    endDate, 
    sourceLink, 
    tags, 
    author
  })

  return story.save()
}

module.exports = mongoose.model('Story', Story)