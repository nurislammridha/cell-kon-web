import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom";
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
import OrderListPage from './modules/pages/OrderListPage';
import OrderDetailsPage from './modules/pages/OrderDetailsPage';
import SignUpPage from './modules/pages/SignUpPage';
import LoginPage from './modules/pages/LoginPage';
import UserInfoPage from './modules/pages/UserInfoPage';
import UserAddressPage from './modules/pages/UserAddressPage';
import AddAddressPage from './modules/pages/AddAddressPage';
import EditAddressPage from './modules/pages/EditAddressPage';
import ShopProductsPage from './modules/pages/ShopProductsPage';
function App() {
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    const val = localStorage.getItem("isLogin")
    val === "true" ? setIsLogin(true) : setIsLogin(false)
  }, [])

  return (
    <>
      <div className='full_content'>
        <Header isLogin={isLogin} />
        <div className='content'>
          <div className='w-1176'>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product-details/:id" element={<ProductDetailsPage />} />
              <Route path="/all-products" element={<AllProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/add-card" element={<AddCardPage />} />
              <Route path="/order-list" element={<OrderListPage />} />
              <Route path="/order-details/:id" element={<OrderDetailsPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/user-info" element={<UserInfoPage />} />
              <Route path="/user-address" element={<UserAddressPage />} />
              <Route path="/add-address" element={<AddAddressPage />} />
              <Route path="/edit-address" element={<EditAddressPage />} />
              <Route path="/shop/:id" element={<ShopProductsPage />} />
              <Route path="/*" element={<div>No page found</div>} />
            </Routes>
          </div>
        </div>
        {/* //footer */}
        <Footer />

      </div>
    </>
  );
}

export default App;
