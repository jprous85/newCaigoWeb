import React, {useRef} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';
import { CORPORATIVE_ROSE } from "../../utils/Constants";

const ReactMap = (props: any) => {
  const classes = useStyles();
  const {values, setValues, options = false} = props;
  const googleMap = useRef(null);
  const apiKey:any = process.env.GOOGLE_PLACES_API_KEY;

  const handleChangeCoordinates = (coords: any) => {
    const {center} = coords;
    const lat = center.lat;
    const lng = center.lng;

    setValues({
      ...values, coords: {
        lat: lat, lng: lng
      }
    })
  }

  const OPTIONS = (options)? {
    scrollwheel: false,
    fullscreenControl: false,
    disableDoubleClickZoom: false,
    draggable: false,
    keyboardShortcuts: false,
    streetViewControl: false,
    mapTypeControl: false,
    panControl: false,
    disableDefaultUI: false,
    scaleControl: false,
    zoomControl: false,
    clickableIcons: false,
    draggableCursor: "pointer"
  }: {};

  return (
    <div style={{ height: '85%', width: '100%' }}>
      <GoogleMapReact
        options={OPTIONS}
        bootstrapURLKeys={{ key: apiKey}}
        defaultCenter={values.coords}
        center={values.coords}
        zoom={14}
        yesIWantToUseGoogleMapApiInternals
        onChange={(e: any)=> {
          handleChangeCoordinates(e);
        }}
      >
        <div style={{
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          top: -12
        }}
        >
          <RoomIcon
            style={{
              color: CORPORATIVE_ROSE,
              fontSize: 40
            }}
          />
        </div>
      </GoogleMapReact>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({})
);

export default ReactMap;