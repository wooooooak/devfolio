import { createStore, applyMiddleware } from "redux"
import logger from "redux-logger";

// export default store
export default function configureStore (reducer, initState={}) {
  return createStore(
    reducer,
    initState,
    applyMiddleware(logger)
  )
} 