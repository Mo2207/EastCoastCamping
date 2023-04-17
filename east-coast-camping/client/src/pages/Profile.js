import { React, useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Footer from '../components/Footer';

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { QUERY_ME } from '../utils/queries';
import { DELETE_ME } from '../utils/mutations';
import { EDIT_ME } from '../utils/mutations';
// import NoMatch from './NoMatch';


function Profile() {
  let id;
  if (Auth.loggedIn()) {
    id = Auth.getToken()
  };
  const { loading, data } = useQuery(QUERY_ME, {
    variables: { userId: id }
  });
  
  const profile = data?.userById || {};
//  console.log(profile.saved)
 Auth.setInfo(profile.firstName, profile.lastName, profile.email)


  const [deleteMe] = useMutation(DELETE_ME)

  function handleToDelete(deleteUserId) {
    const { data } = deleteMe({
      variables: { deleteUserId }
    })

    localStorage.removeItem('id_token');
    window.location.assign('/regret');
  }


  const [editMe] = useMutation(EDIT_ME);


  // edit mode when user pressed edit button
  const [editMode, setEditMode] = useState(false);
  // state variables for user profile
  const [firstNameState, setFirstName] = useState('');
  const [lastNameState, setLastName] = useState('');
  const [emailState, setEmail] = useState('');

  // everytime profile changes useEffect is called and sets the states
  useEffect(() => {
    if (profile.firstName) setFirstName(profile.firstName);
    if (profile.lastName) setLastName(profile.lastName);
    if (profile.email) setEmail(profile.email);
  }, [profile])

  // edit the users fields
  function handleToEdit() {
    // get the users id to hand into editMe
    const userId = Auth.getToken();
    // console.log(`userId is: ${userId}`)

    setEditMode(false);
    editMe({
      variables: {
        userId: userId,
        firstName: firstNameState,
        lastName: lastNameState,
        email: emailState
      }
    })
  }

  return (
    <>
      {Auth.loggedIn() ? (
        <section style={{ backgroundColor: '#eee' }}>
          <MDBContainer className="py-5">
            <MDBRow >
              <MDBCol>
                <MDBRow className="bg-light rounded-3 p-3 mb-3">
                  <h5 className="text-center">MY PROFILE</h5>
                </MDBRow>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol lg="5" >
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width:'135px'}}
                      fluid />
                    <p className="text-muted mb-1">Full Stack Developer</p>
                  </MDBCardBody>
                </MDBCard>
                <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                  <MDBRow>
                    <MDBBreadcrumbItem active>ACCOUNT SETTING</MDBBreadcrumbItem>
                      <MDBRow>
                        {editMode ? (
                        <MDBCol size="6">
                          <Button onClick={handleToEdit}>Save</Button> 
                        </MDBCol>
                        ):(
                        <MDBCol size="6">
                          <Button onClick={() => setEditMode(true)}>Edit</Button> 
                        </MDBCol>
                        )}
                        <MDBCol size="6">
                          <Button                       
                            className="btn-danger"
                            onClick={() => {handleToDelete(id)}}>Delete</Button> 
                        </MDBCol>
                      </MDBRow>
                    </MDBRow>
                  </MDBBreadcrumb>
              </MDBCol>
              <MDBCol lg="7" >
                <MDBCard className="mb-4">
                  <MDBCardBody  >
                    <MDBRow >
                      <MDBCol  sm="3">
                        <MDBCardText >First Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        {editMode ? (                          
                            <input type="text" id='firstName' value={firstNameState} onChange={(e) => setFirstName(e.target.value)}>
                            </input>                          
                        ) : (
                          <MDBCardText className="text-muted">{firstNameState}</MDBCardText>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Last Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        {editMode ? (
                          <input type="text" id='lastName' value={lastNameState} onChange={(e) => setLastName(e.target.value)}>
                          </input>
                        ) : (
                          <MDBCardText className="text-muted">{lastNameState}</MDBCardText>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>                      
                      <MDBCol sm="9">
                        {editMode ? (
                          <input type="text" id='email' value={emailState} onChange={(e) => setEmail(e.target.value)}>
                          </input>
                        ) : (
                          <MDBCardText className="text-muted">{emailState}</MDBCardText>
                        )}
                      </MDBCol>
                    </MDBRow>                    
                  </MDBCardBody>                  
                </MDBCard>
                <MDBRow className="text-center">
                  <MDBCol>
                    <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                    <MDBRow>
                      <MDBBreadcrumbItem active>MY BOOKING</MDBBreadcrumbItem>
                        <MDBRow >
                          <MDBCol sm="3" size="md" className="align-items-center">
                            <a href="/myBookings">
                              <Button>Upcoming</Button>
                            </a>
                          </MDBCol> 
                          <MDBCol sm="3" size="md" className="align-items-center">
                            <a href="/completed">
                              <Button>Completed</Button>
                            </a>
                          </MDBCol> 
                          <MDBCol sm="5" size="md" className="align-items-center">                
                            <a href="/favorite">
                              <Button>Favorite Camps</Button>
                            </a>
                          </MDBCol>           
                        </MDBRow>
                      </MDBRow>
                    </MDBBreadcrumb>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>            
          </MDBContainer>
        </section>
      ) : null}

      < Footer />
    </>

  );
}

export default Profile;