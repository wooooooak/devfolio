import actions from '../action/index'
import { handleActions } from "redux-actions"
const  { DO_LOGIN, DO_LOGIN2, DO_LOGOUT, CHANGE_PROFILE } = actions.user

const initUserState = {
  isLogin : false,
  email : null,
  name : null,
  picture: null,
  displayName : null,
  space : null,
  language : null
}


//두번째 인자는 switch문의 default로 넘겨주는 디폴드 값인 듯.
export default handleActions({
  [DO_LOGIN] : (state = initUserState, action) => {
    return {
      ...state,
      isLogin: action.payload.isLogin,
      email : action.payload.email,
      displayName : action.payload.displayName,
      picture : action.payload.picture,
      space : action.payload.space,
      language : action.payload.language,
    }
  },
  [DO_LOGIN2] : (state, action) => {
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