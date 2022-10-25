import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PickupForm from "./AddPickUp";
import Profile from "./Profile";



function SignedUp({signedUp}){

    const history = useHistory();
    const [users,setUsers] = useState([]);    




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

      const filteredUsers = users.filter(user => user.userId == signedUp.userId )




    return (

        <ul>
            {filteredUsers.map(user => 
            <li>{user.username}</li>)}
            {/* <li>{signedUp.userId}</li>
            <li>{signedUp.pickupId}</li> */}
        </ul>

        
    )
}

   

    export default SignedUp;