import {GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Game from './PickUp';

const PickUpMapTesting = () => {

    const [pickups, setPickups] = useState([]);

    const [selected, setSelected] = useState([]);

    const [locations, setLocations] = useState([]);

    const history = useHistory();

    useEffect(() => {

      fetch(`http://localhost:8080/location`)
        .then(resp => {
          if(resp.status === 200){
            return resp.json();
          }
          return Promise.reject('Something terrible has gone wrong.');
        })
        .then(data => {
          setLocations(data);
        })
        .catch(err => history.push('/error', {errorMessage: err}));
    }, []);

    const onSelect = item => {
        setSelected(item);
    }

    const mapStyles = {
        height: "90vh",
        width: "100%"
    };
    const defaultCenter = {
        lat: 30.5057586, lng: -97.6169318
    }

  return (
    <LoadScript googleMapsApiKey='AIzaSyB0CymM4J0zG7roy04odflwRmwvDz5MOfg'>
            <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
              {/* {
                locations.map(location => {
                  return (
                    <Marker key={location.locationId} position={lat: item.latitude} onClick={() => onSelect(item)}/>
                  )
                })
              } */}
              {
                selected.location &&
                  (
                    <InfoWindow position={selected.location} clickable={true} onCloseClick={() => setSelected({})} >
                      <p>{selected.name}</p>
                    </InfoWindow>
                  )
              }
            </GoogleMap>
    </LoadScript>
)
}

export default PickUpMapTesting;