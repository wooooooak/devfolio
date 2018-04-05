import actions from '../action/index'
import { handleActions } from "redux-actions"
const  { DO_LOGIN, COMMON_REGISTER, DO_LOGOUT, CHANGE_PROFILE, LOCAL_REGISTER } = actions.user

const initUserState = {
  isLogin : false,
  email : null,
  name : null,
  picture: null,
  displayName : null,
  space : null,
  language : null,
  password : null
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
      ...state,
      isLogin: action.payload.isLogin,
      email : action.payload.email,
      displayName : action.payload.displayName,
      picture : action.payload.picture,
      space : action.payload.space,
      language : action.payload.language,
      social : action.payload.social
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
    return {
      ...state,
      displayName : action.payload.displayName,
      space: action.payload.space,
      language: action.payload.language
    }
  },
  [DO_LOGOUT] : (state, action) => {
    return {

    }
  }
}, initUserState)



// const user = (state = initUserState, action) => {
//   switch (action.type) {
//     case DO_LOGIN:
//       return {
//         ...state,
//         isLogin: action.payload.isLogin,
//         email : action.payload.email,
//         displayName : action.payload.displayName,
//         picture : action.payload.picture,
//         space : action.payload.space,
//         language : action.payload.language,

//       }
//     case DO_LOGIN2:
//       return {
//         ...state,
//         displayName: action.payload.displayName,
//         space: action.payload.space,
//         language: action.payload.language
//       }
//     case CHANGE_PROFILE:
//       return {
//         ...state,
//         space: action.payload.space,
//         language: action.payload.language
//       }
//     case DO_LOGOUT:
//       return {
        
//       }
//     default:
//       return state
//   }
// }

// export default user