const mongoose = require('mongoose')
const config = require('../config.js')
const chalk = require('chalk')

module.exports = (function() {
  return{
    async connect () {
      try {
        await mongoose.connect(config.mongodbUri)
        const text = chalk.blue('connect successfully')
        console.log(text)
      } catch (error) {
        console.log(error)
      }
    }  
  }
  
})()