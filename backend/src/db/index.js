const mongoose = require('mongoose')
const config = require('../config.js')
const chalk = require('chalk')

module.exports = (function() {
  return{
    async connect () {
      try {
        // await mongoose.connect(config.mongodbUri)
        // 왜 이건 안되지???
        await mongoose.connect('mongodb://127.0.0.1:27017/devfolio')
        const text = chalk.blue('connect successfully')
        console.log(text)
      } catch (error) {
        console.log(error)
      }
    }  
  }
  
})()