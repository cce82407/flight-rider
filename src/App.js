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
  }
  
  async componentDidMount() {
        await this.props.dispatchLoadCities()    
      }


  displayMarkers () {
    return this.props.cities.map((city, index) => {
      return <Marker key={index} id={index} position={{
       lat: city.latitude,
       lng: city.longitude
     }} name= {city.cityName}
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





    // handleInputChange (ev) {
    //   const { name, value } = ev.target;
    //   this.setState({
    //     [name]: value,
    //   });
    // }

  render() {
    console.log(this.props.cities)
    const style = {
      width: '100%',
      height: '75%',
      borderColor: "black",
      borderStyle: "solid",
      borderWidth: "2px",
    }
    const boxStyle = {
      margin:"10px",
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
      alignItems:"row",
      justifyContent: "center",
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

   
    return (
      <div>
        <div style = {textContainer}>
          <div style = {span}>Welcome to Flight Rider</div>
          <div style = {text}>Please enter your information in the boxes below to find a ride from the airport to your desired city.
          </div>
        
          <form style = {form} onSubmit={() => {console.log(this.state.arrivalState)}}>
            <label><input
            style = {boxStyle} 
            type = "text" 
            name = "userFirstName" 
            placeholder = "First Name" 
            value = {this.state.userFirstName}
            onChange = {this.handleInputChange}
            /></label>
            <input
            style = {boxStyle} 
            type = "text" 
            name = "userLastName" 
            placeholder = "Last Name" 
            value = {this.state.userLastName}
            onChange = {this.handleInputChange}
            />
            <input 
            style = {boxStyle}
            type = "text" 
            name = "arrivalDate" 
            placeholder = "Arrival Date" 
            value = {this.state.arrivalDate}
            onChange = {this.handleInputChange}
            />
            <input 
            style = {boxStyle}
            type = "text" 
            name = "arrivalTime" 
            placeholder = "Arrival Time" 
            value = {this.state.arrivalTime}
            onChange = {this.handleInputChange}
            />
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
            <input type = "submit" style = {submit} value = "Submit"/>
          </form>

          <div class = "map">
            <Map
            google={this.props.google}
            zoom={8}
            onClick={this.onMapClicked}
            initialCenter={{ lat: 38.9072, lng: -77.0369}}
            style = {style}  
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
    dispatchLoadCities: () => dispatch(loadCitiesDispatch())
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (GoogleApiWrapper({
  apiKey: ("AIzaSyDTN10yfIaG-UMs5wJ5pQRnrq8YjW58d3w")
})(App))
