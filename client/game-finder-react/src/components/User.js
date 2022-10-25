import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import PickUp from "./PickUp";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';





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

      //console.log(filteredPickups)

  

  
  return (
   <div>



                
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-200">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  <MDBTypography tag="h5">Marie Horwitz</MDBTypography>
                  <MDBCardText>Web Designer</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">{user.firstName} {user.lastName}</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{user.email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Username</MDBTypography>
                        <MDBCardText className="text-muted">{user.username}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    
                    
                       
                      


                    <div className="d-flex justify-content-start">
                      <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      
   

    </section>  

    {filteredPickups.length !== 0 &&
  <div className="py-5 h-1">
                    <h1 >Your Pickup Posts</h1>

                   
                    
{filteredPickups.map(pickup => <PickUp key={pickup.id} pickup={pickup} />)} 


</div>

    }

</div>

           
  );
}

export default User;