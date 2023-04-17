import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js'
import { CREATE_STRIPE_PAYMENT } from '../utils/mutations';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_51Mxv6VH5nMicWc7BtPbaCqJWzojNjJ5CWvmtAGXUq9koNWpJXCR4yhg5hJ62jNLTxYGUSOh8Qp0KBrbmgmdJDUOD00YcgEO3oTY');


const CheckoutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [createPayment] = useMutation(CREATE_STRIPE_PAYMENT);
    const [error, setError] = useState(null);
    const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentIntent } = await stripe.confirmCardPayment(
            paymentIntentClientSecret,
            {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            }
        );
        if (error) {
            setError(error.message);
        } else {
            console.log('success')
        }
    };

    const handleCreatePayment = async () => {
        const { data } = await createPayment({ variables: { amount } });
        const paymentIntentClientSecret = data.createStripePayment;
        const { error } = await stripe.retrievePaymentIntent(paymentIntentClientSecret);
        if (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button onClick={handleCreatePayment}>Pay ${amount}</button>
            {error && <p>{error}</p>}
        </form>
    );
};

const StripeCheckout = ({ amount }) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm amount={amount} />
        </Elements>
    );
};

export default StripeCheckout;
