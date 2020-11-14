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
      userFirstName: "",
      userLastName: "",
      arrivalDate:"",
      arrivalTime:"",
      arrivalCity: "",
      arrivalState: "",
    }

    this.displayMarkers = this.displayMarkers.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }
  
  async componentDidMount() {
        await this.props.dispatchLoadCities()    
      }


  displayMarkers (cityArr) {
    return cityArr.map((city, index) => {
      return <Marker key={index} id={index} position={{
       lat: city.latitude,
       lng: city.longitude
     }} name= {city.markerDisplay}
     driverInfo = {city.driverInfo}
     contact = {city.driverEmail}
     onClick={this.onMarkerClick} 
    />
    })
  }


  onMarkerClick (props, marker, e){
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

    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value,
      });
      console.log(event.target.value)
    }    

    submitHandler (ev) {
      
      // const selectedCities = this.props.cities.filter((city => city.cityState === this.state.arrivalState))
      // console.log(selectedCities)
      // this.displayMarkers(selectedCities)
      // ev.preventDefault()
      // const center = this.props.cities.find(city => city.cityName === this.state.arrivalCity)
      // this.render()
    }

  render() {
    const selectedCities = this.props.cities.filter(city => city.cityState === this.state.arrivalState)
    const center = this.props.cities.find(city => city.cityName === this.state.arrivalCity)
    console.log(center)
    const style = {
      width: '100%',
      height: '75%',
      borderColor: "black",
      borderStyle: "solid",
      borderWidth: "2px",
    }
    const boxStyle = {
      margin:"10px",
      dispaly: "block",
      margin: "auto",
      borderColor: "black",
      borderStyle: "solid",
      borderWidth: "2px",
      padding: "10px",
      borderRadius: "10px",
    }
    const submit = {
      margin:"10px",
      borderColor: "black",
      borderStyle: "solid",
      borderWidth: "2px",
      padding: "10px",
      borderRadius: "10px",
      backgroundColor: "grey"
    }
    const form = {
      dislpay: "flex",
      alignItems:"center",
      position: "relative",
      justifyContent: "center",
      flexFlow: "columnWrap",
      // margin:"auto",
      topMargin: "30px",
      width: "100%",
    }
    const span = {
      fontFamily: "Sacramento",
      fontSize: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "50px",
      padding: "10px",
    }
    const text = {
      fontFamily: "Nanum Gothic",
      fontSize: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "30px"
    }
    const textContainer = {
      backgroundColor: "#eb9788",
      width: "100%"
    }
    const infoStyles = {
      fontSize: "10px",
    }


   
    return (
      <div>
        <div style = {textContainer}>
          <div style = {span}>Welcome to Flight Rider</div>
          <div style = {text}>Please enter your information in the boxes below to find a ride from the airport to your desired city.
          </div>
          <div style = {form}>
          <form onSubmit={() => {this.submitHandler}}>
            {/* <input
            style = {boxStyle} 
            type = "text" 
            name = "userFirstName" 
            placeholder = "First Name" 
            value = {this.state.userFirstName}
            onChange = {this.handleInputChange}
            />
            <input
            style = {boxStyle} 
            type = "text" 
            name = "userLastName" 
            placeholder = "Last Name" 
            value = {this.state.userLastName}
            onChange = {this.handleInputChange}
            /> */}
            <input 
            style = {boxStyle}
            type = "text" 
            name = "arrivalDate" 
            placeholder = "Arrival Date" 
            value = {this.state.arrivalDate}
            onChange = {this.handleInputChange}
            />
            {/* <input 
            style = {boxStyle}
            type = "text" 
            name = "arrivalTime" 
            placeholder = "Arrival Time" 
            value = {this.state.arrivalTime}
            onChange = {this.handleInputChange}
            /> */}
            <input 
            style = {boxStyle}
            type = "text" 
            name = "arrivalCity" 
            placeholder = "Arrival City" 
            value = {this.state.arrivalCity}
            onChange = {this.handleInputChange}
            />
            <input 
            style = {boxStyle}
            type = "text" 
            name = "arrivalState" 
            placeholder = "Arrival State" 
            value = {this.state.arrivalState}
            onChange = {this.handleInputChange}
            />
            {/* <input type = "submit" style = {submit} value = "Submit"/> */}
          </form>
          </div>
          <div class = "map">
            <Map
            google={this.props.google}
            zoom={9}
            onClick={this.onMapClicked}
            center={center ? {lat: center.latitude, lng: center.longitude} : { lat: 38.9072, lng: -77.0369}}
            // center={{ lat: center.latitude, lng: center.longitude}}
            style = {style}  
            >
            {this.displayMarkers(selectedCities)}
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                styles = {infoStyles}>.
                <div>
                  <h3>{this.state.selectedPlace.name}</h3>
                  <p>{this.state.selectedPlace.driverInfo}</p>
                  <p>{this.state.selectedPlace.contact}</p>
                </div>
              </InfoWindow>
            </Map>
          </div>
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
    dispatchLoadCities: (state) => dispatch(loadCitiesDispatch(state))
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (GoogleApiWrapper({
  apiKey: ("AIzaSyDTN10yfIaG-UMs5wJ5pQRnrq8YjW58d3w")
})(App))
