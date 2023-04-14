import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css'
import { Link, useLocation } from 'react-router-dom';
import { QUERY_CAMPGROUNDBYLOCATION } from '../utils/queries';
import { useLazyQuery } from '@apollo/client';

function SearchResult() {
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
        }
    }, []);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>{error.message}</p>;

    console.log(data);
    // console.log(data.CampByLocation)

    return (
        <>
            <Card>
                <Card.Body className='d-flex align-items-center searchBar '>
                    <form onSubmit={handleSubmit}>
                        <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                            <option value="">Please select your prefer location from the list</option>
                            <option value="Fredericton">Fredericton</option>
                            <option value="Saint John">Saint John</option>
                            <option value="Moncton">Moncton</option>
                            <option value="Sussex">Sussex</option>
                        </select>
                        <button type="submit">Search</button>
                    </form>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <Card.Text>
                        <header className='text-black p-5 '>Available Campsites</header>
                    </Card.Text>
                </Card.Body>
            </Card>

            <Container>
                <Row>
                    <Col>
                        <Row xs={1} md={2} className="g-4">
                            {data &&
                                data.campByLocation &&
                                data.campByLocation.map((campground, idx) => (
                                    <Col key={idx}>
                                        <Card>
                                            {/* Pass the campground information as query parameters in the URL */}
                                            <Link to={`/campground/${campground._id}?name=${campground.name}&location=${campground.location}&price=${campground.price}`}>
                                                View Details
                                                <Card.Img
                                                    variant="top"
                                                    src="https://user-images.githubusercontent.com/112873819/231262296-5bbbe70c-886e-4501-ab8c-df9403029aa3.jpg"
                                                />
                                            </Link>
                                            <Card.Body>
                                                <Card.Title>{campground.name}</Card.Title>
                                                <Card.Text>
                                                    Location: {campground.location}<br />
                                                    Price: {campground.price}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default SearchResult;
