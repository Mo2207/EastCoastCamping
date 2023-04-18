import React from 'react'
import { gql, useLazyQuery } from '@apollo/client'

import Stripe from 'stripe';

const stripe = new Stripe('pk_test_51Mxv6VH5nMicWc7BtPbaCqJWzojNjJ5CWvmtAGXUq9koNWpJXCR4yhg5hJ62jNLTxYGUSOh8Qp0KBrbmgmdJDUOD00YcgEO3oT');

const CHECKOUT = gql`
  query Query {
    createCheckoutSession
  }
`

export default function CheckoutButton() {
    const [startCheckout, { loading, error, data }] = useLazyQuery(CHECKOUT, {
        onCompleted: (queryData) => {
            console.log(queryData);
            let data = JSON.parse(queryData.createCheckoutSession); // url: strikeURL
            console.log(data)
            let checkoutUrl = data.url;
            window.location.assign(checkoutUrl) //strike URL
        },
    })

    if (loading) return null;
    if (error) return `Error ${error}`;
    console.log(data);

    return (
        <button onClick={() => startCheckout()} stripe={stripe}>
            Checkout!
        </button>
    )
}
