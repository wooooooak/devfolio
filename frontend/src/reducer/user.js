import actions from '../action/index'
const  { DO_LOGIN, DO_LOGIN2, DO_LOGOUT } = actions.user

const initUserState = {
  isLogin : false,
  email : null,
  name : null,
  picture: null,
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
        displayName : action.payload.displayName,
        picture : action.payload.picture,
        space : action.payload.space,
        language : action.payload.language,

      }
    case DO_LOGIN2:
      return {
        ...state,
        displayName: action.payload.displayName,
        space: action.payload.space,
        language: action.payload.language
      }
    case DO_LOGOUT:
      return {
        
      }
    default:
      return state
  }
}

export default user