import {  useState } from "react";
import { useHistory } from "react-router-dom";
import Errors from "./Errors";
import PickUpMapTesting from "./PickUpMapTesting";

const DEFAULT_LOCATION = {latitude: 0, longitude: 0};

function LocationForm(){

    const [location, setLocation] = useState(DEFAULT_LOCATION);
    const [errors, setErrors] = useState([]);

    const history = useHistory();

    const markedLocation = {
        latitude: 0,
        longitude: 0
    }

    markedLocation.latitude = history.location.state ? history.location.state.latitude : null;
    markedLocation.longitude = history.location.state ? history.location.state.longitude : null;
    //console.log(markedLocation);

    const saveLocation = () => {
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
                history.push('/pickup');
            }else if(body){
                setErrors(body);
            }
        })
        .catch(err => history.push('/errors', {errorMessage: err}));
    }

    const onSubmit = (evt) => {
        evt.preventDefault();
        const fetchFunction = saveLocation;

        fetchFunction();
    }

    const handleChange = (evt) => {
        const newLocation = {...location};
        newLocation[evt.target.name] = evt.target.value;

        setLocation(newLocation);
    }

    const handleCancel = () => history.push('/pickup');

    const handleAutofill = () => {
        setLocation(markedLocation);
    }

    return (
        <>
        
        <h2>Add Location (Click on Map to get coordinates)</h2>
        {errors.length > 0 ? <Errors errors={errors} /> : null}
        <form className="edit-form" onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="latitude">Latitude:</label>
                <input name="latitude" type="number" className="form-control" id="latitude" value={location.latitude} onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="longitude">Longitude:</label>
                <input name="longitude" type="number" className="form-control" id="longitude" value={location.longitude} onChange={handleChange}/>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-success mr-3">Submit</button>
                <button type="button" className="btn btn-danger mr-3" onClick={handleCancel}>Cancel</button>
                <button type="button" className="btn btn-primary mr-3" onClick={handleAutofill}>Autofill</button>
            </div>
        </form>
        <PickUpMapTesting />
        </>
    )

}

export default LocationForm;