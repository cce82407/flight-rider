import axios from "axios"
const LOAD_CITIES = "LOAD_CITIES"

function loadCities(cities) {
  return {
    type: LOAD_CITIES,
    payload: cities
  }
}

export const loadCitiesDispatch = () => {
  return async (dispatch) => {
    return await axios
      .get("/api/cities")
      .then((res) => {
        dispatch(loadCities(res.data))
      })
      .catch((e)=> console.log(e))
  }
}