import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../UserContext';

import Pickup from './PickUp';

function PickUpList() {
  const [pickups, setPickups] = useState([]);

  const history = useHistory();

  const authManager = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:8080/pickup')
    .then(resp => {
      if (resp.status === 200) {
        return resp.json();
      }
      return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
    })
    .then(data => {
      setPanels(data);
    })
    .catch(err => history.push('/error', {errorMessage: err}));
  },[])

  const handleAddPickup = () => history.push('/pickup/add')

  return (
    <>
      <h2>Pickups</h2>
      {authManager.user &&  <button type="button" className="btn btn-primary mb-3" onClick={handleAddPickup}>Add Solar Panel</button>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Section</th>
            <th scope="col">Row-Column</th>
            <th scope="col">Year</th>
            <th scope="col">Material</th>
            <th scope="col">Is Tracking</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pickup.map(pickup => <PickUp key={pickup.id} pickup={pickup} />)}
        </tbody>
      </table>
    </>
  )
}

export default SolarPanels;