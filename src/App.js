import React, { Component } from "react"
import { connect } from "react-redux"
import City from '../server/models/City'
import { loadCitiesDispatch, loadUsersDispatch } from "./actions"

class App extends Component {
  async componentDidMount() {
    await this.props.dispatchLoadUsers()
    await this.props.dispatchLoadCities()
  
  }
  render(){
    return (
      <div className = "cityList">
        <div>{this.props.cities.map((city)=> {
        return (
        <li key = "myCity">{city.cityName}</li>)})}
        </div>
        </div>
    )}
  }


const mapStateToProps  = (state) => {
  return {
    cities: state.cities,
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchLoadUsers: () => dispatch(loadUsersDispatch()),
    dispatchLoadCities: () => dispatch(loadCitiesDispatch())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)