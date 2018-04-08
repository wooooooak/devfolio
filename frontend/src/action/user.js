import { updateUserData } from 'lib/user'
import axios from 'axios'
import config from "jsconfig.json"
// action type(명령어)
const DO_LOGIN = 'DO_LOGIN'
const LOCAL_LOGIN = 'LOCAL_LOGIN'
const COMMON_REGISTER = 'COMMON_REGISTER'
const DO_LOGOUT = 'DO_LOGOUT'
const CHANGE_PROFILE = 'CHANGE_PROFILE'
const LOCAL_REGISTER = 'LOCAL_REGISTER'
const LOGIN_ERROR = 'LOGIN_ERROR'
const ADD_FOLLOWER = 'ADD_FOLLOWER'

//액션생성자
const change_profile = (displayName,space,language) => {
  return dispatch => {
    try {
      axios({
        method : "PUT",
        url : config.serverURL+"/user/getUserData",
        data : {"displayName" : displayName,space, language},
        headers: {'x-access-token': localStorage.devfolio_token}
      }).then(
        response => {
          dispatch({
            type : CHANGE_PROFILE,
            payload : {
              displayName : displayName,
              space,
              language
            }
          })
        },
        err => {
          console.log(err)
        }
      )
      
    } catch (error) {
      console.log(error)
    }
  }
}

const add_follower = (followedEmail) => dispatch => {
  return axios({
    method : 'POST',
    url : config.serverURL + '/user/follow',
    data : {
      followedEmail : followedEmail
    },
    headers: {'x-access-token':localStorage.devfolio_token}
  }).then(
    response => {
      console.log(response)
      dispatch({
        type : ADD_FOLLOWER,
        payload : {
          follower : response.data.user.follower
        }
      })
    }
  )
}

const local_login = (email, passwd) => dispatch =>  {
  //여기서 만든 promise를 return 해줘야, 나중에 컴포넌트에서 호출할때 async를 사용하든 .then을사용할 수 있다
    return axios({
            method : 'POST',
            url : config.serverURL+"/auth/localLogin",
            data : {
              email : email,
              password : passwd
            }
          }).then(
            response => {
              console.log(response);
              localStorage.devfolio_token = response.data.token
              localStorage.email = response.data.email
              localStorage.displayName = response.data.displayName
              dispatch({
                type : DO_LOGIN,
                payload : response.data
              })
            }
          ).catch(
            err => {
              console.log(err)
              dispatch({
                type : LOGIN_ERROR,
                payload : {}
              })
            }
          )
}

const local_register = (email,password) => {
  return {
    type : LOCAL_REGISTER,
    payload: {
      email : email,
      password : password,
      social : false
    }
  }
}

// action creators(액션 메서드)
//이름을 그냥 saveUserData로 해놓고 업데이트할 때 써도 될듯 
const do_login = (email, displayName ,picture, social, space, language) => {
  return {
    type: DO_LOGIN,
    payload: {
      isLogin: true,
      email : email,
      displayName : displayName,
      picture: picture ? picture : null,
      space : space ? space : null,
      language : language,
      social : social
    }
  }
}
function common_register (displayName, space, language) {
  return {
    type: COMMON_REGISTER,
    payload: {
      displayName: displayName,
      space : space,
      language: language
    }
  }
}
const do_logout = () => {
  return {
    type: DO_LOGOUT,
    payload: {}
  }
}

export {
  DO_LOGIN,
  do_login,
  COMMON_REGISTER,
  common_register,
  DO_LOGOUT,
  do_logout,
  CHANGE_PROFILE,
  change_profile,
  LOCAL_REGISTER,
  local_register,
  local_login,
  LOCAL_LOGIN,
  LOGIN_ERROR,
  ADD_FOLLOWER,
  add_follower

}