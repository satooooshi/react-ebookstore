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

import { getProducts,getProductsById, getCart, addCart } from "./data";
import { RestaurantMenu } from '@material-ui/icons';
import { CardDeck } from 'react-bootstrap';

import Appa from './components/CheckoutForm/App'


var produooo = {
  "id": "prod_0YnEoqGEOle7P6",
  "created": 1623195206,
  "updated": 1623666583,
  "active": true,
  "permalink": "erv27G",
  "name": "As a Man Thinketh",
  "description": "<p>by James Allen <em> (Author)</em></p><p>In <strong>As a Man Thinketh</strong>, James Allen points out the power of thoughts in shaping our realities. Often, we think that we are the victims of circumstance while in truth our thoughts, actions, and habits create the circumstances we dislike. The solution is to cultivate better thoughts just like we would treat a garden. Everyone should read it</p><p>Can you think of a single moment in the whole day when your mind is blank and thoughtless?Do you know how powerful every thought is?“Cherish your visions; cherish your ideals; cherish the music that stirs in your heart, the beauty that forms in your mind, the loveliness that drapes your purest thoughts, for out of them will grow all delightful conditions, all heavenly environment; of these, if you but remain true to them, your world will at last be built.”Giving an insight into the power of thoughts; the effect they have on our health, body and circumstances; and how we become what we think; this compelling literary essay by James Allen contains practical wisdom which will inspire, enlighten and help us discover our hidden powers.Written in a spiritual tone, As a Man Thinketh has been a valuable source of inspiration ever since its first publication in 1903. It continues to remain a classic bestseller.</p>",
  "price": {
    "raw": 59,
    "formatted": "59.00",
    "formatted_with_symbol": "₹59.00",
    "formatted_with_code": "59.00 INR"
  },
  "inventory": {
    "managed": false,
    "available": 0
  },
  "sku": null,
  "sort_order": 0,
  "seo": {
    "title": null,
    "description": null
  },
  "thank_you_url": null,
  "meta": null,
  "conditionals": {
    "is_active": true,
    "is_tax_exempt": false,
    "is_pay_what_you_want": false,
    "is_inventory_managed": false,
    "is_sold_out": false,
    "has_digital_delivery": false,
    "has_physical_delivery": true,
    "has_images": true,
    "collects_fullname": false,
    "collects_shipping_address": true,
    "collects_billing_address": false,
    "collects_extra_fields": false,
    "has_video": false,
    "has_rich_embed": false
  },
  "is": {
    "active": true,
    "tax_exempt": false,
    "pay_what_you_want": false,
    "inventory_managed": false,
    "sold_out": false
  },
  "has": {
    "digital_delivery": false,
    "physical_delivery": true,
    "images": true
  },
  "collects": {
    "fullname": false,
    "shipping_address": true,
    "billing_address": false,
    "extra_fields": false
  },
  "checkout_url": {
    "checkout": "https://checkout.chec.io/erv27G?checkout=true",
    "display": "https://checkout.chec.io/erv27G"
  },
  "media": {
    "type": "image",
    "source": "https://cdn.chec.io/merchants/28663/assets/jmHrbyaTb3c6aRym|book1.jpg",
    "asset_id": "ast_yA6nldmG1LwEWb"
  },
  "extra_fields": [],
  "variant_groups": [],
  "categories": [],
  "assets": [
    {
      "id": "ast_yA6nldmG1LwEWb",
      "url": "https://cdn.chec.io/merchants/28663/assets/jmHrbyaTb3c6aRym|book1.jpg",
      "description": null,
      "is_image": true,
      "filename": "book1.jpg",
      "file_size": 284696,
      "file_extension": "jpg",
      "image_dimensions": {
        "width": 2367,
        "height": 2560
      },
      "meta": [],
      "created_at": 1623195123,
      "updated_at": 1623195128
    }
  ],
  "image": {
    "id": "ast_yA6nldmG1LwEWb",
    "url": "https://cdn.chec.io/merchants/28663/assets/jmHrbyaTb3c6aRym|book1.jpg",
    "description": null,
    "is_image": true,
    "filename": "book1.jpg",
    "file_size": 284696,
    "file_extension": "jpg",
    "image_dimensions": {
      "width": 2367,
      "height": 2560
    },
    "meta": [],
    "created_at": 1623195123,
    "updated_at": 1623195128
  },
  "related_products": [],
  "attributes": []
};



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
    const fetchProductsData = () => {
      setProducts(getProducts());
    };

    const fetchCartData = () => {
      setCart(getCart());
    };

    const handleAddToCartData = (productId, quantity) => {

      let cartData = JSON.parse(JSON.stringify(getCart()));
      let lineItemsData=cartData.line_items;
      console.log(lineItemsData);


      if(lineItemsData!==undefined){
      for(var i = 0; i < lineItemsData.length; i++) {
        if(productId==lineItemsData[i].id){
            lineItemsData[i].quantity=lineItemsData[i].quantity+1;// incre product quantity in cart
            console.log(lineItemsData);
            cartData.line_items=lineItemsData;
            setCart(prevCart=>{
              const newCart=addCart(cartData);
              return newCart;
            });
            console.log(getCart())
            return ;
        }
      }
      }else{
        // nothing in cart
      }

      // add new product in cart
        const produ = getProductsById(productId);
        console.log(produ)
        let newItem={};
        newItem.id='item_'+Math.random().toString(32).substring(2)
        newItem.quantity=quantity
        //newItem.line_total.formatted_with_symbol=produ.price*quantity
        for (let k in produ){
          newItem[k]=produ[k];
        }
        cartData=JSON.parse(JSON.stringify(getCart()));
        cartData.line_items.push(newItem);
        setCart(addCart(cartData));
        console.log(getCart())
        return ;

    };
  
    const handleUpdateCartQtyData = (lineItemId, quantity) => {

      if(quantity<=0){
        handleRemoveFromCartData(lineItemId);
        return ;
      }

      let cartData = JSON.parse(JSON.stringify(getCart()));
      let lineItemsData=cartData.line_items;
      console.log(lineItemsData);

      // modify quantity
      if(lineItemsData!==undefined){
      for(var i = 0; i < lineItemsData.length; i++) {
        if(lineItemId==lineItemsData[i].id){
            lineItemsData[i].quantity=quantity;
            console.log(lineItemsData);
            cartData.line_items=lineItemsData;
            setCart(prevCart=>{
              const newCart=addCart(cartData);
              return newCart;
            });
            console.log(getCart())
            return ;
        }
      }
      }else{
        // nothing in cart
      }
    };

    const handleRemoveFromCartData = (lineItemId) => {
      let cartData = JSON.parse(JSON.stringify(getCart()));
      let lineItemsData=cartData.line_items;
      

      lineItemsData = lineItemsData.filter(
          product => product.id !== lineItemId
      );

      cartData.line_items=lineItemsData;
      console.log(getCart().line_items)
      const newCart=addCart(cartData)
      console.log(newCart);
      setCart(newCart);
    };

    const handleEmptyCartData = () => {
      let cartData = JSON.parse(JSON.stringify(getCart()));
      cartData.line_items=[];
      setCart(addCart(cartData));
      console.log(addCart(cartData));
    };
  
    const refreshCartData = () => {
      setCart(getCart());
    };
  
    const handleCaptureCheckoutData = (checkoutTokenId, newOrder) => {
      try {
        //const incomingOrder = commerce.checkout.capture(checkoutTokenId, newOrder);
        const incomingOrder=newOrder;
  
        console.log(incomingOrder)
        setOrder(incomingOrder);
  
        refreshCartData();
      } catch (error) {
        setErrorMessage(error.data.error.message);
      }
    };

    /*---------------------------------------------------------------- */


    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    return (
      <div>
      <Router>
        <div style={{ display: 'flex' }}>
          <CssBaseline />
          {/*<Navbar totalItems={cart.total_items} handleDrawerToggle={handleDrawerToggle} />*/}
          <Navbar totalItems={5} handleDrawerToggle={handleDrawerToggle} />
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
  