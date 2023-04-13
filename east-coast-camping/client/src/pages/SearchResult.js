import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import { Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css' //date-picker css
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../styles/SearchResult.css'
import { Form } from 'react-bootstrap';



function SearchResult() {
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null)
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Destination:', destination);
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
    };

    return (
        <>

            <Card fluid>
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
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <Col>
                                    <Card>
                                        <Link to={`/campground`}>
                                            <Card.Img variant="top" src="https://user-images.githubusercontent.com/112873819/231262296-5bbbe70c-886e-4501-ab8c-df9403029aa3.jpg" />
                                        </Link>
                                        <Card.Body>
                                            <Card.Title>Card 1</Card.Title>
                                            <Card.Text>
                                                This is a longer card with supporting text below as a natural
                                                lead-in to additional content. This content is a little bit
                                                longer.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col className='ml-5 '>
                        <Form className='d-flex flex-column searchResult' onSubmit={handleSubmit}>
                            <Form.Label>Search destination</Form.Label>
                            <Form.Control type="text" placeholder={location.state.search} value={destination} onChange={(e) => setDestination(e.target.value)} className='searchInput' />
                            <Form.Label>Check in</Form.Label>
                            <DatePicker className='searchInput' placeholderText={location.state.date1} selected={startDate} onChange={date => setStartDate(date)} />
                            <Form.Label>Check out</Form.Label>
                            <DatePicker className='searchInput' placeholderText={location.state.date2} selected={endDate} onChange={date => setEndDate(date)} />
                            <Button type="submit" style={{ backgroundColor: '#ADFB2F', border: 'none', color: 'black', width: '120px', marginLeft: '60px' }}>Search</Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </>
    );
}

export default SearchResult;