import actions from '../action/index'
import { handleActions } from "redux-actions"
const  { DO_LOGIN, COMMON_REGISTER, AUTO_LOGIN,
   DO_LOGOUT, CHANGE_PROFILE, LOCAL_REGISTER,
    LOGIN_ERROR, ADD_FOLLOWER } = actions.user

const initUserState = {
  isLogin : false,
  email : null,
  name : null,
  picture: null,
  displayName : null,
  space : null,
  language : null,
  password : null,
  follower : [],
  error : false
}


//두번째 인자는 switch문의 default로 넘겨주는 디폴드 값인 듯.
export default handleActions({
  [LOCAL_REGISTER] : (state = initUserState, action) => {
    return {
      ...state,
      email : action.payload.email,
      social : action.payload.social,
      password : action.payload.password
    }
  },
  [DO_LOGIN] : (state = initUserState, action) => {
    return {
      // ...state,
      isLogin: action.payload.isLogin,
      email : action.payload.email,
      displayName : action.payload.displayName,
      picture : action.payload.picture,
      space : action.payload.space,
      error : false,
      language : action.payload.language,
      social : action.payload.social,
      follower : action.payload.follower
    }
  },
  [AUTO_LOGIN] : (state = initUserState, action) =>{
    return {
      isLogin: action.payload.isLogin,
      email : action.payload.email,
      displayName : action.payload.displayName,
      picture : action.payload.picture,
      space : action.payload.space,
      error : false,
      language : action.payload.language,
      social : action.payload.social,
      follower : action.payload.follower
    }
  },
  [COMMON_REGISTER] : (state, action) => {
    return {
      ...state,
      displayName: action.payload.displayName,
      space: action.payload.space,
      language: action.payload.language
    }
  },
  [CHANGE_PROFILE] : (state, action) => {
    localStorage.displayName = action.payload.displayName
    return {
      ...state,
      displayName : action.payload.displayName,
      space: action.payload.space,
      language: action.payload.language
    }
  },
  [ADD_FOLLOWER] : (state, action) => {
    return {
      ...state,
      follower : action.payload.follower
    }
  },
  [DO_LOGOUT] : (state, action) => {
    return {

    }
  },
  [LOGIN_ERROR] : (state, action) => {
    return {
      // ...state,
      error : true
    }
  }
}, initUserState)
