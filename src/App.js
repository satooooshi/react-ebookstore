import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import {commerce} from './lib/commerce';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import Checkout from './components/CheckoutForm/Checkout/Checkout';
import ProductView from './components/ProductView/ProductView';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { Container, Typography, Button, Grid } from '@material-ui/core';

import { getProducts,getProductById, getCart, addCart } from "./data";
import { RestaurantMenu } from '@material-ui/icons';
import { CardDeck } from 'react-bootstrap';
import Appa from './components/CheckoutForm/App'
import axios from 'axios';

  let API_URL=process.env.REACT_APP_DEV_API_URL
  //let API_URL='http://localhost:3001'
  //let API_URL=''

  const App = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    
    const fetchProducts = async () => {
      const { data } = await commerce.products.list();
      console.log(data);
      //console.log(JSON.stringify(data, null, 2));
      setProducts(data);
    };

    const fetchCart = async () => {
      //const { data } = await commerce.cart.retrieve()
      //console.log(JSON.stringify(await commerce.cart.retrieve(), null, 2));
      //setCart(data);
      console.log(await commerce.cart.retrieve())
      setCart(await commerce.cart.retrieve());
    };
  
    const handleAddToCart = async (productId, quantity) => {
      const item = await commerce.cart.add(productId, quantity);
  
      setCart(item.cart);
    };
  
    const handleUpdateCartQty = async (lineItemId, quantity) => {
      const response = await commerce.cart.update(lineItemId, { quantity });
  
      setCart(response.cart);
    };
  
    const handleRemoveFromCart = async (lineItemId) => {
      const response = await commerce.cart.remove(lineItemId);
  
      setCart(response.cart);
    };
  
    const handleEmptyCart = async () => {
      const response = await commerce.cart.empty();
  
      setCart(response.cart);
    };
  
    const refreshCart = async () => {
      const newCart = await commerce.cart.refresh();
  
      setCart(newCart);
    };
  
    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
      try {
        const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
        console.log(incomingOrder);
  
        setOrder(incomingOrder);
  
        refreshCart();
      } catch (error) {
        setErrorMessage(error.data.error.message);
      }
    };
  
    useEffect(() => {
      //fetchProducts();
      //fetchCart();

      fetchProductsData();
      fetchCartData();
    }, []);


    /*---------------------------------------------------------------- */
    const fetchProductsLocalData = () => {
      setProducts(getProducts());
    };

    const fetchCartLocalData = () => {
      setCart(getCart());
    };

    
    const handleAddToCartLocalData = (productId, quantity) => {

      let newCart=JSON.parse(JSON.stringify(getCart()));// deep copy
      let prod=JSON.parse(JSON.stringify(getProductById(productId)));// deep copy
      let foundIdx = newCart.line_items.findIndex(item=>item.product_id===productId);
      if(foundIdx!==-1){ // update line_item quantity in cart
        newCart.line_items[foundIdx].quantity+=1
        newCart.line_items[foundIdx].line_total+=prod.price.raw       
      }else{ // add new line_item to cart
        prod.product_id=productId
        prod.quantity=1 // add new key
        prod.line_total=prod.price.raw
        newCart.line_items.push(prod)
        newCart.total_unique_items++
        
      }
      newCart.total_items++
      newCart.subtotal.raw=newCart.subtotal.raw+prod.price.raw
      setCart(addCart(JSON.parse(JSON.stringify(newCart))));// deep copy
      console.log(newCart)

    };
  
    // at least one lineItemId item in cart
    const handleUpdateCartQtyLocalData = (lineItemId, quantity) => {

      if(quantity<=0){
        handleRemoveFromCartLocalData(lineItemId);
        return ;
      }

      let cartData = JSON.parse(JSON.stringify(getCart()))// deep copy
      let lineItemsData=cartData.line_items; // shallow copy
      let lineItemData=lineItemsData.find(product => product.id === lineItemId)
      lineItemData.quantity=quantity;

      let total_items=0
      let total_unique_items=0
      let subtotalraw=0
      lineItemsData.forEach((item,idx) => {   
        if(item.id!==lineItemId){
          // fall through
        }else{
          item.line_total=item.price.raw*item.quantity
        }
        subtotalraw+=item.line_total
        console.log(item.line_total)
        total_items+=item.quantity
        total_unique_items++
      })
      cartData.total_items=total_items
      cartData.total_unique_items=total_unique_items
      cartData.subtotal.raw=subtotalraw
      cartData.line_items=lineItemsData
      setCart(addCart(cartData))
      console.log(cartData)

    };

    const handleRemoveFromCartLocalData = (lineItemId) => {
      let cartData = JSON.parse(JSON.stringify(getCart()));// deep copy
      let lineItemsData=cartData.line_items;
      lineItemsData = lineItemsData.filter(
        product => product.id !== lineItemId
    );

    let total_items=0
    let total_unique_items=0
    let subtotalraw=0
    lineItemsData.forEach((item,idx) => {   
      if(item.id!==lineItemId){
        // fall through
      }else{
        item.line_total=item.price.raw*item.quantity
      }
      subtotalraw+=item.line_total
      console.log(item.line_total)
      total_items=parseInt(total_items)+parseInt(item.quantity)
      total_unique_items++
    })
    cartData.total_items=total_items
    cartData.total_unique_items=total_unique_items
    cartData.subtotal.raw=subtotalraw
    cartData.line_items=lineItemsData

      console.log(cartData)
      setCart(addCart(cartData));
    };

    const handleEmptyCartLocalData = () => {
      let cartData = JSON.parse(JSON.stringify(getCart()));
      cartData.total_items=0
      cartData.total_unique_items=0
      cartData.subtotal.raw=0
      cartData.line_items=[];
      setCart(addCart(cartData));
      console.log(addCart(cartData));
    };
  
    const refreshCartLocalData = () => {
      let cartData = JSON.parse(JSON.stringify(getCart()));
      setCart(cartData);
    };
  
    const handleCaptureCheckoutLocalData = (checkoutTokenId, newOrder) => {
      try {
        const incomingOrder=newOrder;
        console.log('incomingorder-----------------------')
        console.log(console.log(JSON.stringify(incomingOrder, null, 2)))
        setOrder(incomingOrder)
        refreshCartData();
      } catch (error) {
        setErrorMessage(error.data.error.message);
      }
    };

    /*---------------------------------------------------------------- */

    const fetchProductsData = () => {
      axios.get(API_URL+`/api/products`)
      .then(res => {
        console.log('axios fetch products')
        console.log(res)
        setProducts(res.data);
      })
    };

    const fetchCartData = () => {
      axios.get(API_URL+`/api/cart`)
      .then(res => {
        console.log('axios fetch cart')
        console.log(res)
        setCart(res.data);
      })
    };

    
    const handleAddToCartData = (productId, quantity) => {

      axios.get(API_URL+`/api/cart/add/`+productId)
      .then(res => {
        console.log('axios cart add')
        console.log(res)
        setCart(res.data)
        fetchCartData()
      })

    };
  
    // at least one lineItemId item in cart
    const handleUpdateCartQtyData = (lineItemId, quantity) => {
      axios.get(API_URL+`/api/cart/update/`+lineItemId+'/'+quantity)
      .then(res => {
        console.log('axios cart update')
        console.log(res)
        setCart(res.data)
        fetchCartData()
      })
    };

    const handleRemoveFromCartData = (lineItemId) => {
      axios.get(API_URL+`/api/cart/remove/`+lineItemId)
      .then(res => {
        console.log('axios cart remove from cart')
        console.log(res)
        setCart(res.data);
      })
    };

    const handleEmptyCartData = () => {
      axios.get(API_URL+`/api/cart/empty`)
      .then(res => {
        console.log('axios empty cart')
        console.log(res)
        setCart(res.data);
      })
    };
  
    const refreshCartData = () => {
      fetchCartData()
    };
  
    const handleCaptureCheckoutData = (checkoutTokenId, newOrder) => {
      try {
        const incomingOrder=newOrder;
        console.log('incomingorder-----------------------')
        console.log(console.log(JSON.stringify(incomingOrder, null, 2)))
        setOrder(incomingOrder)
        refreshCartData();
      } catch (error) {
        setErrorMessage(error.data.error.message);
      }
    };

    //-----------------------------------------------------------------

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    return (
      <div>
      <Router>
        <div style={{ display: 'flex' }}>
          <CssBaseline />
          <Navbar totalItems={cart.total_items} handleDrawerToggle={handleDrawerToggle} />
          <Switch>
            <Route exact path="/">
              <Products products={products} onAddToCart={handleAddToCartData} handleUpdateCartQty />
            </Route>
            <Route exact path="/cart">
              <Cart cart={cart} onUpdateCartQty={handleUpdateCartQtyData} onRemoveFromCart={handleRemoveFromCartData} onEmptyCart={handleEmptyCartData} />
            </Route>
            <Route path="/checkout" exact>
              <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckoutData} error={errorMessage} />
            </Route>
            <Route path="/product-view/:id" exact>
              <ProductView />
            </Route>
            <Route path="/app" exact>
              <Appa />
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer />
      </div>
    );
  };
  
  export default App;
  