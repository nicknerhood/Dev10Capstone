import { useEffect, useState } from 'react';
import UserContext from "../UserContext";
import { useContext } from "react";





import { useHistory, useParams } from 'react-router-dom';
import Errors from './Errors';

const DEFAULT_USER = { username: '', firstName: '', lastName: '', email: '', appUserId: 0, locationId: 0}
const DEFAULT_APP_USER = {appUserId: '', username: ''}


function AddUser() {

    
    const authManager = useContext(UserContext);

  const [user, setUser] = useState(DEFAULT_USER);
  const [appUser, setAppUser] = useState(DEFAULT_APP_USER);
  const [errors, setErrors] = useState([]);

  

  const { editId } = useParams();
  const history = useHistory();


  useEffect(() => {
    if (editId) {
      fetch(`http://localhost:8080/user/${editId}`)
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
            setUser(body);
          }
        })
        .catch(err => history.push('/errors', {errorMessage: err}));
    }

  }, [])

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

  const saveUser = () => {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...user})
    };

    fetch('http://localhost:8080/user', init)
    .then(resp => {
      if (resp.status === 201 || resp.status === 400) {
        return resp.json();
      }
      return Promise.reject('Something terrible has gone wrong');
    })
    .then(body => {
      if (body.userId) {
        history.push('/user')
      } else if (body) {
        setErrors(body);
      }
    })
    .catch(err => history.push('/errors', {errorMessage: err}));
  }

  const updateUser = () => {
    const updateUser = {id: editId, ...user};

    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateUser)
    };

    fetch(`http://localhost:8080/user/${editId}`, init)
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
        history.push('/user')
      } else if (body) {
        setErrors(body);
      }
    })
    .catch(err => history.push('/errors', {errorMessage: err}));
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    const fetchFunction = editId > 0 ? updateUser : saveUser;

    fetchFunction();

  }

  const handleChange = (evt) => {


   
    const newUser = {...user};

    newUser[evt.target.name] = evt.target.value;

    setUser(newUser);


   
  }

  const handleCancel = () => history.push('/user')


  return (
    <>
      <h2>{editId ? 'Update' : 'Add'} User</h2>
      {errors.length > 0 ? <Errors errors={errors} /> : null}
      <form className='edit-form' onSubmit={onSubmit}>
        <div className="form-group">
        <select className="form-control" id="username" name="username"  value={user.username} onChange={handleChange}>
                        <option defaultValue>Your Username</option>
     
                            <option value={appUser.username}>{appUser.username}</option>
                    </select>        </div>
        <div className="form-group">
          <label htmlFor="firstName">first name:</label>
          <input name="firstName" type="text" className="form-control" id="firstName" value={user.firstName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">last name</label>
          <input name="lastName" type="text" className="form-control" id="lastName" value={user.lastName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">email:</label>
          <input name="email" type="text" className="form-control" id="email" value={user.email} onChange={handleChange} />
        </div>
        {/* <div className="form-group">
          <label htmlFor="locationId">Location:</label>
          <input name="locationId" type="number" className="form-control" id="locationId" value={user.locationId} onChange={handleChange} />
        </div> */}
        <div className="form-group">
        <select className="form-control" id="appUserId" name="appUserId"  value={user.appUserId} onChange={handleChange}>
                        <option defaultValue>Your App User Id</option>
     
                            <option value={appUser.appUserId}>Id: {appUser.appUserId}</option>
                    </select>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-success mr-3">Submit</button>
          <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
}

export default AddUser;