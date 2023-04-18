import React from "react";
import { 
  Container,
  Row,
  Col,
  Card,
  Image,
  Button,
  Navbar,
  Tab,
  Tabs
} from 'react-bootstrap';
import "../styles/Upcoming.css";
import Footer from '../components/Footer';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_BOOKING_SAVED } from "../utils/queries";
import { DELETE_CAMP } from '../utils/mutations'
import { Link } from 'react-router-dom';

export default function Favorite() {
  let id;
  var profile;
// Grab User ID from Local Stroage and retreive data from server
  if(Auth.loggedIn()){
    id = localStorage.getItem('id_token');
  }
  
  const [deleteSaved, { loading1, error1, data1}] = useMutation(DELETE_CAMP);


  const { loading, error, data } = useQuery(GET_USER_BOOKING_SAVED, {
    variables: { userId: id }
  });

  
  

  try {
    profile = data?.getCampsAndBookingByUserId.savedCamps || {};   
  } catch(err){
    console.log(err)
  }
    // Delete Favorite    

    function handleToDelete(deleteUserId, camp) {
      deleteSaved({
        variables: { userId: deleteUserId, campId: camp}        
      })
      Auth.reload();
    }
  // console.log(profile);

  const chaticon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-square-text" viewBox="0 0 16 16">
    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
  </svg>;


    return (
      <>
        <div className="container my-1" style={{ minHeight: '100vh' }}>
          <Navbar.Brand><h2>My Bookings</h2></Navbar.Brand>
          <a href="/myBookings">
            <Button variant="secondary" size="sm">Upcoming</Button>
          </a>{" "}
          <a href="/completed">
            <Button variant="secondary" size="sm">Completed</Button>
          </a>{" "}
          <a href="/favorite">
            <Button variant="primary" size="sm">Favorite Camps</Button>
          </a>
          <Tabs
            defaultActiveKey="favorite"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="upcoming" ></Tab>
            <Tab eventKey="completed"></Tab>
            <Tab eventKey="favorite">
              {profile.length ? (
              <>    
                <Container fluid>
                    <Row className="justify-content-center mb-0">
                    {profile.map((campground, idx) => (
                      <Col key={idx} md="12" xl="5">
                        <Card className="shadow-0 border rounded-3 mt-5 mb-1">
                          <Card.Body>
                            <Row>
                              <Col md="12" lg="6" className="mb-4 mb-lg-0">
                                <Image
                                src={campground.image}
                                fluid
                                className="w-100"
                              />                    
                              </Col>                                
                              <Col md="6">
                                <Card.Title>{campground.name}</Card.Title>
                                <hr/>
                                <Card.Subtitle><strong>Location: </strong>{campground.location}</Card.Subtitle>
                                <br/>
                                <Card.Subtitle><strong>Features: </strong>{campground.features}</Card.Subtitle>
                                <br/>
                                <Card.Subtitle><strong>Price: </strong>CAD$ {campground.price}</Card.Subtitle>                              
                              </Col>                
                            </Row>
                            <Row>
                              <Col xs={9}><Link style={{ textDecoration: 'none' }} to={`/review/${campground._id}?name=${campground.name}`}><p>{chaticon} Submit your review</p></Link></Col> 

                            </Row>
                            <Row >
                              <Col className="d-flex justify-content-start">
                              <Button href={`/campground/${campground._id}?name=${campground.name}`} variant="primary" size="sm">View Details</Button>
                              </Col>
                              <Col className="d-flex justify-content-end">                          
                                <Button                       
                                  className="btn-danger"
                                  onClick={() => {handleToDelete(id, campground._id)}}
                                  size="sm"
                                  >Remove</Button> 
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                    </Row>                
                </Container>       
              </>
              ):(
              <>    
                <Container fluid>
                    <Row className="justify-content-center mb-0  align-middle">
                      <Card.Title>Oh! You have no favorite camp yet. Please see in our Search Campground. We hope you will like that.</Card.Title>
                    </Row>                
                </Container>       
              </>
              )}
            </Tab>
          </Tabs>
        </div>
        <Footer />
      </>
    );    
} 