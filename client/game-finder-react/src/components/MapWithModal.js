import {GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PickUp from './PickUp';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LocationForm from './LocationForm';
import { ModalBody } from 'react-modal-bootstrap';
import PickupForm from './AddPickUp';
import UserContext from '../UserContext';
import { useContext } from 'react';

const DEFAULT_LOCATION = {latitude: 0, longitude: 0};
const DEFAULT_PICKUP = {locationId: 0};
const DEFAULT_APP_USER = {appUserId: '', username: ''}


const MapWithModal = () => {

  const [appUser, setAppUser] = useState(DEFAULT_APP_USER);


    const [pickups, setPickups] = useState([]);

    const [games, setGames] = useState([]);

    const [users, setUsers] = useState([]);

    const [allPickups, setAllPickups] = useState([]);

    const [selected, setSelected] = useState([]);

    const [locations, setLocations] = useState([]);
    
    const [location, setLocation] = useState(DEFAULT_LOCATION);

    const [pickup, setPickup] = useState(DEFAULT_PICKUP);

    const [errors, setErrors] = useState([]);

    const [markerLocations, setMarkerLocations] = useState([]);

    const history = useHistory();

    const authManager = useContext(UserContext);


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

      fetch(`http://localhost:8080/location`)
        .then(resp => {
          if(resp.status === 200){
            return resp.json();
          }
          return Promise.reject('Something terrible has gone wrong.');
        })
        .then(data => {
          setMarkerLocations(data.map(converter));
        })
        .catch(err => history.push('/error', {errorMessage: err}));

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
    
      fetch(`http://localhost:8080/appuser/${authManager.user.username}`)
        .then(resp => {
          switch(resp.status) {
            case 200:
              return resp.json();
            case 404:
              history.push('/not-found')
              break;
            default:
              return Promise.reject('Something terrible has gone wrong');
          }
        })
        .then(body => {
          if (body) {
            setAppUser(body);
          }
        })
        .catch(err => history.push('/errors', {errorMessage: err}));
    }

  ,[])


    

    function converter(value){
        return{
            name: value.locationId,
            location: {
                lat: value.latitude,
                lng: value.longitude
            }
        }
    }


    const onSelect = item => {
        setSelected(item);
        setPickup({locationId: item.id})
    }

    const mapStyles = {
        height: "80vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 30.5057586, lng: -97.6169318
    }

    const [show, setShow] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const handleChangeLocale = (evt) => {
        const newLocation = {...location};
        newLocation[evt.target.name] = evt.target.value;
        setLocation(newLocation);
    }

    

    // let markedLocation = {
    //   latitude: 0,
    //   longitude: 0
    // }

    const clickMethod = (evt) => {
      //markedLocation = {latitude: evt.latLng.lat(), longitude: evt.latLng.lng()};
      //console.log(markedLocation);
    //   setLatitude(evt.latLng.lat());
    //   setLongitude(evt.latLng.lng());
        setLocation({latitude: evt.latLng.lat(), longitude: evt.latLng.lng()});
      //console.log(latitude);
      setShow(true);
      //history.push('/location', {latitude: markedLocation.latitude, longitude: markedLocation.longitude});
    }


    const filteredPickups = pickups.filter(pickup => pickup.pickUpId == selected.name);
    // const filteredGames = games.filter(game => game.gameId == pickup.gameId)
    // const filteredUsers = pickups.filter(pickup => pickup.pickUpId == selected.name)

    const saveLocation = () => {
        if(location.latitude === 0){
            console.log(location);
            return null;
        }
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authManager.user.token}`

            },
            body: JSON.stringify({...location})
        };

        fetch('http://localhost:8080/location', init)
        .then(resp => {
            if(resp.status === 201 || resp.status === 400){
                return resp.json();
            }
            return Promise.reject('Something went terribly wrong');
        })
        .then(body => {
            if(body.locationId){
                setMarkerLocations([...markerLocations, converter(body)]);
            }else if(body){
                setErrors(body);
            }
        })
        .catch(err => history.push('/errors', {errorMessage: err}));
    }

    const onSubmitLocation = (evt) => {
        evt.preventDefault();
        const fetchFunction = saveLocation;
        fetchFunction();
        setShow(false);
    }

    function handleAddPickup(){
     history.push('pickup/add');
    }


    

    const filteredUser = users.filter(user => user.appUserId == appUser.appUserId);
    console.log(filteredUser);


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
                    {pickups.map(pickup => pickup.locationId == selected.name &&
                    <PickUp key={pickup.id} pickup={pickup} />)} 

{filteredUser !== undefined &&
                    <button type="button" className="btn btn-primary mb-3" onClick={handleAddPickup}>Add Pickup</button>
}


                  </>
                </InfoWindow>
                {/* )} */}
              </>
            )
          }
        </GoogleMap>
      </LoadScript>
      <br></br>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className="edit-form">
                <div className="form-group">
                    <label htmlFor="latitude">Latitude:</label>
                    <input name="latitude" type="number" className="form-control" value={location.latitude} id="latitude" onChange={handleChangeLocale}/>
                </div>
                <div className="form-group">
                    <label htmlFor="longitude">Longitude:</label>
                    <input name="longitude" type="number" className="form-control" value={location.longitude} id="longitude" onChange={handleChangeLocale}/>
                </div>
            </form>
        </Modal.Body>
       
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onSubmitLocation}>
            Create Location
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <PickupForm/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
        </Modal> */}
    </div>
  )
}

export default MapWithModal;