const { combineReducers } = require("redux");
import cities from "./cityReducer"
import users from "./userReducer"

const rootReducer = combineReducers({
  cities,
  users,
})

export default rootReducer;
