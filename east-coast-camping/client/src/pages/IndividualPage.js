import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import '../styles/Individualpage.css'
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css' //date-picker css
import { 
    Container,
    Row,
    Col,
    Form,
    Button,
    OverlayTrigger,
    Popover
  } from 'react-bootstrap';
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

    let id;
    if (Auth.loggedIn()) {
        id = Auth.getToken()
    };

    // const [destination, setDestination] = useState('');
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

    const navigate = useNavigate();
    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3"></Popover.Header>
          <Popover.Body style={{ color: 'red' }}>
            "Please select start date and end date to proceed reservation."
          </Popover.Body>
        </Popover>
      );

    const handleBook = (id, campId, campground, start, end, price) => {

        // var date1 = new Date('4/23/2023');
        // var date2 = new Date('4/28/2023');
        // var totalNight = days(date1,date2);
        
        // var shortMonthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format;
        // // var shortMonth = shortMonthName(date); // "Jul"  
      
        // var start = `${shortMonthName(date1)} ${date1.getDate()}, ${date1.getFullYear()}`;
        // var end = `${shortMonthName(date2)} ${date2.getDate()}, ${date2.getFullYear()}`;

        // var ratePerNight = price;
        // var totalAmount = ratePerNight * totalNight;

        // e.preventDefault();
        console.log("1", id, campId, campground, start, end, price)
        if(start && end ){
        navigate('/reservation', {state:{userid: id, campid: campgroundId, campName: campInfo.name, campPrice: campInfo.price, checkin: startDate, checkout: endDate}})
        }         
    };

    const [saveCamp] = useMutation(SAVE_CAMP);

    function handleSaveCamp(id, campgroundId) {
        console.log("2", id, campgroundId)
        const { savedData } = saveCamp({
            variables: { userId: id, campId: campgroundId }

        })          
        console.log(savedData)
    }

    function handleSwitch(e,start,end){
        switch(e){
            case 1: 
                handleBook(id, campgroundId, campInfo.name, campInfo.location, campInfo.price, start, end);
                break;
            case 2: 
                handleSaveCamp(id, campgroundId);
                break;
        }

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


                <Form className='individualSearch'>
                    <Form.Label>Check in</Form.Label>
                    <DatePicker selected={startDate} placeholderText="Select check-in date" onChange={(date) => setStartDate(date)} />
                    <Form.Label>Check out</Form.Label>
                    <DatePicker selected={endDate} placeholderText="Select check-out date" onChange={(date) => setEndDate(date)} />                    
                </Form>
                {Auth.loggedIn()?( 
                    <Row className='mt-5'>                        
                        <Col >
                            { (!startDate && !endDate) ? (
                            <>
                                <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                                <Button style={{ border: 'none', color: 'white', maxHeight: '50px', marginLeft: '150px'}} >Book Now</Button>
                                </OverlayTrigger>
                            </> ):(
                            <>
                                <Button key='1' onClick={() => { handleSwitch(1, startDate, endDate) }} style={{ border: 'none', color: 'white', maxHeight: '50px', marginLeft: '150px'}} >Book Now</Button>
                            </>)}
                            

                        </Col>
                        <Col >
                            <Button key='2' onClick={() => { handleSwitch(2, startDate, endDate)}} style={{ border: 'none', color: 'white', maxHeight: '50px', marginLeft: '150px'}} >Favorite</Button>
                        </Col>
                    </Row>

                ):(
                <Row className='mt-5'>
                    <p className="mb-5 pb-lg-2 text-center" style={{ color: '#393f81' }}>Please <a href="/Login" style={{ color: '#393f81' }}>sign in</a> to continue.Don't have an account? <a href="/register" style={{ color: '#393f81' }}>Register here</a></p>
                    <Col >
                        <Button type="submit" size="sm" variant="success" disabled>Book now</Button>
                    </Col>
                    <Col >
                        <Button onClick={() => { handleSaveCamp(id, campgroundId) }} style={{ border: 'none', color: 'white', maxHeight: '50px', marginLeft: '150px'}} disabled>Favorite</Button>
                    </Col>
                </Row>
                )}

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