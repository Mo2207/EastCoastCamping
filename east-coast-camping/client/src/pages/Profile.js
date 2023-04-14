import React from 'react';
// import { Navigate, useParams, useResolvedPath } from 'react-router-dom';
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
import { DELETE_USER } from '../utils/mutations';
import NoMatch from './NoMatch';


export default function Profile() {

  let id;
  if(Auth.loggedIn()){
    id = Auth.getToken()
  };

  console.log(id)
  const user = "data";
  const { loading, data } = useQuery(QUERY_ME, {
    variables: { userByIdId:id }
  });
console.log(data)
  const profile = data?.userById || {};
  

  
  return (
    <>
    {Auth.loggedIn ? (
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
                    <MDBCardText className="text-muted">{profile.firstName}</MDBCardText>
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
              <MDBCol sm="1">
                <Button>Save</Button> 
              </MDBCol>
              <MDBCol sm="1">
                <Button                       
                  className="btn-danger"
                  onClick={() => ''}>Delete</Button> 
              </MDBCol>
            </MDBRow>   
          </MDBCol>
        </MDBRow>
      </MDBContainer>      
    </section>
    ) : (<NoMatch />)}
    </>
  );
}