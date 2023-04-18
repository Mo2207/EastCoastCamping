import React from 'react';
import Card from 'react-bootstrap/Card'; //react-bootstrap
import Container from 'react-bootstrap/Container';
import '../styles/Home.css'
import 'react-datepicker/dist/react-datepicker.css' //date-picker css
import GifComponent from '../components/Homepage/Gifcomponent';
import Iconscomponent from '../components/Homepage/Iconscomponent';
import CampsByLocation from '../components/Homepage/CampsByLocation';
import Footer from '../components/Footer';
import { Link } from "react-router-dom";


export default function Home() {

    return (
        <>
            <div className='bg-white'>
                <Card className='searchBar-Bg'>
                    <Container className='text-white p-5 mt-5'>
                        <h2 className='mb-4'>Welcome to EastCoastCamping</h2>
                        <p style={{ color: 'white' }}>Looking for a memorable camping experience? Look no further than EastCoastCamping, where we connect you with the best campsites and outdoor destinations. </p>
                        <Link to="/search">
                            <button className='btn' style={{ background: '#ADFB2F' }} >Search Now</button>
                        </Link>
                    </Container>
                </Card>
                <Container className='mt-5 text-center'>
                    <h2>Your One-Stop Destination for Booking Your Perfect Camping Adventure!</h2>
                    <p>  Whether you're a seasoned outdoor enthusiast or a first-time camper, our website makes it easy to plan and book your perfect camping trip. </p>
                    <p> Our user-friendly platform makes it easy to find and reserve the perfect campsite for your next outdoor adventure.</p>
                    <p>With EastCoastCamping, you can browse through a selection of coamgrounds, read review, and book your preferred campsite with just a few clicks,making planning your next camp</p>
                </Container>
                <Iconscomponent />
                <CampsByLocation />
                <hr />
                <Container >
                    <GifComponent />
                </Container>
                <Footer />
            </div>
        </>
    );
}
