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



function SearchResult() {
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null)
    const location = useLocation();

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
                        <form className='d-flex flex-column  searchBarPage'>
                            <label> Search destination<br></br>
                                <input type="text" placeholder={location.state.search} className='searchInput' value={destination} onChange={(e) => setDestination(e.target.value)} />
                            </label>
                            <label> Check in
                                <DatePicker className='searchInput' placeholderText={location.state.date1} selected={startDate} onChange={date => setStartDate(date)} />
                            </label>
                            <label> Check out
                                <DatePicker className='searchInput' placeholderText={location.state.date2} selected={endDate} onChange={date => setEndDate(date)} />
                            </label>
                            <Button style={{ backgroundColor: '#ADFB2F', border: 'none', color: 'black', width: '120px', marginLeft: '60px' }} >Search</Button>

                        </ form>
                    </Col>
                </Row>

            </Container>
        </>
    );
}

export default SearchResult;