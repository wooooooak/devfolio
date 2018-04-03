import { createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import ReduxThunk from "redux-thunk"

// export default store
export default function configureStore (reducer, initState={}) {
  
  return createStore(
    reducer,
    initState,
    applyMiddleware(logger, ReduxThunk)
  )
} 