import { React, useState } from 'react';
import { Navigate, useParams, useResolvedPath } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

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
  // edit mode when user pressed edit button
  const [editMode, setEditMode] = useState(false);

  const user = "data";

  let id;
  if(Auth.loggedIn()){
    id = Auth.getToken()
  };
  const { loading, data } = useQuery(QUERY_ME, {
    variables: { userId:id }
  });
  const profile = data?.userById || {};
  
  const [ deleteMe ] = useMutation(DELETE_ME)
  
  function handleToDelete(deleteUserId){
    const { data } = deleteMe({
      variables: {deleteUserId}
    })

      console.log(data)
      localStorage.removeItem('id_token');
      window.location.assign('/regret');  
  }

  function toggleEditMode() {
    editMode ? setEditMode(false) : setEditMode(true);
    console.log(`editMode on: ${editMode}`);
  }

  const [ editMe ] = useMutation(EDIT_ME);

  // function handleToEdit() {
  //   console.log(data)

  //   const { data } = editMe({
  //     variables: {

  //     }
  //   })
  // }
  
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
                    {editMode ? (
                      <input type="text" id='firstName' value={profile.firstName} onChange={(e) => console.log(e.target.value)}>
                      </input>
                    ) : (
                      <MDBCardText className="text-muted">{profile.firstName}</MDBCardText>
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
                        <input type="text" id='lastName' value={profile.lastName} onChange={(e) => console.log(e.target.value)}>
                        </input>
                      ) : (
                        <MDBCardText className="text-muted">{profile.lastName}</MDBCardText>
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
                        <input type="text" id='email' value={profile.email} onChange={(e) => console.log(e.target.value)}>
                        </input>
                      ) : (
                        <MDBCardText className="text-muted">{profile.email}</MDBCardText>
                      )}
                  </MDBCol>
                </MDBRow>                
              </MDBCardBody>
            </MDBCard>
            <MDBRow>
              <MDBCol sm="1">
                <Button onClick={() => toggleEditMode()}>Edit</Button> 
              </MDBCol>
              <MDBCol sm="1">
                <Button onClick={() => toggleEditMode()}>Save</Button> 
              </MDBCol>
              <MDBCol sm="1">
                <Button                       
                  className="btn-danger"
                  onClick={() => {handleToDelete(id)}}>Delete</Button> 
                {/* <DeleteUser /> */}
              </MDBCol>
            </MDBRow>   
          </MDBCol>
        </MDBRow>
      </MDBContainer>      
    </section>
    ) : null}
    </>
  );
}