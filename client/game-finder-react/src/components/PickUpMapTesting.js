import {GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PickupForm from './AddPickUp';
import Game from './PickUp';
import PickupList from './PickUpList';

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

    //want to transform locations into a list formatted like this 
    // const markerLocations = [
    //   {
    //     name: "test",
    //     location: {
    //       lat: 1,
    //       lng: 1
    //     }
    //   }
    // ]

  return (
    <div>
      <h2>Locations</h2>
      <LoadScript googleMapsApiKey='AIzaSyB0CymM4J0zG7roy04odflwRmwvDz5MOfg'>
              <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
                  {locations.map(item => 
                    <Marker 
                      key={item.locationId}
                      position={{lat: item.latitude, lng: item.longitude}}
                      />
                  )}
                  
              </GoogleMap>
      </LoadScript>
    <br></br>
    <PickupList />
    </div>
  )
}

export default PickUpMapTesting;