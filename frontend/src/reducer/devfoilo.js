import Actions from '../action/index'
const { DO_LOGIN } = Actions.devfolio

const initState = {

}

const devfolio = (state = initState, action) => {
  switch (action.key) {
    case DO_LOGIN:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default devfolio