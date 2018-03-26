// action type(명령어)
const DO_LOGIN = 'DO_LOGIN'
const DO_LOGIN2 = 'DO_LOGIN2'


// action creators(액션 메서드)
function do_login (email, name) {
  return {
    type: DO_LOGIN,
    payload: {
      isLogin: true,
      email : email,
      name: name
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
export {
  DO_LOGIN,
  do_login,
  DO_LOGIN2,
  do_login2
}