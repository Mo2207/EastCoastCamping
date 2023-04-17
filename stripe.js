// PaymentForm.js

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { PROCESS_PAYMENT_MUTATION } from './graphql/mutations'; // Import the GraphQL mutation

const PaymentForm = () => {
    // Define the state for form data
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expDate, setExpDate] = useState('');

    // Define the mutation and its variables
    const [processPayment, { loading, error }] = useMutation(PROCESS_PAYMENT_MUTATION);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Call the processPayment mutation with form data
        const result = await processPayment({
            variables: {
                cardNumber,
                cardHolder,
                expDate
            }
        });

        // Handle the result of the mutation
        if (result.data.processPayment) {
            // Payment successful, handle accordingly
            console.log('Payment successful:', result.data.processPayment);
        } else {
            // Payment failed, handle accordingly
            console.error('Payment failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Render your form inputs here */}
            {/* Example: */}
            <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
            />
            <input
                type="text"
                placeholder="Card Holder"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
            />
            <input
                type="text"
                placeholder="Expiration Date"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
            />
            {/* Render submit button */}
            <button type="submit">Pay & Confirm</button>
        </form>
    );
};

export default PaymentForm;
