import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 10000); // 10 seconds

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div>
            <h1>Thank you for booking with us!</h1>
            <p>Your booking at { } has been confirmed.</p>
            <p>Check-in date: { }</p>
            <p>Check-out date: { }</p>
            <p>Total amount: { }</p>
            <p>You will be redirected to the home page in 10 seconds...</p>
        </div>
    );
};

export default ThankYouPage;
