import React from 'react';
import Card from 'react-bootstrap/Card'; //react-bootstrap
import CardGroup from 'react-bootstrap/CardGroup'; //react-bootstrap
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import '../styles/Home.css'






export default function Home() {

    return (
        <>
            <Card className='searchBar-Bg'>
                <Card.Body>
                    {/* <p>searchBar</p> */}
                </Card.Body>
            </Card>
            <Container className='mt-5 text-center'>
                <h2 className='mb-4'>Welcome to EastCoastCamping</h2>

                <p>Looking for a memorable camping experience? Look no further than EastCoastCamping, where we connect you with the best campsites and outdoor destinations. </p>
                <p>  Whether you're a seasoned outdoor enthusiast or a first-time camper, our website makes it easy to plan and book your perfect camping trip. </p>
                <p> Our user-friendly platform makes it easy to find and reserve the perfect campsite for your next outdoor adventure.
                </p>
            </Container>


        </>






    );
}
