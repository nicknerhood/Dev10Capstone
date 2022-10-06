import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MapWithModal from './MapWithModal';
// import UserContext from '../UserContext';

import PickUp from './PickUp';
import PickUpMapTesting from './PickUpMapTesting';
import UserContext from '../UserContext';
import { useContext } from 'react';


function PickupList() {
  const [pickups, setPickups] = useState([]);
  const [searchedPickups, setSearchedPickups] = useState([]);
  const [allPickups, setAllPickups] = useState([]);
  const [users, setUsers] = useState([]);
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
    <h3>Add a Location by Clicking on the map</h3>
    <MapWithModal />
      <h2>Pickups</h2>
      {filteredUser.length !== 0 &&
     <button type="button" className="btn btn-primary mb-3" onClick={handleAddPickup}>Add Pickup</button>}
     <form onSubmit={handleSubmit} className="m-5">
                <div className="input-group">
                    <input id="search-box" type="search" className="form-control rounded" placeholder="Search by Date yyyy-mm-dd" aria-label="Search" aria-describedby="search-addon" />
                    <button type="submit" className="btn btn-outline-primary">Search</button>
                    <button type="button" className='btn btn-outline-danger' onClick={handleCancel}>Cancel</button>
                </div>
     </form>
     <form onSubmit={handleSearchByGameId} className="m-5">
                <div className="input-group">
                    <input id="search-box-2" type="search" className="form-control rounded" placeholder="Search by gameId" aria-label="Search" aria-describedby="search-addon" />
                    <button type="submit" className="btn btn-outline-primary">Search</button>
                    <button type="button" className='btn btn-outline-danger' onClick={handleCancel}>Cancel</button>
                </div>
     </form>
            {searchedPickups != pickups &&
            <div>
             {pickups.map(pickup => <PickUp key={pickup.id} pickup={pickup} />)} 
             
      <div>
      
      <div className="row row-cols-lg-12 row-cols-md-12 row-cols-12 mx-3 g-3">
     
          <div className="card text-dark bg-light" >
     
              {/* <div className="card-header">
                  <h5 className="card-title">Game:</h5>
              </div> */}
              <div className="card-body">
                  <p></p>
              </div>
            
              </div>
          </div>
          </div>
          

          </div>
          
}
</>
  );}
            

export default PickupList;