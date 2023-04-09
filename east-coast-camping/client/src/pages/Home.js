import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'; //react-bootstrap
import CardGroup from 'react-bootstrap/CardGroup'; //react-bootstrap
// import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import '../styles/Home.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css' //date-picker css
import Button from 'react-bootstrap/Button';

// const SearchCampsite = () => {









export default function Home() {
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null)
    return (
        <>
            <Card className='searchBar-Bg'>

                <Card.Body className='d-flex align-items-center searchBar '>
                    <label >
                        <input type="text" placeholder='Search destinations' className='searchInput' value={destination} onChange={(e) => setDestination(e.target.value)} />
                    </label>
                    <label>
                        <DatePicker className='searchInput' placeholderText='pick date' selected={startDate} onChange={date => setStartDate(date)} />
                    </label>
                    <label>
                        <DatePicker className='searchInput' placeholderText='pick date' selected={endDate} onChange={date => setEndDate(date)} />
                    </label>
                    <Button style={{ backgroundColor: '#ADFB2F', border: 'none', color: 'black', width: '120px' }} >Search</Button>

                </Card.Body>

            </Card>
            <Container className='mt-5 text-center'>
                <h2 className='mb-4'>Welcome to EastCoastCamping</h2>

                <p>Looking for a memorable camping experience? Look no further than EastCoastCamping, where we connect you with the best campsites and outdoor destinations. </p>
                <p>  Whether you're a seasoned outdoor enthusiast or a first-time camper, our website makes it easy to plan and book your perfect camping trip. </p>
                <p> Our user-friendly platform makes it easy to find and reserve the perfect campsite for your next outdoor adventure.</p>
            </Container>

            <CardGroup className='m-5'>
                <Card className='m-3 border-0 d-flex align-items-center'>
                    <Card.Img className='campIcons mb-3' variant="top" src="https://user-images.githubusercontent.com/112873819/230719877-0c465703-ca37-4dfb-aa15-a6b686b68bef.jpeg" />
                    <Card.Body>
                        <Card.Title>Glamping Sites</Card.Title>
                    </Card.Body>
                </Card>

                <Card className='m-3 border-0 d-flex align-items-center'>
                    <Card.Img className='campIcons mb-3' variant="top" src="https://user-images.githubusercontent.com/112873819/230719242-6311a995-9ac6-4008-93a0-369ead1a7f11.png" />
                    <Card.Body>
                        <Card.Title>Cabin Houses</Card.Title>
                    </Card.Body>
                </Card>

                <Card className='m-3 border-0 d-flex align-items-center'>
                    <Card.Img className='campIcons mb-3' variant="top" src="https://user-images.githubusercontent.com/112873819/230719243-c67856bd-8a2f-4469-9862-622474a90ad1.png" />
                    <Card.Body>
                        <Card.Title>Tent Sites</Card.Title>
                    </Card.Body>
                </Card>

                <Card className='m-3 border-0 d-flex align-items-center'>
                    <Card.Img className='campIcons mb-3' variant="top" src="https://user-images.githubusercontent.com/112873819/230719245-96bbcda8-99d9-4bd7-8e4e-0ec835ba46d5.png" />
                    <Card.Body>
                        <Card.Title>Caravan Sites</Card.Title>
                    </Card.Body>
                </Card>

                <Card className='m-3 border-0 d-flex align-items-center'>
                    <Card.Img className='campIcons mb-3' variant="top" src="https://user-images.githubusercontent.com/112873819/230719246-30b5f8ce-1815-4375-a6ae-12d982ce2691.png" />
                    <Card.Body>
                        <Card.Title>Camper Sites</Card.Title>
                    </Card.Body>
                </Card>

            </CardGroup>

        </>






    );
}
