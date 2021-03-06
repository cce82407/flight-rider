import axios from "axios"
const LOAD_USERS = "LOAD_USERS"

function loadUsers(users) {
  return {
    type: LOAD_USERS,
    payload: users
  }
}

export const loadUsersDispatch = () => {
  return async (dispatch) => {
    return await axios
      .get("/api/users")
      .then((res) => {
        dispatch(loadUsers(res.data))
      })
      .catch((e)=> console.log(e))
  }
}