import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALLCAMPS } from '../../utils/queries'
import { 
    Container,
    Row,
    Col,
    Card,
    Button
  } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom';
import StarRating from "../StarRating";

const AllCamps = () => {
  const Start =(j)=>{
    return <StarRating rating={j}/>;
}
    //All camps query 
    const { loading, error, data } = useQuery(QUERY_ALLCAMPS);
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }
    // console.log(data)

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
                                       
                                <Card className="card d-grid gap-2" style={{ minWidth: '19rem', minHeight: '450px', margin: '20px' }}>
                                  <Card.Img
                                    variant="top"
                                    src={campground.image}
                                    alt={campground.name}
                                    style={{ marginTop: '10px' }}
                                  />
                                  <Card.Body>
                                    <Card.Title>{campground.name}</Card.Title>
                                    <Card.Text>
                                              <strong>Location: </strong>{campground.location}<br />
                                              <strong>Price: </strong>{campground.price}<br/>
                                              {/* <strong>Rating: </strong>{Start(campground.reviews[0].rating)}<br />
                                              <strong>Review: </strong>{campground.reviews[0].text}<br /> */}
                                    </Card.Text>
                                  </Card.Body>
                                  <Row className="d-flex justify-content-between">
                                    <Col className="btn">
                                      <Button href={`/review/${campground._id}?name=${campground.name}`} variant="primary" size="sm">Review</Button>
                                    </Col>
                                    <Col className="btn">
                                      <Button href={`/campground/${campground._id}?name=${campground.name}`} variant="primary" size="sm">View Details</Button>
                                    </Col>
                                  </Row>
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
