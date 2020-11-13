import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from "react"
import { connect } from "react-redux"

import { loadCitiesDispatch, loadUsersDispatch } from "./actions"

export class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedPlace: {},
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }

    this.displayMarkers = this.displayMarkers.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }
  
  async componentDidMount() {
        await this.props.dispatchLoadUsers()
        await this.props.dispatchLoadCities()
      
      }


  displayMarkers () {
    return this.props.cities.map((city, index) => {
      return <Marker key={index} id={index} position={{
       lat: city.latitude,
       lng: city.longitude
     }} name= {city.name}
     onClick={this.onMarkerClick} 
    />
    })
  }


  onMarkerClick (props, marker, e){
    console.log(props)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

    onMapClicked (props) {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };

  render() {
    console.log(this.props.cities)
    return (
        <Map
          google={this.props.google}
          zoom={8}
          // style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        >
          {this.displayMarkers()}

          <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>

        </Map>
    );
  }
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


export default connect(mapStateToProps, mapDispatchToProps) (GoogleApiWrapper({
  apiKey: ("AIzaSyDTN10yfIaG-UMs5wJ5pQRnrq8YjW58d3w")
})(App))



// import React, { Component } from "react"
// import { connect } from "react-redux"

// import { loadCitiesDispatch, loadUsersDispatch } from "./actions"

// class App extends Component {
//   async componentDidMount() {
//     await this.props.dispatchLoadUsers()
//     await this.props.dispatchLoadCities()
  
//   }
//   render(){
//     return (

//       <div className = "cityList">
//         <div>{this.props.cities.map((city)=> {
//         return (
//         <li key = {city.id}>{city.cityName}</li>)})}
//         </div>
        
//         </div>
//     )}
//   }
    

// const mapStateToProps  = (state) => {
//   return {
//     cities: state.cities,
//     users: state.users
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     dispatchLoadUsers: () => dispatch(loadUsersDispatch()),
//     dispatchLoadCities: () => dispatch(loadCitiesDispatch())
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App)