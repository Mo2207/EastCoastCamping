import React from "react";
import { 
  Container,
  Row,
  Col,
  Card,
  Image,
  Form,
  Button,
  InputGroup,
  Dropdown,
  Tabs
} from 'react-bootstrap';
import "../../styles/Upcoming.css";
import greentick from "../images/greentick.png"
import reservation from '../images/reservation.png'
import creditcard from '../images/card.png'

function Profile() {

  return (
    <>
        <Container fluid>
            <Row className="justify-content-center">
                <Col md="12" xl="11">
                    <Card className="shadow-0 border rounded-3 mt-3 mb-3">
                        <Card.Body>
                            <Row>
                                <Col md="12" lg="4" className="mb-4 mb-lg-0">
                                    <Image
                                    src={reservation}
                                    fluid
                                    className="w-100"
                                    />                      
                                </Col>
                                <Col md="4" lg="4">
                                    <Row style={{ height:'50%', marginTop:30 }}>
                                        <Card.Title className="text-center" >Reservation Details</Card.Title>
                                        <Card.Subtitle>Name of Camp:</Card.Subtitle>
                                        <Card.Subtitle>Location:</Card.Subtitle>
                                        <Row className="text-center">
                                            <Col sm="5" className="ml-1"><Row><Card.Subtitle>Check-in</Card.Subtitle></Row><Row><Card.Text>{'startdate'}</Card.Text></Row></Col>
                                            <Col sm="5" className="ml-1"><Row><Card.Subtitle>Check-out</Card.Subtitle></Row><Row><Card.Text>{'enddate'}</Card.Text></Row></Col>
                                        </Row>
                                        <Card.Subtitle>Total Nights:</Card.Subtitle>
                                        <Card.Subtitle>Total Amounts: CAD $</Card.Subtitle>
                                    </Row>
                                    <br/>
                                    <Row style={{ height:'30%' }}>
                                        <Card.Title className="text-center">Personal info</Card.Title>
                                        <Card.Subtitle>Reservation Name</Card.Subtitle>
                                        <Card.Text>{'startdate'}</Card.Text>
                                        <Card.Subtitle>Email Address</Card.Subtitle>
                                        <Card.Text>{'startdate'}</Card.Text>
                                    </Row>
                                </Col>
                                <Col
                                md="6"
                                lg="3"
                                className="border-sm-start-none border-start"
                                >
                                <Row style={{ marginTop:30 , alignItems: 'center'}}>
                                    <Card.Title className="text-center" >Payment</Card.Title> 
                                    <Form>
                                        <Form.Text className="text-muted">PAYMENT METHOD</Form.Text>  
                                        <Form.Select className="mb-3" aria-label="Default select example">                                                                               
                                            <option value="1">Creditcard</option>
                                            <option value="2">Debitcard</option>
                                        </Form.Select>
                                        <Form.Text className="text-muted">CARD NUMBER</Form.Text> 
                                        <InputGroup className="mb-3">
                                        <Form.Control
                                            label="Card Number"
                                            id="form1"
                                            type="text"
                                            placeholder="1234 5678 1234 5678"
                                            wrapperClass="mb-3"
                                            />
                                        </InputGroup>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Row>
                                                <Col md='8'>
                                                    <Form.Control
                                                        placeholder="Card Holder"
                                                        aria-label="CARD HOLDER"
                                                        aria-describedby="basic-addon2"
                                                        />
                                                </Col>
                                                <Col md='4'>
                                                    <Form.Control
                                                        placeholder="05 19"
                                                        aria-label="EXP DATE"
                                                        aria-describedby="basic-addon2"
                                                        />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Form>
                                    <Row
                                    fluid
                                    style={{ marginBottom:'20px', alignItems:'center'}}>
                                    <Image src={creditcard}/>
                                    </Row>                                               
                                </Row>
                                    <Button variant="secondary">PAY & CONFIRM</Button>           
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>                
        </Container>    
    </>
  );
}

export default Profile;