
const LOAD_CITIES = "LOAD_CITIES"

const CITIES = []

export default function cities( state = CITIES, action ) {
  switch (action.type) {
    case LOAD_CITIES:
      return [action.payload]
  default: 
    return state
  }
}