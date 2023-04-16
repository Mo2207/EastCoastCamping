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
import { useLazyQuery, useQuery } from '@apollo/client';
import { QUERY_CAMPBYARRAY } from "../utils/queries";

export default function Favorite() {

  let id;
  if (Auth.loggedIn()) {
    id = localStorage.getItem('saved')
  };
  const { loading, data } = useQuery(QUERY_CAMPBYARRAY, {
    variables: { ids: id }
  });
  
  const profile = data?.getArrayOfCamps || {};

console.log(profile)





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
          <Button variant="primary" size="sm">Upcoming</Button>
        </a>
        <Tabs
          defaultActiveKey="favorite"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="upcoming" ></Tab>
          <Tab eventKey="completed"></Tab>
          <Tab eventKey="favorite">
            <>    
                <Container fluid>
                    <Row className="justify-content-center mb-0">
                        <Col md="12" xl="10">
                        <Card className="shadow-0 border rounded-3 mt-5 mb-3">
                            <Card.Body>
                            <Row>
                                <Col md="12" lg="3" className="mb-4 mb-lg-0">
                                    <Image
                                    src="https://images.unsplash.com/photo-1627664819818-e147d6221422?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1988&q=80"
                                    fluid
                                    className="w-100"
                                    />                      
                                </Col>
                                <Col md="6">
                                <Card.Title>Camper</Card.Title>
                                <Card.Subtitle>Location:</Card.Subtitle>
                                <hr/>
                                <Card.Text >
                                    There are many variations of passages of Lorem Ipsum 
                                    available, but the majority have suffered alteration in some
                                    form, by injected humour, or randomised words which don't
                                    look even slightly believable.
                                </Card.Text>
                                </Col>
                
                            </Row>
                            </Card.Body>
                            <Row>
                            <Col md="9" className="mb-1 ml-2"><p >{chaticon} Submit your review</p></Col>
                            <Col md="2" className="mb-1 ml-5">
                                <Button color="primary" size="sm">
                                    View Details
                                </Button>
                            </Col>
                        </Row>
                        </Card>
                        </Col>
                    </Row>                
                </Container>       
            </>
          </Tab>
        </Tabs>
      </div>
      <Footer />
    </>
  );
}
