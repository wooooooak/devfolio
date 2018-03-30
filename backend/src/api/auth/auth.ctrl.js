const chalk = require('chalk')
const jwt = require('jsonwebtoken')
const User = require('db/model/user')


exports.register = async (req, res) => {
  const { email, username, displayName, space, language, picture } = req.body
  console.log('displayName is ', displayName)
  let newUser = null
  console.log('register() ------------------------------')
  console.log(req.body)
  const create = (user) => {
    if(user) {
      throw new Error('username exists')
    } else {
      return User.create(email, username, displayName, space, language, picture)
    }
  }
  
  // run when there is an error (username exists)
  const onError = (error) => {
    throw new Error('register error')
  }
  
  try {
    if (!email){
      res.json({
        registerSuccess: false,
        message: "email값이 없습니다"
      })
    }
    const user = await User.findOneByEmail(email)
    await create(user)
      res.json({
        registerSuccess: true,
        message: "등록 성공",
        displayName: displayName
      })
    } catch (error) {
        res.json({
          registerSuccess: false,
          message: "아마도 email이 중복되거나 아이디가 존재합니다"
        })
    onError(error)
  }
}

exports.login = async (req, res) => {
  console.log('login 라우터 실행')
  const { email, username } = req.body
  const secret = req.app.get('jwt-secret')
  console.log(req.body.email)

  // check the user info & generate the jwt
  const responseToken = (user) => {
    const p = new Promise((resolve, reject) => {
    jwt.sign(
      {
          _id: user._id,
          email: user.email,
          displayName: user.displayName

      }, 
      secret, 
      {
          expiresIn: '7d',
          issuer: 'yongjun',
          subject: 'userInfo'
      }, (err, token) => {
          if (err) reject(err)
          resolve(token) 
      })
    })
    return p
  }

  // respond the token 
  const respond = (token,user) => {
    console.log(chalk.white(user));
    res.json({
        message: 'logged in successfully',
        token: token,
        isUser : true,
        displayName: user.displayName,
        email: user.email,
        picture: user.picture,
        space: user.space,
        language: user.language,
        stories: user.stories
    })
  }

  try {
    let user = await User.findOneByEmail(email)
    if(!user) {
      res.json({
        message: 'devfolio의 회원이 아닙니다. 등록페이지로 넘어갑니다',
        isUser : false,
        token: null
      })
      return
      // user = await User.create(email, username)
    }
    const p = await responseToken(user)
    // console.log('response 직전에 에러')
    await respond(p,user)
  } catch (error) {
      res.status(403).json({
        message: error.message
    })
  }
}

