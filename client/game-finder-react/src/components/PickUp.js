import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import SignedUpList from "./SignedUpList";
import classes from './Pickup.module.css'


const DEFAULT_APP_USER = {appUserId: 0, username: ''}


function PickUp({ pickup }) {



    const history = useHistory();

    const authManager = useContext(UserContext);

    const [appUser, setAppUser] = useState(DEFAULT_APP_USER);
    const [games, setGames] = useState([]);
    const [locations, setLocations] = useState([]);
    const [pickups,setPickups] = useState([]);
    const [users,setUsers] = useState([]);
    const [errors, setErrors] = useState([]);

    


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
      
    })
    .catch(err => history.push('/error', {errorMessage: err}));
  },[])

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


  const [signedUps, setSignedUps] = useState([]);
  const [allSignedUps, setAllSignedUps] = useState([]);



  let joinedUser = users.filter(user => user.appUserId == appUser.appUserId);
  const newUser = joinedUser[0];
  console.log(newUser)
 

 




useEffect(() => {
    fetch(`http://localhost:8080/signedUp/${pickup.pickUpId}`)
    .then(resp => {
        if (resp.status === 200) {
            return resp.json();
        }
        return Promise.reject('Something terrible has occurred');
    })
    .then(data => {
        setSignedUps(data)
    })
    .catch(err => history.pushState('./error', {errorMessage: err}));
}, [])

useEffect(() => {
  fetch(`http://localhost:8080/signedUp`)
  .then(resp => {
      if (resp.status === 200) {
          return resp.json();
      }
      return Promise.reject('Something terrible has occurred');
  })
  .then(data => {
      setAllSignedUps(data)
  })
  .catch(err => history.pushState('./error', {errorMessage: err}));
}, [])

const joinPickup = (signedUp) => {

    const init =  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({pickupId: pickup.pickUpId, userId: newUser.userId})
        body: JSON.stringify(signedUp)

    };

    fetch('http://localhost:8080/signedUp', init)
    .then(resp => {
        if(resp.status === 201 || resp.status === 400){
            return resp;
        }
        return Promise.reject('Something terrible has gone wrong');
    })
    .then(body => {
        if (body.ok){
          window.location.reload(true);
        } else if (body) {
            setErrors(body);
        }
    })
    .catch(err => history.push('./errors', {errorMessage: err}));
    

}

const handleJoin = () => {
  const signedUp = {userId: newUser.userId, pickupId: pickup.pickUpId}
 
    joinPickup(signedUp);
}
// let leavingUsers = signedUps.filter(signedUp => signedUp.userId == newUser.userId )
// const leftUser = leavingUsers[0];
// console.log(leftUser);





  const handleDelete = () => {
    history.push(`/pickup/delete/${pickup.pickUpId}`);
  }

  const handleEdit = () => {
    // use history and push to the correct url
    history.push(`/pickup/edit/${pickup.pickUpId}`);
  }



  const filteredGames = games.filter(game => game.gameId == pickup.gameId);

  const filteredLocations = locations.filter(location => location.locationId == pickup.locationId);
  
  const filteredUser = users.filter(user => user.userId == pickup.userId);

  const su = signedUps.filter(su => su.userId === newUser.userId);
   const temp = su[0];

   const handleLeave = () => {
    const init = {
      method: 'DELETE',
      headers: {
        // Authorization: `Bearer ${authManager.user.token}`

      }
    };

    fetch(`http://localhost:8080/signedUp/${temp.signedUpId}`, init)
    .then( resp => {
      switch(resp.status) {
        case 204:
          window.location.reload(true);
          break;
        case 404:
          history.push('/not-found', { id: temp.signedUpId })
          break;
        case 403:
          authManager.logout();
          history.push('/login');
          break;
        default:
          return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
      }
    })
    .catch(err => history.push('/error', {errorMessage: err}));
  }
const leaveButton = () => {
  if(temp == null) {

    return(                              <button type="button" className="btn btn-primary" onClick={handleJoin}>Join</button>

      
    );

  } else if (temp !== null || undefined) {
    return (
      <button type="button" className="btn btn-secondary" onClick={handleLeave}>Leave</button>
    );
  } else {
    return (<div>loading</div>);
  }
}
   



  
  return (
    <>
   
    <li className={classes.pickup} key={pickup.pickupId}>
      
                    <div >
                      {filteredGames.map(game => 
                        <h1  key= {pickup.gameId}>Game: {game.title}</h1>
                        
  )}
           {filteredUser.map( user => (user.appUserId == appUser.appUserId || authManager.user.hasRole('ROLE_ADMIN') )&&
                    <button type="button" className="btn btn-success" onClick={handleEdit}>Edit Posting</button>
                    )}    
                     { filteredUser.map( user => (user.appUserId == appUser.appUserId  || authManager.user.hasRole('ROLE_ADMIN') )&&
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        )} 
                              {/* <button type="button" className="btn btn-primary" onClick={handleJoin}>Join</button>
                              <button type="button" className="btn btn-secondary" onClick={handleLeave}>Leave</button> */}

                              {leaveButton()}

                               
                    </div>
                  
                    <div className={classes.description}>
                      <h3>Details</h3>
                        <p><strong>Pickup Description : &nbsp;&nbsp;&nbsp;&nbsp;</strong> <em>{pickup.pickUpInfo}</em></p>
                        <p><strong>Pickup Date: &nbsp;&nbsp;&nbsp;&nbsp;</strong> <em>{`Date: ${pickup.playDate} `}</em></p>
                        {filteredUser.map(user => 
                        <p><strong>Pickup Poster: &nbsp;&nbsp;&nbsp;&nbsp;</strong> <em>{`Username: ${user.username}  `}</em></p> )}
                        {filteredLocations.map(location =>
                        <p><strong>Pickup Latitude: &nbsp;&nbsp;&nbsp;&nbsp; </strong><em>{`Latitude: ${location.latitude}`}</em></p>)}
                        {filteredLocations.map(location =>
                        <p><strong>Pickup Longitude: &nbsp;&nbsp;&nbsp;&nbsp; </strong><em>{`Longitude: ${location.longitude}`}</em></p>)}

                        {/* {filteredLocations.map(location =>
                        <p><strong>Pickup Location: &nbsp;&nbsp;&nbsp;&nbsp; </strong><em>{`Lat: ${location.latitude}, Lng: ${location.longitude}`}</em></p>)} */}
                        <p><strong>Location #: &nbsp;&nbsp;&nbsp;&nbsp;</strong> <em>{`${pickup.locationId}`}</em></p>
                       

                        <p></p>
                    </div>

                    <div>
                      <h3>Joined Users</h3>
          <SignedUpList pickupId={pickup.pickUpId} />
        </div>
                    </li>
                    
                    </> 
  );
}

export default PickUp;