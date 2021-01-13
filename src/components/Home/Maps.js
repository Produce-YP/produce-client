import React, { Component } from 'react'
import './maps.css'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import Geocode from 'react-geocode'
const REACT_APP_GOOGLE_KEY = process.env.REACT_APP_GOOGLE_KEY
console.log('!!!', process.env)

const mapStyles = {
  width: '100%',
  height: '100%'
}

export class Maps extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lat: 0,
      lng: 0
    }
  }

  componentDidMount () {
    const { address } = this.props
    Geocode.setApiKey(REACT_APP_GOOGLE_KEY)
    Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location
        this.setState({ lat, lng })
        console.log('geocoded', lat, lng)
      },
      error => {
        console.error(error)
      }
    )
  }

  render () {
    return (
      <div className="maps">
        <Map
          google={this.props.google}
          zoom={10}
          style={mapStyles}
          initialCenter={
            {
              lat: 34.0522,
              lng: -118.2437
            }
          }
        >
          <Marker
            name={'Santa Monica'}
            position={{ lat: this.state.lat, lng: this.state.lng }}
          />
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: REACT_APP_GOOGLE_KEY
})(Maps)
