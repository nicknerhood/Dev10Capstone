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

    const markerLocations = locations.map(value => ({
      name: value.locationId,
      location: {
        lat: value.latitude,
        lng: value.longitude
      }
    }))

    const clickMethod = (evt) => {
      // console.log(evt.latLng.lat());
      // console.log(evt.latLng.lng());

      alert("Latitude: " + evt.latLng.lat() + " \nLongitude: " + evt.latLng.lng());
    }

    function handleAddLocation(){
      return history.push('/location/add');
    }

  return (
    <div>
      <h2>Locations</h2>
      <button type ="button" className='btn btn-primary mb-3' onClick={handleAddLocation}>Add Location</button>
      <LoadScript googleMapsApiKey='AIzaSyB0CymM4J0zG7roy04odflwRmwvDz5MOfg'>
              <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter} onClick={clickMethod}>
                  {markerLocations.map(item => 
                    <Marker 
                      key={item.name}
                      position={item.location}
                      onClick={() => onSelect(item)}
                      />
                  )}
                  {
                    selected.location && (
                      <InfoWindow
                      position={selected.location}
                      clickable={true}
                      onCloseClick={() => setSelected({})}>
                        <p>{selected.name}</p>
                      </InfoWindow>
                    )
                  }
                  
              </GoogleMap>
      </LoadScript>
    <br></br>
    </div>
  )
}

export default PickUpMapTesting;