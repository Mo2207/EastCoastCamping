import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ThankYouPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const bookingDetails = location.state?.bookingDetails;

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/myBookings');
        }, 10000); // 10 seconds

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div>

            {bookingDetails ? (
                <div className="vh-100 d-flex justify-content-center align-items-center">
                    <div className="card col-md-4 bg-white shadow-md p-5">
                        <div className="mb-4 text-center">
                            <img
                                src="https://user-images.githubusercontent.com/112873819/233211768-a3ff57a0-11bc-4ba9-9f84-d9ec4d085005.png"
                                width="80"
                                height="80"
                                className="d-inline-block align-top"
                                alt="logo"
                            />
                        </div>
                        <div className="text-center">
                            <h3>Thank you for booking with us!</h3>
                            <p>Your booking at {bookingDetails.campgroundName} has been confirmed.</p>
                            <p>Check-in date: {bookingDetails.checkinDate}</p>
                            <p>Check-out date: {bookingDetails.checkoutDate}</p>
                            <p>Total amount: {bookingDetails.totalAmount}</p>
                            <a href='/'><button className="btn btn-outline-success">Back Home</button></a>
                            <p className='mt-4'>You will be redirected to the booking record page in <span className='text-warning h6'>10</span> seconds...</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Your booking details are not available.</p>
            )}
        </div>
    );
}

export default ThankYouPage;
