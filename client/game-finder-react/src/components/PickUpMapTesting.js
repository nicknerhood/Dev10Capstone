import {GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PickupForm from './AddPickUp';
import Game from './PickUp';
import PickupList from './PickUpList';
import PickUp from './PickUp';

const PickUpMapTesting = (pickup) => {

    const [pickups, setPickups] = useState([]);

    const [games, setGames] = useState([]);

    const [users, setUsers] = useState([]);

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
      fetch('http://localhost:8080/game')
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        }
        return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
      })
      .then(data => {
        setGames(data);
        
      })
      .catch(err => history.push('/error', {errorMessage: err}));
    },[])


    useEffect(() => {
      fetch('http://localhost:8080/user')
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        }
        return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
      })
      .then(data => {
        setUsers(data);
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

      //alert("Latitude: " + evt.latLng.lat() + " \nLongitude: " + evt.latLng.lng());
      const markedLocation = {latitude: evt.latLng.lat(), longitude: evt.latLng.lng()};
      //console.log(markedLocation);
      var answer = window.confirm("Would you like to add this location?");
      if(!answer){
        return null;
      }
      history.push('/location', {latitude: markedLocation.latitude, longitude: markedLocation.longitude});
    }


    const filteredPickups = pickups.filter(pickup => pickup.pickUpId == selected.name);
    const filteredGames = games.filter(game => game.gameId == pickup.gameId)
    const filteredUsers = pickups.filter(pickup => pickup.pickUpId == selected.name)

    const handleDeleteLocation = (evt) => {
      
    }


  return (
    <div>
      <h2>Locations (Click on Map to add a location)</h2>
      {/* <button type ="button" className='btn btn-primary mb-3' onClick={handleAddLocation}>Add Location</button> */}
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
                      
                      <>
                     {/* {filteredPickups.map(pickup => */}
                      <InfoWindow
                      position={selected.location}
                      clickable={true}
                      onCloseClick={() => setSelected({})}
                      >
                      
                       
                       
                       
                        <>
                        {filteredPickups.map(pickup => <PickUp key={pickup.id} pickup={pickup} />)} {selected.name}
                       
                      
                        </>
                        
                        
                        
                        
                        
                      </InfoWindow>
                      {/* )} */}
                      </>
                      
                      
                      )}
                    
                    
                  
                  
              </GoogleMap>
      </LoadScript>
    <br></br>
    </div>
  )
}

export default PickUpMapTesting;