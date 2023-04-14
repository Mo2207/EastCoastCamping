import { React, useState, useEffect } from 'react';
import { Navigate, useParams, useResolvedPath } from 'react-router-dom';
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
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { QUERY_ME } from '../utils/queries';
import { DELETE_ME } from '../utils/mutations';
import { EDIT_ME } from '../utils/mutations';
// import NoMatch from './NoMatch';


export default function Profile() {
  const user = "data";

  let id;
  if (Auth.loggedIn()) {
    id = Auth.getToken()
  };
  const { loading, data } = useQuery(QUERY_ME, {
    variables: { userId: id }
  });
  const profile = data?.userById || {};

  const [deleteMe] = useMutation(DELETE_ME)

  function handleToDelete(deleteUserId) {
    const { data } = deleteMe({
      variables: { deleteUserId }
    })

    console.log(data)
    localStorage.removeItem('id_token');
    window.location.assign('/regret');
  }


  const [ editMe ] = useMutation(EDIT_ME);

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
            <MDBRow>
              <MDBCol>
                <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                  <MDBBreadcrumbItem active>MY PROFILE</MDBBreadcrumbItem>
                </MDBBreadcrumb>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: '150px' }}
                      fluid />
                    <p className="text-muted mb-1">Full Stack Developer</p>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="8">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>First Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{user.firstName}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Last Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profile.lastName}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profile.email}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
                <MDBRow>
                  <MDBCol sm="1">
                    <Button>Edit</Button>
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
            <MDBRow>
              <MDBCol sm="1">
                <Button onClick={() => setEditMode(true)}>Edit</Button> 
              </MDBCol>
              <MDBCol sm="1">
                <Button onClick={handleToEdit}>Save</Button> 
              </MDBCol>
              <MDBCol sm="1">
                <Button                       
                  className="btn-danger"
                  onClick={() => {handleToDelete(id)}}>Delete</Button> 
                {/* <DeleteUser /> */}

              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      ) : null}
      <Footer />
    </>
  );
}