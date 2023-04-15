import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, CardGroup } from "react-bootstrap";

const CampsByLocation = () => {

    // Function to handle location selection
    const handleLocationSelection = (destination) => {
        // Navigate to search result page with selected location as a parameter
        window.location.href = `/search?destination=${destination}`;
    };

    return (
        <Container>
            <h2 className="text-center">Find your next getaway</h2>
            <Row>
                <Col>
                    <CardGroup className="d-flex flex-wrap justify-content-center mb-5">
                        <Button className="btn btn-light m-4" onClick={() => handleLocationSelection("Sussex")}>
                            <Card className='m-3 border-0 d-flex align-items-center'>
                                <Card.Img style={{ width: '10rem' }} variant="top" src="https://user-images.githubusercontent.com/112873819/232092269-05ac1015-4674-454e-ba49-e6969a252085.png" />
                                <Card.Body>
                                    <Card.Title className="text-black">Sussex</Card.Title>
                                </Card.Body>
                            </Card></Button>
                        <Button className="btn btn-light m-4" onClick={() => handleLocationSelection("Moncton")}>
                            <Card className='m-3 border-0 d-flex align-items-center'>
                                <Card.Img style={{ width: '10rem' }} variant="top" src="https://user-images.githubusercontent.com/112873819/232092269-05ac1015-4674-454e-ba49-e6969a252085.png" />
                                <Card.Body>
                                    <Card.Title>Moncton</Card.Title>
                                </Card.Body>
                            </Card></Button>
                        <Button className="btn btn-light m-4" onClick={() => handleLocationSelection("Saint John")}>
                            <Card className='m-3 border-0 d-flex align-items-center'>
                                <Card.Img style={{ width: '10rem' }} variant="top" src="https://user-images.githubusercontent.com/112873819/232092269-05ac1015-4674-454e-ba49-e6969a252085.png" />
                                <Card.Body>
                                    <Card.Title>Saint John</Card.Title>
                                </Card.Body>
                            </Card></Button>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default CampsByLocation;
