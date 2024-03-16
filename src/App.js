import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'font-awesome/css/font-awesome.css'
// Owl Carousel....
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import './assets/css/style.css'

import HomePage from './modules/pages/HomePage';
import ProductDetailsPage from './modules/pages/ProductDetailsPage';
import AllProductsPage from './modules/pages/AllProductsPage';
import CartPage from './modules/pages/CartPage';
import CheckoutPage from './modules/pages/CheckoutPage';
import PaymentPage from './modules/pages/PaymentPage';
import AddCardPage from './modules/pages/AddCardPage';
import Footer from './modules/components/Footer';
import Header from './modules/components/Header';
function App() {

  return (
    <>
      <div className='full_content'>
        <Router>
          <Header />
          <div className='content'>
            <div className='w-1176'>
              <Switch>
                {/* home page  */}
                <Route exact path="/">
                  <HomePage />
                </Route>
                {/* details page */}
                <Route exact path="/product-details">
                  <ProductDetailsPage />
                </Route>
                {/* Product page */}
                <Route exact path="/all-products">
                  <AllProductsPage />
                </Route>
                {/* cart page */}
                <Route exact path="/cart">
                  <CartPage />
                </Route>
                {/* checkout page */}
                <Route exact path="/checkout">
                  <CheckoutPage />
                </Route>
                {/* payment page */}
                <Route exact path="/payment">
                  <PaymentPage />
                </Route>
                {/* Add new card */}
                <Route exact path="/add-card">
                  <AddCardPage />
                </Route>
                <Route path="*">
                  <div>No page found</div>
                </Route>
              </Switch>
            </div>
          </div>
          {/* //footer */}
          <Footer />
        </Router>

      </div>
    </>
  );
}

export default App;
