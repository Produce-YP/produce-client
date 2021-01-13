import React, { Component } from 'react'
import './maps.css'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import Geocode from 'react-geocode'

const mapStyles = {
  width: '100%',
  height: '100%'
}

Geocode.fromAddress('7009 Sunset Blvd, Hollywood, CA 90028').then(
  response => {
    const { lat, lng } = response.results[0].geometry.location
    console.log(lat, lng)
  },
  error => {
    console.error(error)
  }
)

// const myLatLng = { lat: 34.0522, lng: -118.2437 }

export class Maps extends Component {
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
            position={{ lat: 34.0195, lng: -118.4912 }}
          />
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDpcyCX3CmMaBK8DypyIAOi0fJh4dIEwVI'
})(Maps)
