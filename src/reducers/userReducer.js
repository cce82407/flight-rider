
const LOAD_USERS = "LOAD_USERS"

const USERS = []

export default function users( state = USERS, action ) {
  switch (action.type) {
    case LOAD_USERS:
      return [...state, ...action.payload]
  default: 
    return state
  }
}