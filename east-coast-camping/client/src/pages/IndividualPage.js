import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import '../styles/Individualpage.css'// eslint-disable-next-line
import React, { useState, useEffect } from 'react';// eslint-disable-next-line
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
import { useMutation, useQuery } from '@apollo/client';// eslint-disable-next-line
import { SAVE_CAMP, CREATE_REVIEW } from '../utils/mutations';// eslint-disable-next-line
import { QUERY_CAMPBYID, GET_CAMP_REVIEWS, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';// eslint-disable-next-line
import Footer from '../components/Footer';
import Amenities from '../components/detailPage/Amenities';
import ReservationInfo from '../components/detailPage/ReservationInfo';
import StarRating from "../components/StarRating";

// Install Swiper modules
SwiperCore.use([Autoplay, Navigation, Pagination]);
  //Just chat icon
  const chaticon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-square-text" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
</svg>;

function IndividualCampground() {
    const Start =(j)=>{
        return <StarRating rating={j}/>;
    }
    let idUser;
    if (Auth.loggedIn()) {
        idUser = Auth.getToken()
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
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>{error.message}</p>;

    const reviews = reviewData?.campReviews || [];
    // console.log(`CAMPREVIEWS: ${reviews}`)

    // query individual camp data
    // eslint-disable-next-line
    const { loading, data } = useQuery(QUERY_CAMPBYID, {
        variables: { campById: campgroundId }

    })
    const campInfo = data?.campById || {};
    console.log(reviews.camp[0])

    const navigate = useNavigate();
    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3"></Popover.Header>
          <Popover.Body style={{ color: 'red' }}>
            "Please select start date and end date to proceed reservation."
          </Popover.Body>
        </Popover>
      );

    const handleBook = (userid, campId, name, location, price, start, end) => {
        // id= Auth.getToken();
        console.log("1", userid, campId, name, location, start, end, price)
        const userinfo = [userid, campId, start, end, price]
        localStorage.setItem("userinfo", userinfo)
        if(start && end ){
        navigate('/reservation', {state:{userid: userid, campid: campgroundId, campName: name, campLocation: location, campPrice: price, checkin: startDate, checkout: endDate}})
        }         
    };

    const [saveCamp] = useMutation(SAVE_CAMP);

    function handleSaveCamp(userid, campgroundId) {
         const id=Auth.getToken()
        console.log("2", id, campgroundId)
        // eslint-disable-next-line
        const { savedData } = saveCamp({
            variables: { userId: userid, campId: campgroundId }

        })          
        // console.log(savedData)
    }

    function handleSwitch(e,start,end){// eslint-disable-next-line
        switch(e){
            case 1: 
                handleBook(idUser, campgroundId, campInfo.name, campInfo.location, campInfo.price, start, end);
                break;
            case 2: 
                handleSaveCamp(idUser, campgroundId);
                break;
        }
    }
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
                    <Button style={{ border: 'none', color: 'white', maxHeight: '50px', marginLeft: '150px'}} disabled>Book Now</Button>
                    </Col>
                    <Col >
                    <Button key='2' style={{ border: 'none', color: 'white', maxHeight: '50px', marginLeft: '150px'}} disabled>Favorite</Button>
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
                                <h4>{review.user.firstName} {review.user.lastName} {Start(review.rating)} {review.rating}</h4>
                                <p>{review.text}</p>
                            </div>
                        ))}
                        <Link style={{ textDecoration: 'none', fontWeight:'bolder', color:'black'}} to={`/review/${campgroundId}?name=${campInfo.name}`}><p><strong>{chaticon} Check Out Review</strong></p></Link>
                    </Col>
                </Row>
                {/*----------------------- review section -------------------------------*/}
            </Container>
        </>
    )
};

export default IndividualCampground;