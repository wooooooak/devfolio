import actions from '../action/index'
const  { DO_LOGIN, DO_LOGIN2 } = actions.user

const initUserState = {
  isLogin : false,
  email : null,
  name : null,
  displayName : null,
  space : null,
  language : null
}

const user = (state = initUserState, action) => {
  switch (action.type) {
    case DO_LOGIN:
      return {
        ...state,
        isLogin: action.payload.isLogin,
        email : action.payload.email,
        name : action.payload.name
      }
    case DO_LOGIN2:
      return {
        ...state,
        displayName: action.payload.displayName,
        space: action.payload.space,
        language: action.payload.language
      } 
    default:
      return state
  }
}

export default user