import {GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Game from './PickUp';

const PickUpMapTesting = () => {

    const [pickups, setPickups] = useState([]);

    const [allPickups, setAllPickups] = useState([]);

    const [selected, setSelected] = useState([]);

    const [locations, setLocations] = useState([]);

    const history = useHistory();

    useEffect(() => {
      fetch('http://localhost:8080/pickup')
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        }
        return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
      })
      .then(data => {
        setPickups(data);
        setAllPickups(data);
        
      })
      .catch(err => history.push('/error', {errorMessage: err}));
    },[])

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
                {locations.map(location => 
                  <Marker 
                    key={location.locationId}
                    position={{lat: location.latitude, lng: location.longitude}}
                    />
                )}
            </GoogleMap>
    </LoadScript>
  )
}

export default PickUpMapTesting;