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
// Install Swiper modules
SwiperCore.use([Autoplay, Navigation, Pagination]);



function IndividualCampground() {
    const [reviews, setReviews] = useState([
        { id: 1, author: 'John Doe', review: 'Great campground! Beautiful views and friendly staff.' },
        { id: 2, author: 'Jane Smith', review: 'Had an amazing time camping here. Facilities were clean and well-maintained.' },
        { id: 3, author: 'Mike Johnson', review: 'One of the best campgrounds I have been to. Highly recommended!' }
    ]);



    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '100%', height: '70vh', overflow: 'hidden' }}>
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
                        style={{ maxWidth: '800px', margin: '0 auto' }} // Update styles for Swiper component
                    >
                        <SwiperSlide>
                            <img src="https://user-images.githubusercontent.com/112873819/231563918-7600766f-0214-44d6-930a-b3439892bb0f.jpg" alt="Campground 1" style={{ width: '100%', height: '100%' }} /> {/* Update styles for image */}
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://user-images.githubusercontent.com/112873819/231563923-2f00bb59-76fb-4e76-8f8b-41f6bc01bfc2.jpg" alt="Campground 2" style={{ width: '100%', height: '100%' }} /> {/* Update styles for image */}
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://user-images.githubusercontent.com/112873819/231563928-ae67fa79-3d28-4166-8420-3594edf60d67.jpg" alt="Campground 3" style={{ width: '100%', height: '100%' }} /> {/* Update styles for image */}
                        </SwiperSlide>
                    </Swiper>

                </div>
            </div>
            <Row className='campInfo'>
                <h1>Campground Name</h1>
                <p className='mt-3'>
                    Welcome to Campground Name! Located in the heart of nature, our campground offers a serene and peaceful escape from the hustle and bustle of everyday life. With stunning views of the surrounding mountains and a variety of recreational activities, you're sure to have an unforgettable camping experience.
                </p>


            </Row>


            <Container className='mt-5'>
                <Row>
                    <Col className='border-end mr-4'>
                        <h2>Facilities and Amenities</h2>
                        <ul>
                            <li>Spacious campsites with fire pits and picnic tables</li>
                            <li>Modern restroom facilities with hot showers</li>
                            <li>RV hookups and dump station</li>
                            <li>Hiking trails and nature walks</li>
                            <li>Fishing and boating opportunities</li>
                            <li>Camp store with camping supplies</li>
                            <li>On-site playground for kids</li>
                        </ul>
                    </Col>

                    <Col className='pl-4'>
                        <h2>Campsite rules</h2>
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
            </Container>
            <Container className='mt-5'>
                <Row>

                    <h2>Reservation Information</h2>
                    <p>
                        Reservations can be made online or by calling our campground office. We offer both tent and RV camping options, and our friendly staff are always available to assist with any questions or special requests you may have. Don't miss out on the opportunity to experience the beauty of nature at Campground Name
                    </p>




                </Row>
            </Container>
            <hr className='mx-5' />
            <Container className='mt-5'>
                <Row>
                    <Col>
                        <h2>Customer Reviews</h2>
                        {reviews.map(review => (
                            <div key={review.id} className='mt-3'>
                                <h4>{review.author}</h4>
                                <p>{review.review}</p>
                            </div>
                        ))}
                    </Col>
                </Row>
            </Container>



        </>
    )
};

export default IndividualCampground;