import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import PickUp from "./PickUp";




function User({ user }) {

    const history = useHistory();

    const authManager = useContext(UserContext);

    const [pickups, setPickups] = useState([]);


    
    const handleEdit = () => {
        // use history and push to the correct url
        history.push(`/user/edit/${user.userId}`);
      }

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
      
      const filteredPickups = pickups.filter(pickup => pickup.userId == user.userId)

      console.log(filteredPickups)

  

  
  return (
    <>
    <div className="card text-dark bg-light" key={user.userId}>
      
                    <div className="card-header">
                    
                        <h5 className="card-title" >{user.firstName} {user.lastName}</h5> 
                    </div>
                    
                    <div className="card-body">
                        <p><strong>Username: &nbsp;&nbsp;&nbsp;&nbsp;</strong> <em>{user.username}</em></p>
                        <p><strong>Email: &nbsp;&nbsp;&nbsp;&nbsp;</strong> <em>{user.email}</em></p>
                        {/* <p><strong>Pickup Poster: &nbsp;&nbsp;&nbsp;&nbsp;</strong> <em>{`Username: ${authManager.user.username}  `}</em></p> */}
                        <p></p>
                    </div>
                    <button type="button" className="btn btn-success mr-3" onClick={handleEdit}>Edit Profile Information</button>

                    {filteredPickups.length !== 0 &&
                    <>
                    <h1 className mb-10>Your Pickup Posts</h1>

                   
                    <div>
{filteredPickups.map(pickup => <PickUp key={pickup.id} pickup={pickup} />)} 
</div>
</>
}
{/* <div className="row row-cols-lg-12 row-cols-md-12 row-cols-12 mx-3 g-3">

<div className="card text-dark bg-light" >

    <div className="card-body"> 
         <p></p>
    </div>
  
    </div>
</div> */}

    </div>
                    
         



</>
                    
  );
}

export default User;