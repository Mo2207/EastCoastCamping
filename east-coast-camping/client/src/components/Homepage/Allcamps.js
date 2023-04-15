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
                    <Row xs={1} md={3} className="g-4">
                        {data &&
                            data.allCamps &&
                            data.allCamps.map((campground, idx) => (
                                <Col key={idx}>
                                    <Card style={{ marginBottom: '200px', width: '25rem', minHeight: '450px', margin: '50px' }}>
                                        {/* Pass the campground information as query parameters in the URL */}

                                        <Card.Img
                                            variant="top"
                                            src={campground.image}
                                        />

                                        <Card.Body>
                                            <Card.Title>{campground.name}</Card.Title>
                                            <Card.Text>
                                                Location: {campground.location}<br />
                                                Price: {campground.price}
                                            </Card.Text>
                                        </Card.Body>
                                        <div className='d-flex justify-content-end btn'>
                                            <Link to={`/campground/${campground._id}?name=${campground.name}`}>
                                                <button className='btn' style={{ backgroundColor: '#ADFB2F' }}>View Details</button>
                                            </Link>
                                        </div>
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
