import Actions from '../action/index'
const { REDIRECTHOME_TRUE,REDIRECTHOME_FALSE } = Actions.devfolio

const initState = {
  redirectHome : false
}

const devfolio = (state = initState, action) => {
  switch (action.type) {
    case REDIRECTHOME_TRUE:
      return {
        ...state,
        redirectHome : action.payload.redirectHome
      }
    case REDIRECTHOME_FALSE:
      return {
        ...state,
        redirectHome : action.payload.redirectHome
      }
    default:
      return state
  }
}

export default devfolio