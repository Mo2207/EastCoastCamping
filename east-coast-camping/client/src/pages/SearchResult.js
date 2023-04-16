import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css'
import { Link, useLocation } from 'react-router-dom';
import { QUERY_CAMPGROUNDBYLOCATION, QUERY_ALLCAMPS } from '../utils/queries';
import { useLazyQuery, useQuery } from '@apollo/client';
import Footer from '../components/Footer';
import AllCamps from '../components/Homepage/Allcamps';

function SearchResult() {
    const [destination, setDestination] = useState('');
    const [searchCampgrounds, { loading, error, data }] = useLazyQuery(QUERY_CAMPGROUNDBYLOCATION);
    const allCampsData = useQuery(QUERY_ALLCAMPS);

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

    return (
        <>
            {/* ------------------dropdown for search campground-------------------- */}
            <Card>
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
                            <option value="Miramichi">Miramichi</option>
                        </select>
                        <button type="submit">Search</button>
                    </form>
                </Card.Body>
            </Card>
            
            <div style={{ minHeight: '100vh' }}>
                {!data || !data.campByLocation || data.campByLocation.length === 0 ? (
                    <Card>
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
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                <header className='text-black p-5 '>Available Campsites</header>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )}

                <Container>
                    <Row >
                        <Col >
                            <Row xs={1} md={3} className="g-4 ">
                                {data &&
                                    data.campByLocation &&
                                    data.campByLocation.map((campground, idx) => (
                                        <Col className='p-2' key={idx}>
                                            <Card style={{ marginBottom: '200px', width: '25rem', minHeight: '450px', margin: '50px' }}>
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
            </div >
            <Footer />
        </>
    );
}

export default SearchResult;