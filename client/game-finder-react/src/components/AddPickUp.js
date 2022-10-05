import { useEffect, useState } from 'react';
import { useContext } from 'react';
import UserContext from '../UserContext';


import { useHistory, useParams } from 'react-router-dom';

import Errors from './Errors';
import PickUpMapTesting from './PickUpMapTesting';





function PickupForm() {

    const authManager = useContext(UserContext);


    const DEFAULT_PICKUP = {pickUpInfo: '', playDate: '', locationId: 0, gameId: 0, userId: 0  }

  const [pickup, setPickup] = useState(DEFAULT_PICKUP);
  const [errors, setErrors] = useState([]);
  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);
  const { editId } = useParams();

  const history = useHistory();


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
    fetch('http://localhost:8080/game')
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
    if (editId) {
      fetch(`http://localhost:8080/pickup/${editId}`)
        .then(resp => {
          switch(resp.status) {
            case 200:
              return resp.json();
            case 404:
              history.push('/not-found', { id: editId })
              break;
            default:
              return Promise.reject('Something terrible has gone wrong');
          }
        })
        .then(body => {
          if (body) {
            setPickup(body);
          }
        })
        .catch(err => history.push('/errors', {errorMessage: err}));
    }

  }, [])

  const savePickup = () => {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...pickup})
    };

    fetch('http://localhost:8080/pickup', init)
    .then(resp => {
      if (resp.status === 201 || resp.status === 400) {
        return resp.json();
      }
      return Promise.reject('Something terrible has gone wrong');
    })
    .then(body => {
      if (body.pickupId) {
        history.push('/pickup')
      } else if (body) {
        setErrors(body);
      }
    })
    .catch(err => history.push('/errors', {errorMessage: err}));
  }

  const updatePickup = () => {
    const updatePickup = {id: editId, ...pickup};

    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatePickup)
    };

    fetch(`http://localhost:8080/pickup/${editId}`, init)
    .then(resp => {
      switch (resp.status) {
        case 204:
          return null;
        case 400:
          return resp.json();
        case 404:
          history.push('/not-found', { id: editId });
          break;
        default:
          return Promise.reject('Something terrible has gone wrong');

      }
    })
    .then(body => {
      if (!body) {
        history.push('/pickup')
      } else if (body) {
        setErrors(body);
      }
    })
    .catch(err => history.push('/errors', {errorMessage: err}));
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    const fetchFunction = editId > 0 ? updatePickup : savePickup;

    fetchFunction();

  }

  const handleChange = (evt) => {


   
    const newPickup = {...pickup};

    newPickup[evt.target.name] = evt.target.value;

    setPickup(newPickup);


   
  }

  const handleCancel = () => history.push('/pickup')


  return (
    <>
      <PickUpMapTesting />
      <h2>{editId ? 'Update' : 'Add'} PickUp</h2>
      {errors.length > 0 ? <Errors errors={errors} /> : null}
      <form className='edit-form' onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="pickUpInfo">pickUpInfo:</label>
          <input name="pickUpInfo" type="text" className="form-control" id="pickUpInfo" value={pickup.pickUpInfo} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="playDate">Play Date:</label>
          <input name="playDate" type="date" className="form-control" id="playDate" value={pickup.playDate} onChange={handleChange} />
        </div>
        <div className="form-group">
        <select className="form-control" id="gameId" name="gameId"  value={pickup.gameId} onChange={handleChange}>
                        <option defaultValue>Choose a Game...</option>
                        {games.map((game) => 
                            <option value={game.gameId}>Title: {game.title}</option>)}
                    </select>
        </div>
        <div className="form-group">
        <select className="form-control" id="userId" name="userId"  value={pickup.userId} onChange={handleChange}>
                        <option defaultValue>Choose Your Username...</option>
                        {users.map((user) => 
                            <option value={user.userId}>Title: {user.username}</option>)}
                    </select>
        </div>
        <div className="form-group">
          <label htmlFor="locationId">LocationId</label>
          <input name="locationId" type="text" className="form-control" id="locationId" value={pickup.locationId} onChange={handleChange} />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-success mr-3">Submit</button>
          <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
}

export default PickupForm;