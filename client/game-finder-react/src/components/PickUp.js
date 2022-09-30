import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";

function Pickup({ pickup }) {

    const [games, setGames] = useState([]);
    let [filteredGames, setFilteredGames] = useState([])

    const history = useHistory();

    const authManager = useContext(UserContext);

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
          setFilteredGames(data);
          
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
filteredGames = filteredGames.filter(game => game.gameId == pickup.gameId);
 
  return (
    // games.filter(game => game.genre.toLowerCase().includes(search)

    
    <tr>
        {/* {filteredGames.map(( game, i) => 
                            <td key={i} value={game.gameId}>Title: {game.title}</td>)} */}

    {filteredGames.map((game, i) =><td key={i} value={game.title}>{game.title}</td>)} 
                          
     {/* <td>{games.title}</td> */}
    <td>{pickup.pickUpInfo}</td>
     <td>{pickup.playDate}</td>
     <td>{pickup.locationId}</td>
     <td>{pickup.userId}</td>
     <td>
     <button type="button" className="btn btn-success mr-3" onClick={handleEdit}>Edit</button>
      <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
     </td>
  </tr> 
            
  );
}

export default Pickup;