import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MapWithModal from './MapWithModal';
// import UserContext from '../UserContext';

import PickUp from './PickUp';
import PickUpMapTesting from './PickUpMapTesting';
import UserContext from '../UserContext';
import { useContext } from 'react';
import SignedUpList from './SignedUpList';
import classes from './Pickup.module.css';
import Card from './UI/Card';

const DEFAULT_APP_USER = {appUserId: '', username: ''}


function PickupList() {
  const [pickups, setPickups] = useState([]);
  const [searchedPickups, setSearchedPickups] = useState([]);
  const [allPickups, setAllPickups] = useState([]);
  const [users, setUsers] = useState([]);
  const authManager = useContext(UserContext);
  const [appUser, setAppUser] = useState(DEFAULT_APP_USER);


  const history = useHistory();

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


  const filteredUser = users.filter(user => user.username == authManager.user.username);
  //console.log(filteredUser.length)





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
  function handleAddPickup(){
    return history.push('/pickup/add')
  }
  

  function handleSubmit(search, evt){
    search.preventDefault();
    search = document.getElementById("search-box").value;

    const filteredPickups = pickups.filter(pickup => pickup.playDate >= search );
    setPickups(filteredPickups);
  }

  function handleSearchByGameId(search, evt){
    search.preventDefault();
    search = document.getElementById("search-box-2").value;

    const filteredPickups = pickups.filter(pickup => pickup.gameId == search );
    setPickups(filteredPickups);
  }

  function handleCancel(){
    setPickups(allPickups);
  }




  return (
    <>
    <h1 className="mt-3 mb-4">Add a Location by Clicking on the map</h1>
    <MapWithModal />
      <h1>Pickups</h1>
      {filteredUser.length !== 0 &&
     <button type="button" className="btn btn-primary mb-3" onClick={handleAddPickup}>Add Pickup</button>}
     <form onSubmit={handleSubmit} className="m-5">
                <div className="input-group">
                    <input id="search-box" type="search" className="form-control rounded" placeholder="Search for pickups after this date: YYYY-MM-DD" aria-label="Search" aria-describedby="search-addon" />
                    <button type="submit" className="btn btn-outline-primary">Search</button>
                    <button type="button" className='btn btn-outline-danger' onClick={handleCancel}>Reset</button>
                </div>
     </form>
     <form onSubmit={handleSearchByGameId} className="m-5">
                <div className="input-group">
                    <input id="search-box-2" type="search" className="form-control rounded" placeholder="Search by gameId" aria-label="Search" aria-describedby="search-addon" />
                    <button type="submit" className="btn btn-outline-primary">Search</button>
                    <button type="button" className='btn btn-outline-danger' onClick={handleCancel}>Reset</button>
                </div>
     </form>
            {searchedPickups != pickups && 

<section className={classes.meals}>
<Card>
  <ul>{pickups.map(pickup =>  <PickUp    key={pickup.pickUpId} pickup={pickup}/>  )}</ul>
</Card>
</section>}
            

</>
  );}
            

export default PickupList;