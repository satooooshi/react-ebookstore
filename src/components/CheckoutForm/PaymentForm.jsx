import React, { useState, useEffect } from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';

import { createPaymentMethod } from './Checkout/data';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);



const PaymentForm = ({ checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout, cart }) => {

  // <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
  // <Button type="submit"
  // triggered when pay button is clicked
  const handleSubmit = async (event, elements, stripe) => {
    //現在のURLに対してフォームの送信が行われると、結果的にページがリロードされてしまいます。 
    //そのため、event.preventDefault()を呼び出し、デフォルトの動作をキャンセルしていました。 
    //event.preventDefault()をコメントアウトすると、ページがリロードされてしまうことが確認できます。
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    //const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
    const { error, paymentMethod } = await createPaymentMethod();

    if (error) {
      console.log('[error]', error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
        shipping: { name: 'International', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      onCaptureCheckout(checkoutToken.id, orderData);

      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} cart={cart}/>
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>{({ elements, stripe }) => (
          <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
            <CardElement />
            <br /> <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={backStep}>Back</Button>
              <Button type="submit" variant="contained" disabled={!stripe} style={{ backgroundColor: '#1C2331', color: '#FFFF' }} >
                Pay {checkoutToken.live.subtotal.formatted_with_symbol}
              </Button>
            </div>
          </form>
        )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
