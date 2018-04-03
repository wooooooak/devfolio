import { updateUserData } from 'lib/user'
import axios from 'axios'
import config from "jsconfig.json"
// action type(명령어)
const DO_LOGIN = 'DO_LOGIN'
const DO_LOGIN2 = 'DO_LOGIN2'
const DO_LOGOUT = 'DO_LOGOUT'
const CHANGE_PROFILE = 'CHANGE_PROFILE'

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

// action creators(액션 메서드)
//이름을 그냥 saveUserData로 해놓고 업데이트할 때 써도 될듯 
const do_login = (email, displayName, picture, space, language) => {
  return {
    type: DO_LOGIN,
    payload: {
      isLogin: true,
      email : email,
      displayName: displayName,
      picture: picture ? picture : null,
      space : space ? space : null,
      language : language
    }
  }
}
function do_login2 (displayName, space, language) {
  return {
    type: DO_LOGIN2,
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
  DO_LOGIN2,
  do_login2,
  DO_LOGOUT,
  do_logout,
  CHANGE_PROFILE,
  change_profile

}