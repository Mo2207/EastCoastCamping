import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card'; //react-bootstrap
import CardGroup from 'react-bootstrap/CardGroup'; //react-bootstrap
// import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import '../styles/Home.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css' //date-picker css
import Button from 'react-bootstrap/Button';
import GifComponent from '../components/Gifcomponent';
import Iconscomponent from '../components/Iconscomponent';






export default function Home() {

    // const [destination, setDestination] = useState('');
    // const [startDate, setStartDate] = useState(null);
    // const [endDate, setEndDate] = useState(null)

    // const navigate = useNavigate();
    // const toSearchResult = () => {
    //     if (destination || startDate || endDate) {
    //         const start = `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`
    //         const end = `${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`
    //         navigate('/search', { state: { search: destination, date1: start, date2: end } });
    //     } else {
    //         navigate('/search');
    //     }
    // }

    // const { loading, error, data } = useQuery(QUERY_CAMPGROUNDBYLOCATION, {
    //     variables: { location: destination },
    // })

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>{error.message}</p>



    return (
        <>
            <div className='bg-white'>
                <Card className='searchBar-Bg'>
                    {/* <Card.Body className='d-flex align-items-center searchBar '>
                        <label >
                            <input type="text" placeholder='Search destinations' className='searchInput' value={destination} onChange={(e) => setDestination(e.target.value)} />
                        </label>
                        <label>
                            <DatePicker className='searchInput' placeholderText='check in' selected={startDate} onChange={date => setStartDate(date)} />
                        </label>
                        <label>
                            <DatePicker className='searchInput' placeholderText='check out' selected={endDate} onChange={date => setEndDate(date)} />
                        </label>
                        <Button onClick={() => { toSearchResult() }} style={{ backgroundColor: '#ADFB2F', border: 'none', color: 'black', width: '120px' }} >Search</Button>

                    </Card.Body> */}

                </Card>
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
            </div>
        </>






    );
}
