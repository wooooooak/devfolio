const User = require('db/model/user')

exports.getLanguageChart = async (req, res) => {
  const langArr = {}
  let users = await User.find()
  users.forEach(user => {
    if(user.language){
      for(let language of Object.keys(user.language)){
        if (user.language[language]) {
          if (!langArr[language]) {
            langArr[language] = 1
          }else {
            langArr[language] = parseInt(langArr[language]) + 1
          }
        }
      }
    }
  })  
  //가장 많은 순서대로 정리된 배열 반환
  const sortedLangArr = sortObject(langArr)
  res.json(sortedLangArr)
}

const sortObject = (obj) => {
  var arr = [];
  for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
          arr.push({
              'key': prop,
              'value': obj[prop]
          })
      }
  }
  arr.sort(function(a, b) { return b.value - a.value})
  return arr // returns array
}
