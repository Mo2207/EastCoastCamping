// import { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { CREATE_PAYMENT_INTENT } from '../utils/mutations';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_51Mxv6VH5nMicWc7BtPbaCqJWzojNjJ5CWvmtAGXUq9koNWpJXCR4yhg5hJ62jNLTxYGUSOh8Qp0KBrbmgmdJDUOD00YcgEO3oT');


// function PaymentForm() {
//     const [amount, setAmount] = useState(0);
//     const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT);

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const { data } = await createPaymentIntent({ variables: { amount } });
//             const clientSecret = data.createPaymentIntent.clientSecret;
//             const stripe = await stripePromise;
//             const result = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: {
//                         number: '4242424242424242',
//                         exp_month: 12,
//                         exp_year: 2023,
//                         cvc: '123',
//                     },
//                     billing_details: {
//                         name: 'Jenny Rosen',
//                     },
//                 },
//             });

//             if (result.error) {
//                 console.log('Payment failed:', result.error.message);
//             } else {
//                 console.log('Payment succeeded:', result.paymentIntent);
//             }
//             // Handle error
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Amount:
//                 <input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} />
//             </label>
//             <button type="submit">Pay with Stripe</button>
//         </form>
//     );
// }




// export default PaymentForm