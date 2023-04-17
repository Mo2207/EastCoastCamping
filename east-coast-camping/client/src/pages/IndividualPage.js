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



            <Row className='campInfo'>
                <h3> {campInfo.name}</h3>
                <h4 className='mt-2'>{campInfo.location}</h4>
                <p className='text-secondary'>${campInfo.price} | 2-6 persons | 30m2</p>
                <p className='mt-3'>
                    {/* display campground info */}
                    Welcome to {campInfo.name} .Located in the heart of nature, our campground offers a serene and peaceful escape from the hustle and bustle of everyday life. With stunning views of the surrounding mountains and a variety of recreational activities, you're sure to have an unforgettable camping experience.
                </p>
            </Row>
            <Container className='mt-5'>
                <Row>
                    <Col className='border-end mr-4'>
                        <h4 className='mb-4 pl-5'>Amenities</h4>

                        <Row>
                            <Col>
                                <p><img
                                    src="https://user-images.githubusercontent.com/112873819/232451209-595962db-d967-4f1e-991e-e855fe36eb11.png"
                                    width="25"
                                    height="25"
                                    className="d-inline-block align-top mr-2 mt-2"
                                    alt="icon"
                                />
                                    Double-bed</p>

                                <p><img
                                    src="https://user-images.githubusercontent.com/112873819/232452753-e2029afc-32d2-409b-be82-d9fe88677f70.png"
                                    width="25"
                                    height="25"
                                    className="d-inline-block align-top mr-2 mt-2"
                                    alt="icon"
                                />
                                    Picnic tables</p>
                                <p><img
                                    src="https://user-images.githubusercontent.com/112873819/232453013-b68155c1-847f-46de-bf9e-eb983e303489.png"
                                    width="25"
                                    height="25"
                                    className="d-inline-block align-top mr-2 mt-2"
                                    alt="icon"
                                />
                                    Air conditioner</p>

                                <p><img
                                    src="https://user-images.githubusercontent.com/112873819/232453323-6b50670e-d1bf-4b44-9b3e-bf8a2ce55005.png"
                                    width="25"
                                    height="25"
                                    className="d-inline-block align-top mr-2 mt-2"
                                    alt="icon"
                                />
                                    Fire pit</p>
                                <p><img
                                    src="https://user-images.githubusercontent.com/112873819/232456727-f0721b53-9a25-47b0-861a-4c62159f8a57.jpg"
                                    width="25"
                                    height="25"
                                    className="d-inline-block align-top mr-2 mt-2"
                                    alt="icon"
                                />
                                    Bicycle on request</p>
                            </Col>
                            <Col>
                                <p><img
                                    src="https://user-images.githubusercontent.com/112873819/232453629-676c5e63-2459-4b92-a16c-315d3b7e7179.png"
                                    width="25"
                                    height="25"
                                    className="d-inline-block align-top mr-2 mt-2"
                                    alt="icon"
                                />
                                    Fishing</p>

                                <p><img
                                    src="https://user-images.githubusercontent.com/112873819/232453648-f26415d1-b86b-4e91-9fcf-43a8c198e09c.png"
                                    width="25"
                                    height="25"
                                    className="d-inline-block align-top mr-2 mt-2"
                                    alt="icon"
                                />
                                    Hiking</p>

                                <p><img
                                    src="https://user-images.githubusercontent.com/112873819/232453663-77778c91-a124-4a1d-9016-d7270cb12cf0.png"
                                    width="25"
                                    height="25"
                                    className="d-inline-block align-top mr-2 mt-2"
                                    alt="icon"
                                />
                                    playground</p>

                                <p><img
                                    src="https://user-images.githubusercontent.com/112873819/232454142-21dd41c7-96cb-4d4f-83ea-931b2c7c64d6.png"
                                    width="25"
                                    height="25"
                                    className="d-inline-block align-top mr-2 mt-2"
                                    alt="icon"
                                />
                                    Camp store</p>

                                <p><img
                                    src="https://user-images.githubusercontent.com/112873819/232454151-b06bb398-8e09-4540-bcc9-c521fd99044c.png"
                                    width="25"
                                    height="25"
                                    className="d-inline-block align-top mr-2 mt-2"
                                    alt="icon"
                                />
                                    Toilets</p>
                            </Col>
                        </Row>

                    </Col>

                    <Col>
                        <h4>Campsite rules</h4>
                        <ul>
                            <li>Campsite is opened for vehicle and reception is opened always from 8:00 till 20:00.</li>
                            <li>The earliest check in time is 08:00 and latest check out time is 11:30.</li>
                            <li>All roads in the camp site must remain free.</li>
                            <li>Emptying chemical toilets is allowed only on designated place</li>
                            <li>Guests should keep their pitch area clear and tidy.</li>
                            <li>Quiet hours are from 14:00 till 16:t00 afternoon and from 22:00 till 7:00.</li>
                            <li>Use of electric stoves, and heating is not allowed and can result in power shut down.</li>
                            <li>Smoking inside caravan/rented tents/cabins is strictly forbidden ...</li>
                        </ul>
                    </Col>

                </Row>
            </Container >
            <Container className='mt-5'>
                <Row>
                    <h2>Reservation Information</h2>
                    <p>
                        Reservations can be made online or by calling our campground office. We offer both tent and RV camping options, and our friendly staff are always available to assist with any questions or special requests you may have. Don't miss out on the opportunity to experience the beauty of nature at Campground Name
                    </p>
                </Row>
                <h2>Please select the date</h2>

                <Form onSubmit={handleBook} className='individualSearch'>
                    <Form.Label>Check in</Form.Label>
                    <DatePicker selected={startDate} placeholderText="Select check-in date" onChange={(date) => setStartDate(date)} />
                    <Form.Label>Check out</Form.Label>
                    <DatePicker selected={endDate} placeholderText="Select check-out date" onChange={(date) => setEndDate(date)} />
                    <Row className='mt-5'>
                        <Col>
                            <Button type="submit" size="sm" style={{ backgroundColor: '#ADFB2F', border: 'none', color: 'black', maxHeight: '50px', marginLeft: '150px' }}>Book now</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => { handleSaveCamp(id, campgroundId) }} style={{ border: 'none', color: 'white', maxHeight: '50px', marginLeft: '150px' }}>Favorite</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <hr className='mx-5' />
            <Container className='mt-5'>
                <Row>
                    <Col>
                        <h2>Customer Reviews</h2>
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
            </Container>
        </>
    )
};

export default IndividualCampground;