import React from "react";
import { 
  Container,
  Row,
  Col,
  Card,
  Image,
  Button,
  Navbar,
  TabPane,
  Tabs
} from 'react-bootstrap';
import "../styles/Upcoming.css";
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_CAMPBYID } from '../utils/queries';

const days = ( date1 , date2 ) => {
  let difference = date2.getTime() - date1.getTime();
  let total = Math.ceil( difference / (1000 * 3600 * 24))-1;
  return total;
}

export default function Upcoming() {
let id = '000000000000000000000012';
  const { loading, error, data } = useQuery(QUERY_CAMPBYID,{
    variables: { campId: id }
  })
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data)

  const chaticon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-square-text" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
</svg>;

  var date1 = new Date('4/23/2023');
  var date2 = new Date('4/28/2023');
  var totalNight = days(date1,date2);
  
  var shortMonthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format;
  // var shortMonth = shortMonthName(date); // "Jul"  

  var startdate = `${shortMonthName(date1)} ${date1.getDate()}, ${date1.getFullYear()}`;
  var enddate = `${shortMonthName(date2)} ${date2.getDate()}, ${date2.getFullYear()}`;
  var ratePerNight = 100;
  var totalAmount = ratePerNight * totalNight;



  return (
    <>
      <div className="container my-1" style={{ minHeight: '100vh' }}>
        <Navbar.Brand><h2>My Bookings</h2></Navbar.Brand>
        <a href="/myBookings">
          <Button variant="primary" size="sm">Upcoming</Button>
        </a>{" "}
        <a href="/completed">
          <Button variant="secondary" size="sm">Completed</Button>
        </a>{" "}
        <a href="/favorite">
          <Button variant="secondary" size="sm">Favorite Camps</Button>
        </a>
        <Tabs
          defaultActiveKey="upcoming"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <TabPane eventKey="upcoming">
            <>
              <Container fluid>
                <Row className="justify-content-center mb-0">
                  <Col md="12" xl="10">
                      <Card className="shadow-0 border rounded-3 mt-5 mb-3">
                        <Card.Body>
                          <Row>
                            <Col md="12" lg="3" className="mb-1 mb-lg-0">
                                <Image
                                  src={'campground.camp.image'}
                                  fluid
                                  className="w-100"
                                />                      
                            </Col>
                            <Col md="6">
                              <Card.Title>{'campground.camp.name'}</Card.Title>
                              <br/>
                              <Card.Subtitle>Booking ID: {'campground.bookingID'}</Card.Subtitle>
                              <br/>
                              <Card.Subtitle>Location:  {'campground.camp.location'}</Card.Subtitle>
                              <p>
                                There are many variations of passages of Lorem Ipsum 
                                available.
                              </p>
                            </Col>
                            <Col md="6" lg="3" className="border-sm-start-none border-start"
                            >
                              <Row>
                                <Col sm="5" className="ml-1"><Row>CHECK IN</Row><Row>{'campground.startDate'}</Row></Col>
                                <Col sm="5" className="ml-1"><Row>CHECK OUT</Row><Row>{'campground.endDate'}</Row></Col>
                              </Row>
                              <br/>
                              <div className="d-flex flex-row align-items-center mb-1">
                                <h4 className="mb-1 me-1">CAD $ {'campground.totalP'}</h4>                              
                              </div>
                              <h6 className="text-success">{'campground.totalN'} Nights </h6>

                            </Col>
                          </Row>
                        </Card.Body>
                        <Row>
                          <Col md="9" className="mb-1 ml-2"><Link style={{ textDecoration: 'none' }} to={`/review/${'campground._id'}?name=${'campground.name'}`}><p>{chaticon} Check Out Review</p></Link></Col>

                      </Row>
                      </Card>
                    </Col>
                </Row>                
              </Container> 
            </>
          </TabPane >
          <TabPane eventKey="completed"></TabPane >
          <TabPane eventKey="favorite"></TabPane >
        </Tabs>
      </div>
      <Footer />
    </>
  );
}
