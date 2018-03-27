// action type(명령어)
const DO_LOGIN = 'DO_LOGIN'
const DO_LOGIN2 = 'DO_LOGIN2'
const DO_LOGOUT = 'DO_LOGOUT'


// action creators(액션 메서드)
function do_login (email, displayName, picture, space, language) {
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
  payload: {

  }
}

}
export {
  DO_LOGIN,
  do_login,
  DO_LOGIN2,
  do_login2,
  DO_LOGOUT,
  do_logout
}