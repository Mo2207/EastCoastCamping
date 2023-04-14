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
            <Row>
                <Col>
                    <CardGroup>
                        {/* Add buttons or links for each location */}
                        <Button onClick={() => handleLocationSelection("Sussex")}>
                            <Card className='m-3 border-0 d-flex align-items-center'>
                                <Card.Img className='campIcons mb-3' variant="top" src="https://user-images.githubusercontent.com/112873819/232092269-05ac1015-4674-454e-ba49-e6969a252085.png" />
                                <Card.Body>
                                    <Card.Title>Caravan Sites</Card.Title>
                                </Card.Body>
                            </Card>    Sussex</Button>
                        <Button onClick={() => handleLocationSelection("Moncton")}>
                            <Card className='m-3 border-0 d-flex align-items-center'>
                                <Card.Img className='campIcons mb-3' variant="top" src="https://user-images.githubusercontent.com/112873819/232092269-05ac1015-4674-454e-ba49-e6969a252085.png" />
                                <Card.Body>
                                    <Card.Title>Caravan Sites</Card.Title>
                                </Card.Body>
                            </Card> Moncton</Button>
                        <Button onClick={() => handleLocationSelection("Saint John")}>
                            <Card className='m-3 border-0 d-flex align-items-center'>
                                <Card.Img className='campIcons mb-3' variant="top" src="https://user-images.githubusercontent.com/112873819/232092269-05ac1015-4674-454e-ba49-e6969a252085.png" />
                                <Card.Body>
                                    <Card.Title>Caravan Sites</Card.Title>
                                </Card.Body>
                            </Card> Saint John</Button>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default CampsByLocation;
