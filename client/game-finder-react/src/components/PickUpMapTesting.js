import {GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PickUp from './PickUp';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LocationForm from './LocationForm';

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
        height: "85vh",
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

    const [show, setShow] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let markedLocation = {
      latitude: 0,
      longitude: 0
    }

    const clickMethod = (evt) => {
      markedLocation = {latitude: evt.latLng.lat(), longitude: evt.latLng.lng()};
      // console.log(markedLocation);
      // setShow(true);
      history.push('/location', {latitude: markedLocation.latitude, longitude: markedLocation.longitude});
    }


    const filteredPickups = pickups.filter(pickup => pickup.locationId == selected.name);
    // const filteredGames = games.filter(game => game.gameId == pickup.gameId)
    // const filteredUsers = pickups.filter(pickup => pickup.pickUpId == selected.name)

    console.log(filteredPickups);

    


  return (
    <div className='App'>
      <LoadScript googleMapsApiKey='AIzaSyB0CymM4J0zG7roy04odflwRmwvDz5MOfg'>
        <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter} onClick={clickMethod}>
          {markerLocations.map(item => 
            <Marker label={`${item.name}`} key={item.name} position={item.location} onClick={() => onSelect(item)}/>
          )}
          {
            selected.location && (
              <>
                {/* {filteredPickups.map(pickup => */}
                <InfoWindow position={selected.location} clickable={true} onCloseClick={() => setSelected({})}>
                  <>
                    {filteredPickups.map(pickup => <PickUp  pickup={pickup} />)} 
                  </>
                </InfoWindow>
                {/* )} */}
              </>
            )
          }
        </GoogleMap>
      </LoadScript>
      <br></br>
      {/* <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Location</Modal.Title>
        </Modal.Header>
        <Modal.Body><LocationForm latitude={markedLocation.latitude} longitude={markedLocation.longitude}/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  )
}

export default PickUpMapTesting;