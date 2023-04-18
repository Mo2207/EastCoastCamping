import React from "react";
import { useQuery } from "@apollo/client";
import { Container, Row, Col, Card, Button, CardGroup } from "react-bootstrap";
import { QUERY_ALLCAMPS } from "../../utils/queries";

const CampsByLocation = () => {
    const { loading, error, data } = useQuery(QUERY_ALLCAMPS);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    // used new Set to removes duplicate location
    const availableLocations = [...new Set(data.allCamps.map(camp => camp.location))];

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
                        {availableLocations.map((location, index) => (
                            <Button key={index} className="btn btn-light m-4" onClick={() => handleLocationSelection(location)}>
                                <Card className='m-3 border-0 d-flex align-items-center'>
                                    <Card.Img style={{ width: '10rem' }} variant="top" src="https://user-images.githubusercontent.com/112873819/232092269-05ac1015-4674-454e-ba49-e6969a252085.png" />
                                    <Card.Body>
                                        <Card.Title className="text-black">{location}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Button>
                        ))}
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default CampsByLocation;
