import React, { useState, useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';

import { commerce } from '../../../lib/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';

import useToken from './useToken';
import SignIn from './SignIn/Signin'

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();
  const history = useHistory();

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          //const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
          let token = {}
          token.id='checkouttoken_12345'
          token.live=cart;
          token.shippingData=shippingData;
          token.live.subtotal.formatted_with_symbol=cart.subtotal.raw+" JPY"
          setCheckoutToken(token);
        } catch {
          if (activeStep !== steps.length) history.push('/');
        }
      };
      generateToken();
    }
  }, [cart]);


  const test = (data) => {
    console.log(data);
    // set all field in AddressForm including first,lastname
    setShippingData(data)
    console.log('shipping data')
    console.log(console.log(JSON.stringify(data, null, 2)))

    nextStep();
  };

  // このコンポネントはerrorがある場合、後から上書きされる
  let Confirmation = () => (order.customer ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
        <Typography variant="subtitle2">Ordered Items: </Typography>
        <List disablePadding>
      {order.line_items.map((product) => (
        <ListItem style={{ padding: '10px 0' }} key={product.name}>
          <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
          <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
        </ListItem>
      ))}
      <ListItem style={{ padding: '10px 0' }}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
          {checkoutToken.live.subtotal.formatted_with_symbol}
        </Typography>
      </ListItem>
      </List>


      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  ));

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    );
  }

  const Form = () => (activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} nextStep={nextStep} setShippingData={setShippingData} test={test} />
    : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout}/>);


  const { token, setToken } = useToken(); // save in localStorage
  if(!token) {
    //eturn <Login setToken={setToken} /> 
    return <SignIn setToken={setToken} />
  }


  // step0 AddressForm, step1 PaymentForm, step3==steps.length Confirmation
  return (

    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
