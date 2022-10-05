import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../UserContext';

import PickUp from './PickUp';
import User from './User';


// const DEFAULT_USER = {userId: 0, username: ''};
// const DEFAULT_APP_USER 
function Profile() {
const[users, setUsers] = useState([]);
const[appUsers, setAppUsers] = useState([]);
const[newUser, setNewUser] = useState(false);
const [pickups, setPickups] = useState([]);

// const[user, setUser] = useState([]);

const authManager = useContext(UserContext);


  const history = useHistory();

  






  


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

    //   setAllGames(data)
      
    })
    .catch(err => history.push('/error', {errorMessage: err}));
  },[])


  
  useEffect(() => {
    fetch(`http://localhost:8080/appuser/${authManager.user.username}`)
    .then(resp => {
      if (resp.status === 200) {
        return resp.json();
      }
      return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
    })
    .then(data => {
      setAppUsers(data);
    //   setAllGames(data)
      
    })
    .catch(err => history.push('/error', {errorMessage: err}));
  },[])
  
  
  function handleAddPickup(){
    return history.push('/user/add')
  }

  const filteredUser = users.filter(user => user.appUserId == appUsers.appUserId);
  


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
      
    })
    .catch(err => history.push('/error', {errorMessage: err}));
  },[])
  function handleAddPickup(){
    return history.push('/pickup/add')
  }

  const filteredPickups = pickups.filter(pickup => pickup.userId == users.userId)

    


  return (

    <>
      { filteredUser.map( user => user.appUserId !== appUsers.appUserId &&
     <button type="button" className="btn btn-primary mb-3" onClick={handleAddPickup}>Add Pickup</button>
      )}

            {filteredUser.map(user => <User key={user.userId} user={user} />)}
            
      <div > 

                  
       <div className="row row-cols-lg-12 row-cols-md-12 row-cols-12 mx-3 g-3">
     
          <div className="card text-dark bg-light" >
     
              <div className="card-body"> 
                   <p></p>
              </div>
            
              </div>
          </div>
          </div>
          
    

        
          



</>

  
  );}
            

export default Profile;