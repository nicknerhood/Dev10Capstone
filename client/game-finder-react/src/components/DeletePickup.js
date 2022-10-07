import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import UserContext from '../UserContext';

function DeletePickup() {

  const [pickup, setPickup] = useState({});
  const { deleteId } = useParams();

  const history = useHistory();

  const authManager = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:8080/pickup/${deleteId}`)
        .then(resp => {
          switch(resp.status) {
            case 200:
              return resp.json();
            case 404:
              history.push('/not-found', { id: deleteId })
              break;
            default:
              return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
          }
        })
        .then(body => {
          if (body) {
            setPickup(body);
          }
        })
        .catch(err => history.push('/error', {errorMessage: err}));
  },[])

  const handleDelete = () => {
    console.log("beginning of handle");
    const init = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authManager.user.token}`

      }
    };

    fetch(`http://localhost:8080/pickup/${pickup.pickUpId}`, init)
    .then( resp => {
      switch(resp.status) {
        case 204:
          history.push('/pickup');
          break;
        case 404:
          history.push('/not-found', { id: pickup.pickUpId })
          break;
        case 403:
          //authManager.logout();
          //history.push('/login');
          break;
        default:
          return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
      }
    })
    .catch(err => history.push('/error', {errorMessage: err}));
  }

  const handleCancel = () => history.push('/pickup')

  return (<>
    <h2>Deleting Pickup</h2>
    <div className="alert alert-danger">
      <h5 className="mb-3">Are you sure you want to delete this pickup post?</h5>
      <div className="mb-3">
      </div>
      <div>
        <button type="button" className="btn btn-danger mr-3" onClick={handleDelete}>Delete</button>
        <button type="button" className="btn btn-success" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  </>)
}

export default DeletePickup;