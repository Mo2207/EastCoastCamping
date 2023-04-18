import React, { useState } from 'react';
import { 
    Container,
    Row,
    Col,
    Card,
    Button
  } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css'
import { Link, useLocation } from 'react-router-dom';
import { QUERY_CAMPGROUNDBYLOCATION } from '../utils/queries';
import { useLazyQuery } from '@apollo/client';
import Footer from '../components/Footer';
import AllCamps from '../components/Homepage/Allcamps';
import StarRating from "../components/StarRating";

function SearchResult() {
    const Start =(j)=>{
        return <StarRating rating={j}/>;
    }
    const [destination, setDestination] = useState('');
    const [searchCampgrounds, { loading, error, data }] = useLazyQuery(QUERY_CAMPGROUNDBYLOCATION);    

    const location = useLocation();
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!destination) {
            return false;
        }

        // Update URL with query parameter when form is submitted
        window.location.href = `/search?destination=${destination}`;
    }

    // Retrieve destination value from URL query parameter on initial render
    // [] will run only once
    React.useEffect(() => {
        // create new object from 'location.search' that contain param from URL
        const searchParams = new URLSearchParams(location.search);
        // to retrieve the value of destination
        const locationParam = searchParams.get('destination');
        if (locationParam) {
            setDestination(locationParam);
            searchCampgrounds({ variables: { location: locationParam } });
        }// eslint-disable-next-line
    }, []);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;
    return (
        <>
            {/* ------------------dropdown for search campground-------------------- */}
            <Card className='m-2'>
                <Card.Body className='d-flex align-items-center searchBar '>
                    <form onSubmit={handleSubmit}>
                        <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                            <option value="">Please select your prefer location from the list</option>
                            <option value="Fredericton">Fredericton</option>
                            <option value="Saint John">Saint John</option>
                            <option value="Moncton">Moncton</option>
                            <option value="Sussex">Sussex</option>
                            <option value="Minto">Minto</option>
                            <option value="Edmundston">Edmundston</option>
                            <option value="Shediac">Shediac</option>
                            <option value="All">Search All</option>
                        </select>
                        <button className='btn mt-3 m' style={{ background: '#ADFB2F' }} type="submit">Search</button>
                    </form>
                </Card.Body>
            </Card>

            <div style={{ minHeight: '100vh' }}>
                {!data || !data.campByLocation || data.campByLocation.length === 0 ? (
                    <Card className='m-2'>
                        <Card.Body>
                            <Card.Text>
                                <header className='text-black '>All Camps</header>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ) : null}

                {!data || !data.campByLocation || data.campByLocation.length === 0 ? (
                    <AllCamps />
                ) : null}

                {data && data.campByLocation && data.campByLocation.length > 0 && (
                    <Card className='m-2'>
                        <Card.Body>
                            <Card.Text>
                                <header className='text-black p-1 m-1'>Available Campsites</header>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )}

                <Container>
                    <Row >
                        <Col >
                            <Row xs={1} md={3}>
                                {data &&
                                    data.campByLocation &&
                                    data.campByLocation.map((campground, idx) => (
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
                    </Row>
                </Container>
            </div >
            <Footer />
        </>
    );
}

export default SearchResult;