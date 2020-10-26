import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY

const ReactMap = (props: any) => {
  return (
    <Map google={props.google}/>
  );
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(ReactMap)