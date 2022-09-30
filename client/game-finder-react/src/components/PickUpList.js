import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Pickup from "./PickUp";
import PickUp from "./PickUp";

function PickUpList(){

  
    const [pickups, setPickups] = useState([]);

    const [allGames, setAllGames] = useState([])
   
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
        //   setAllGames(data)
          
        })
        .catch(err => history.push('/error', {errorMessage: err}));
      },[])
    

      function handleAddPickup(){
        return history.push('/pickup/add')
      }
    
    //   function handleSubmit(search, evt){
    //     search.preventDefault();
    //     search = document.getElementById("search-box").value;
    
    //     const filteredGames = games.filter(game => game.genre.toLowerCase().includes(search));
    //     setGames(filteredGames);
    //   }
    
    //   function handleCancel(){
    //     setGames(allGames);
    //   }

return (
    <>
    <button type="button" className="btn btn-primary mb-3" onClick={handleAddPickup}>Add Pickup</button>
     <form  className="m-5">
                <div className="input-group">
                    <input id="search-box" type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                    <button type="submit" className="btn btn-outline-primary">Search</button>
                    <button type="button" className='btn btn-outline-danger' >Cancel</button>
                </div>
            </form>
    <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Game</th>
            <th scope="col">Pickup Info</th>
            <th scope="col">Time</th>
            <th scope="col">Location</th>
            <th scope="col">User</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pickups.map(pickup => <PickUp key={pickup.id} pickup={pickup} />)}
        </tbody>
      </table>
      </>
);

}

export default PickUpList;