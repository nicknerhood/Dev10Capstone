import { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";

function Game({ game }) {

    const history = useHistory();

    const authManager = useContext(UserContext);

  const handleDelete = () => {
    history.push(`/game/delete/${game.gameId}`);
  }

  const handleEdit = () => {
    // use history and push to the correct url
    history.push(`/game/edit/${game.gameId}`);
  }

  return (
 
  
  
  
  
    <>
    {/* <div className="card text-dark bg-light" key={game.gameId}>
                    <div className="card-header">
                        <h5 className="card-title">{game.title}</h5>
                    </div>
                    <div className="card-body">
                        <p><strong>Game Description : &nbsp;&nbsp;&nbsp;&nbsp;</strong> <em>{game.gameInfo}</em></p>
                        <p><strong>Game Genre: &nbsp;&nbsp;&nbsp;&nbsp;</strong> <em>{`Genre: ${game.genre} `}</em></p>
                        <p></p>
                    </div>
                    </div>
                    </> */}
  
     <tr>
       <td>{game.title}</td>
      <td>{game.gameInfo}</td>
       <td>{game.genre}</td>
       <td>{game.imagePath}</td>
       <td>
        <button type="button" className="btn btn-success mr-3" onClick={handleEdit}>Edit</button>
         <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
       </td>
     </tr>
    
    </>
  );
  
}

export default Game;