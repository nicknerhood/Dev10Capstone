import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";




function User({ user }) {

    const history = useHistory();

    const authManager = useContext(UserContext);

    
    const handleEdit = () => {
        // use history and push to the correct url
        history.push(`/user/edit/${user.userId}`);
      }
      
  

  
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
    </div>

  
                  
      


                    
                    
                    </> 
  );
}

export default User;