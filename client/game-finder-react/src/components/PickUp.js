import { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";

function Game({ game }) {

    const history = useHistory();

    const authManager = useContext(UserContext);

  const handleDelete = () => {
    history.push(`/pickup/delete/${pickup.pickupId}`);
  }

  const handleEdit = () => {
    // use history and push to the correct url
    history.push(`/game/edit/${pickup.pickupId}`);
  }
 
  return (
    <tr>
      <td>{pickup.pickUpInfo}</td>
      <td>{pickup.playDate}</td>
      <td>{pickup.locationId}</td>
      <td>{pickUpInfo.game}</td>
      <td>
       <button type="button" className="btn btn-success mr-3" onClick={handleEdit}>Edit</button>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default Game;