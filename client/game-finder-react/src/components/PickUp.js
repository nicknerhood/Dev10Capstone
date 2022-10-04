import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";

const DEFAULT_APP_USER = {appUserId: '', username: ''}


function PickUp({ pickup, game }) {

    const history = useHistory();

    const authManager = useContext(UserContext);

    const [appUser, setAppUser] = useState(DEFAULT_APP_USER);
    const [games, setGames] = useState([]);
    const [locations, setLocations] = useState([]);

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

  const handleDelete = () => {
    history.push(`/pickup/delete/${pickup.pickupId}`);
  }

  const handleEdit = () => {
    // use history and push to the correct url
    history.push(`/pickup/edit/${pickup.pickUpId}`);
  }

  const filteredGames = games.filter(game => game.gameId == pickup.gameId);

  const filteredLocations = locations.filter(location => location.locationId == pickup.locationId);
  

  
  return (
    <>
    <div className="card text-dark bg-light" key={pickup.pickupId}>
      
                    <div className="card-header">
                      {filteredGames.map(game => 
                        <h5 className="card-title" key= {pickup.gameId}>Game: {game.title}</h5>
                        
  )}
                      
                    </div>
                    <button type="button" className="btn btn-success mr-3" onClick={handleEdit}>Edit</button>
                    <div className="card-body">
                        <p><strong>Pickup Description : &nbsp;&nbsp;&nbsp;&nbsp;</strong> <em>{pickup.pickUpInfo}</em></p>
                        <p><strong>Pickup Date: &nbsp;&nbsp;&nbsp;&nbsp;</strong> <em>{`Date: ${pickup.playDate} `}</em></p>
                        <p><strong>Pickup Poster: &nbsp;&nbsp;&nbsp;&nbsp;</strong> <em>{`Username: ${authManager.user.username}  `}</em></p>
                        {/* {filteredLocations.map(location =>
                        <p><strong>Pickup Location: &nbsp;&nbsp;&nbsp;&nbsp; </strong><em>{`Lat: ${location.latitude}, Lng: ${location.longitude}`}</em></p>)} */}
                        <p><strong>Location #: &nbsp;&nbsp;&nbsp;&nbsp;</strong> <em>{`${pickup.locationId}`}</em></p>
                        <p></p>
                    </div>
                    </div>
                    
                    </> 
  );
}

export default PickUp;