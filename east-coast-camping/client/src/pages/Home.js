import React from 'react';
import Card from 'react-bootstrap/Card'; //react-bootstrap
import CardGroup from 'react-bootstrap/CardGroup'; //react-bootstrap
import Container from 'react-bootstrap/Container';
import '../styles/Home.css'
import 'react-datepicker/dist/react-datepicker.css' //date-picker css
import Button from 'react-bootstrap/Button';
import GifComponent from '../components/Homepage/Gifcomponent';
import Iconscomponent from '../components/Homepage/Iconscomponent';
import Footer from '../components/Homepage/Footer';
import AllCamps from '../components/Homepage/Allcamps';
import CampsByLocation from '../components/Homepage/CampsByLocation';






export default function Home() {

    return (
        <>
            <div className='bg-white'>
                <Container className='mt-5 text-center'>
                    <h2 className='mb-4'>Welcome to EastCoastCamping</h2>

                    <p>Looking for a memorable camping experience? Look no further than EastCoastCamping, where we connect you with the best campsites and outdoor destinations. </p>
                    <p>  Whether you're a seasoned outdoor enthusiast or a first-time camper, our website makes it easy to plan and book your perfect camping trip. </p>
                    <p> Our user-friendly platform makes it easy to find and reserve the perfect campsite for your next outdoor adventure.</p>
                </Container>

                <Iconscomponent />

                <Container >
                    <GifComponent />
                </Container>

                <CampsByLocation />
                <Footer />
            </div>
        </>






    );
}
