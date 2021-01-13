import React, { Component } from 'react'
import './maps.css'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import Geocode from 'react-geocode'

const mapStyles = {
  width: '100%',
  height: '100%'
}

export class Maps extends Component {
  render () {
    const { address } = this.props
    console.log('this is address', address)
    Geocode.setApiKey('AIzaSyDpcyCX3CmMaBK8DypyIAOi0fJh4dIEwVI')
    Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location
        console.log('geocoded', lat, lng)
      },
      error => {
        console.error(error)
      }
    )
    console.log('!!!', address)
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
            position={{ lat: 34.0982287, lng: -118.3416747 }}
          />
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDpcyCX3CmMaBK8DypyIAOi0fJh4dIEwVI'
})(Maps)
