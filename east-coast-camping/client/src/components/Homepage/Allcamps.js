import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALLCAMPS } from '../../utils/queries'
import { 
    Container,
    Row,
    Col,
    Card
  } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom';

const AllCamps = () => {
    //All camps query 
    const { loading, error, data } = useQuery(QUERY_ALLCAMPS);
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <Container>
            <Row >
                <Col >
                    <Row xs={1} md={4} className="g-4  d-flex justify-content-around"
                    >
                        {data &&
                            data.allCamps &&
                            data.allCamps.map((campground, idx) => (
                                <Col key={idx}
                                className="row d-flex flex-wrap justify-content-center mb-3"
                                style={{ marginRight: '15px' }}>
                                       
                                <Card className="card" style={{ minWidth: '19rem', minHeight: '450px', margin: '20px' }}>
                                  <Card.Img
                                    variant="top"
                                    src={campground.image}
                                    alt={campground.name}
                                    style={{ marginTop: '10px' }}
                                  />
                                  <Card.Body>
                                    <Card.Title>{campground.name}</Card.Title>
                                    <Card.Text>
                                      Location: {campground.location}<br />
                                      Price: {campground.price}
                                    </Card.Text>
                                  </Card.Body>
                                  <div className="d-flex justify-content-end btn">
                                    <Link to={`/campground/${campground._id}?name=${campground.name}`}>
                                      <button className="btn btn-primary">View Details</button>
                                    </Link>
                                  </div>
                                </Card>
                              </Col>                              
                            ))}
                    </Row>
                </Col>
            </Row >
        </Container >
    );
};

export default AllCamps;
