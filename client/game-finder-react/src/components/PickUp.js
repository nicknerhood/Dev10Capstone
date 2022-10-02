import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";

const DEFAULT_APP_USER = {appUserId: '', username: ''}


function PickUp({ pickup, game }) {

    const history = useHistory();

    const authManager = useContext(UserContext);

    const [appUser, setAppUser] = useState(DEFAULT_APP_USER);
    const [games, setGames] = useState([]);



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
    history.push(`/pickup/edit/${pickup.pickupId}`);
  }

  const filteredGames = games.filter(game => game.gameId == pickup.gameId);
  

  
  return (
    <>
    <div className="card text-dark bg-light" key={pickup.pickupId}>
      
                    <div className="card-header">
                      {filteredGames.map(game => 
                        <h5 className="card-title" key= {pickup.gameId}>Game: {game.title}</h5>
  )}
                      
                    </div>
                    <div className="card-body">
                        <p><strong>Pickup Description : &nbsp;&nbsp;&nbsp;&nbsp;</strong> <em>{pickup.pickUpInfo}</em></p>
                        <p><strong>Pickup Date: &nbsp;&nbsp;&nbsp;&nbsp;</strong> <em>{`Genre: ${pickup.playDate} `}</em></p>
                        <p><strong>Pickup Poster: &nbsp;&nbsp;&nbsp;&nbsp;</strong> <em>{`Username: ${authManager.user.username}  `}</em></p>
                        <p></p>
                    </div>
                    </div>
                    
                    </> 
  );
}

export default PickUp;