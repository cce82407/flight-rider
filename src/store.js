import { createStore, applyMiddleware } from "redux"
import { createLogger } from "redux-logger"
import rootReducer from "./reducers"
import thunk from "redux-thunk"

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, createLogger({colapsed: true}))
)

export default store