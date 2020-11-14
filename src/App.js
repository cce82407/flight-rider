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
      arrivalDate:"",
      arrivalTime:"",
      arrivalCity: "",
      arrivalState: "",
      userName: "",
      userEmail: "",
      providerArrDate:"",
      providerArrTime:"",
      providerArrCity:"",
      providerArrState:"",
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
      // margin: "auto",
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
      margin:"auto",
      topMargin: "30px",
      width: "100%",
    }
    const span = {
      fontFamily: "Sacramento",
      fontSize: "65px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "50px",
      padding: "20px",
    }
    const text = {
      fontFamily: "Nanum Gothic",
      fontSize: "20px",
      display: "flex",
      width: "100%",
      height: "30px",
      padding: "10px",
    }
    const textContainer = {
      backgroundColor: "#eb9788",
      width: "100%",
    }
    const infoStyles = {
      fontSize: "10px",
    }

    const padding = {
      height: "30px",
      width: "100%"
    }
    const img = {
      borderRadius: "10px",
      width: "125px",
      height: "75px",
      margin: "10px",
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    }

   
    return (
      <div>
        <div style = {textContainer}>
          <div style = {span}><img style = {img} src="https://media.istockphoto.com/vectors/airplane-line-path-vector-icon-of-air-plane-flight-route-with-start-vector-id1042534060?k=6&m=1042534060&s=612x612&w=0&h=_RxwCObWp23fGjWIPiLc6AmfLnLFGGWo_zTJ1tG4zeo=" alt="Plane"></img>Welcome to Flight Rider<img style = {img} src="https://www.pngitem.com/pimgs/m/327-3272679_soccermom-logo-family-car-travel-icon-hd-png.png" alt="Car"></img></div>
          
          
            
          <div style = {text}>Enter your information in the boxes below to find a ride from the airport to your desired city.</div>
          
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
            <div class = {padding}></div>
          <div style = {text}> If you would like to provide a ride to someone travelling from the same city, please enter your information in the boxes below and select "Save."
          </div>

          <div style = {form}>
          <form onSubmit={() => {this.submitHandler}}>
            <input
            style = {boxStyle} 
            type = "text" 
            name = "userName" 
            placeholder = "Name" 
            value = {this.state.userName}
            onChange = {this.handleInputChange}
            />
            <input
            style = {boxStyle} 
            type = "email" 
            name = "userEmail" 
            placeholder = "Email" 
            value = {this.state.userEmail}
            onChange = {this.handleInputChange}
            />
            <input 
            style = {boxStyle}
            type = "text" 
            name = "providerArrDate" 
            placeholder = "Arrival Date" 
            value = {this.state.providerArrDate}
            onChange = {this.handleInputChange}
            />
            <input 
            style = {boxStyle}
            type = "text" 
            name = "providerArrTime" 
            placeholder = "Arrival Time" 
            value = {this.state.providerArrTime}
            onChange = {this.handleInputChange}
            />
            <input 
            style = {boxStyle}
            type = "text" 
            name = "providerArrCity" 
            placeholder = "Arrival City" 
            value = {this.state.providerArrCity}
            onChange = {this.handleInputChange}
            />
            <input 
            style = {boxStyle}
            type = "text" 
            name = "providerArrState" 
            placeholder = "Arrival State" 
            value = {this.state.providerArrState}
            onChange = {this.handleInputChange}
            />
            <input type = "submit" style = {submit} value = "Save"/>
          </form>
          </div>
          <div class = "map">
            <Map
            google={this.props.google}
            zoom={7}
            onClick={this.onMapClicked}
            center={center ? {lat: center.latitude, lng: center.longitude} : { lat: 29.7604, lng: -95.3698}}
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
  apiKey: ("")
})(App))
