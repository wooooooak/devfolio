const chalk = require('chalk')
const jwt = require('jsonwebtoken')
const User = require('db/model/user')
const crypto =  require('crypto')

exports.register = async (req, res) => {
  let { email, displayName, space, language, picture, social, password } = req.body
  // console.log(req.body);
  // console.log('displayName is ', displayName)
  console.log('register() ------------------------------')
  try {
      if(!picture) {
        picture = "http://220.68.54.53:8082/images/programmer.png"
      }
    if (!email){
      res.json({
        registerSuccess: false,
        message: "email값이 없습니다"
      })
    }
    let user = await User.findOneByEmail(email)
    console.log(user);
    if(!user){
      console.log('before!@!@');
        user = await User.create(email, displayName, space, language, picture, social, password)
        res.json({
          registerSuccess: true,
          message: "등록 성공",
          displayName: displayName
        })
      }
    } catch (error) {
      console.log(error);
        res.json({
          registerSuccess: false,
          message: "아마도 email이 중복되거나 아이디가 존재합니다"
        })
  }
}

exports.registerEmailCheck = async (req,res) => {
  const registerEmail = req.query.email
  console.log(registerEmail)
  try {
    const user = await User.findOne({email : registerEmail})
    console.log(user)
    if(user) {
      res.status(200).json({
        message : "이메일이 이미 존재합니다.",
        isExist : true
      })
    }else {
        res.status(200).json({
          message : "사용가능한 이메일입니다.",
          isExist : false
        })
    }
  } catch (error) {
    res.json(500).json({
      message : error,
      isExist : true
    })
  }
}

exports.localLogin = async (req,res) => {
  console.log('로컬 로그인 실행 : 비밀번호 일치 확인하자')
  const { email, password } = req.body
  console.log(req.body);
  if(!password) {
    console.log('비밀번호 없음')
    res.status(200).json({
      message : '비밀번호가 없어요'
    })
    return
  }
  try {
    let user = await User.findOne({email:email})
    if (user.verify(password)) {
      console.log('비밀번호 일치')
      const p = await responseToken(user,req)
      await respond(p,user,res)
    }
  } catch (error) {
    res.status(403).json({
      message: error.message
  })
  }
  
}

exports.socaiLogin = async (req, res) => {
  console.log('login 라우터 실행')
  const { email, name } = req.body


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
    const p = await responseToken(user,req)
    // console.log('response 직전에 에러')
    await respond(p,user,res)
  } catch (error) {
      res.status(403).json({
        message: error.message
    })
  }
}

  // respond the token 
const respond = (token,user,res) => {
  console.log(chalk.white(user));
  res.json({
      message: 'logged in successfully',
      token: token,
      isUser : true,
      social : user.social,
      displayName: user.displayName,
      email: user.email,
      picture: user.picture,
      space: user.space,
      language: user.language,
      stories: user.stories,
      follower : user.follower
  })
}

// check the user info & generate the jwt
const responseToken = (user,req) => {
  const secret = req.app.get('jwt-secret')
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