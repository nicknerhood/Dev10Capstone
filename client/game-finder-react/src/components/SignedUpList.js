import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import SignedUp from "./SignedUp";



function SignedUpList({pickupId}){

    const history = useHistory();


    const [signedUps, setSignedUp] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/signedUp/${pickupId}`)
        .then(resp => {
          if (resp.status === 200) {
            return resp.json();
          }
          return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
        })
        .then(data => {
          setSignedUp(data);
          
        })
        .catch(err => history.push('/error', {errorMessage: err}));
      },[])


      return(
        <div>
            {signedUps.map(signedUp => <SignedUp key={signedUp.signedUpId} signedUp={signedUp}/>)}
        </div>
      )
}

export default SignedUpList;