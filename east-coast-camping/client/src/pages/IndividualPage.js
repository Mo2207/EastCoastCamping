import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import '../styles/Individualpage.css'
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css' //date-picker css
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { SAVE_CAMP, CREATE_REVIEW } from '../utils/mutations';
import { QUERY_CAMPBYID, GET_CAMP_REVIEWS, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import Footer from '../components/Footer';
import Amenities from '../components/detailPage/Amenities';
import ReservationInfo from '../components/detailPage/ReservationInfo';

// Install Swiper modules
SwiperCore.use([Autoplay, Navigation, Pagination]);

function IndividualCampground() {
    // const [reviews, setReviews] = useState([
    //     { id: 1, author: 'John Doe', review: 'Great campground! Beautiful views and friendly staff.' },
    //     { id: 2, author: 'Jane Smith', review: 'Had an amazing time camping here. Facilities were clean and well-maintained.' },
    //     { id: 3, author: 'Mike Johnson', review: 'One of the best campgrounds I have been to. Highly recommended!' }
    // ]);

    // const [reviews, setReviews] = useState('');

    let id;
    if (Auth.loggedIn()) {
        id = Auth.getToken()
    };

    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const location = useLocation();

    const campgroundId = location.pathname.split('/').pop();


    // query individual camp reviews
    const { data: reviewData } = useQuery(GET_CAMP_REVIEWS, {
        variables: { campId: campgroundId }
    });

    const reviews = reviewData?.campReviews || [];
    // console.log(`CAMPREVIEWS: ${reviews}`)

    // query individual camp data
    const { loading, data } = useQuery(QUERY_CAMPBYID, {
        variables: { campById: campgroundId }

    })
    const campInfo = data?.campById || {};
    // console.log(campInfo)

    const handleBook = (e) => {
        e.preventDefault();
        // console.log('Destination:', destination);
        // console.log('Start Date:', startDate);
        // console.log('End Date:', endDate);

    };

    const [saveCamp] = useMutation(SAVE_CAMP);

    function handleSaveCamp(id, campgroundId) {
        const { savedData } = saveCamp({
            variables: { userId: id, campId: campgroundId }
        })


    }
    // function handleOpenReviewInput() {

    // }

    // const [ createReview ] = useMutation(CREATE_REVIEW)

    // function handleCreateReview(userId, campId, rating, text) {
    //     const { leaveReview } = createReview({
    //         variables: {
    //             user: userId,
    //             camp: campId,
    //             rating: rating,
    //             text: text
    //         }
    //     })
    // }

    return (
        <>
            {/*----------------------- camp images to display on page using swiper.js -------------------------------*/}
            <div className='100vh mt-3' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxHeight: '400px', maxWidth: '100%' }}>
                <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                    <Swiper
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        pagination={true}
                        style={{ maxWidth: '600px', margin: '0 auto' }}
                    >
                        {campInfo && campInfo.campImages && campInfo.campImages.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img src={image} alt={`Campground ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            {/*----------------------- camp images to display on page using swiper.js -------------------------------*/}


            {/*----------------------- camp info -------------------------------*/}
            <Row className='campInfo'>
                <h3> {campInfo.name}</h3>
                <h4 className='mt-2'>{campInfo.location}</h4>
                <p className='text-secondary'>${campInfo.price} | 2-6 persons | 30m2</p>
                <p className='mt-3'>
                    {/* display campground info */}
                    Welcome to {campInfo.name} .Located in the heart of nature, our campground offers a serene and peaceful escape from the hustle and bustle of everyday life. With stunning views of the surrounding mountains and a variety of recreational activities, you're sure to have an unforgettable camping experience.
                </p>
            </Row>
            {/*----------------------- camp info -------------------------------*/}


            {/*----------------------- Amenities -------------------------------*/}
            <Amenities />
            {/*----------------------- Amenities -------------------------------*/}



            <Container className='mt-5'>
                {/*----------------------- Reservation info -------------------------------*/}
                <ReservationInfo />
                {/*----------------------- Reservation info -------------------------------*/}


                {/*----------------------- calendar to pick the dates (Datepicker) -------------------------------*/}
                <h4>Please select the date</h4>

                <Form onSubmit={handleBook} className='individualSearch'>
                    <Row>
                        <Col>
                            <Form.Label>Check in</Form.Label>
                            <DatePicker className='rounded' selected={startDate} placeholderText="Select check-in date" onChange={(date) => setStartDate(date)} />
                        </Col>
                        <Col>
                            <Form.Label>Check out</Form.Label>
                            <DatePicker className='rounded' selected={endDate} placeholderText="Select check-out date" onChange={(date) => setEndDate(date)} />
                        </Col>
                    </Row>
                    <Row className='mt-5'>
                        <Col>
                            <Button type="submit" className='btn btn-primary' style={{ border: 'none', color: 'white', maxHeight: '50px', marginLeft: '150px', width: '100px' }}>Book now</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => { handleSaveCamp(id, campgroundId) }} style={{ border: 'none', color: 'white', maxHeight: '50px', marginLeft: '150px' }}>Favorite</Button>
                        </Col>
                    </Row>
                </Form>

            </Container>
            {/*----------------------- calendar to pick the dates (Datepicker) -------------------------------*/}


            {/*----------------------- review section -------------------------------*/}
            <hr className='mx-5' />
            <Container className='mt-5'>
                <Row>
                    <Col>
                        <h4>Customer Reviews</h4>
                        {/* <button onClick={handleOpenReviewInput} style={{ border: 'none', color: 'grey', maxHeight: '50px', marginLeft: '150px' }}>
                            Leave a Review
                        </button> */}
                        {reviews.map(review => (
                            <div key={review.id} className='mt-3'>
                                <h4>{review.user.firstName} {review.user.lastName} {review.rating}</h4>
                                <p>{review.text}</p>
                            </div>
                        ))}
                    </Col>
                </Row>
                {/*----------------------- review section -------------------------------*/}
            </Container>
        </>
    )
};

export default IndividualCampground;