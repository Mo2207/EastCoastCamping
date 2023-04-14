import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALLCAMPS } from '../../utils/queries'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import { Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const AllCamps = () => {
    const { loading, error, data } = useQuery(QUERY_ALLCAMPS);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Row xs={1} md={2} className="g-4">
                        {data &&
                            data.allCamps &&
                            data.allCamps.map((campground, idx) => (
                                <Col key={idx}>
                                    <Card>
                                        {/* Pass the campground information as query parameters in the URL */}
                                        <Link
                                            to={`/campground/${campground._id}?name=${campground.name}&availability=${campground.availability}&available=${campground.available}`}
                                        >
                                            View Details
                                            <Card.Img
                                                variant="top"
                                                src="https://user-images.githubusercontent.com/112873819/231262296-5bbbe70c-886e-4501-ab8c-df9403029aa3.jpg"
                                            />
                                        </Link>
                                        <Card.Body>
                                            <Card.Title>{campground.name}</Card.Title>
                                            <Card.Text>
                                                Location: {campground.availability}<br />
                                                Price: {campground.available ? "Yes" : "No"}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                    </Row>
                </Col>
            </Row>
        </Container>


    );
};

export default AllCamps;
