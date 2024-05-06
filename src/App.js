import React, { useEffect, useState } from 'react'
// import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom";
import { HashRouter as Router, Route, Switch, Routes } from "react-router-dom";
import 'font-awesome/css/font-awesome.css'
// Owl Carousel....
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import './assets/css/style.css'
import './assets/css/mobileStyle.css'

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
import { useSelector } from 'react-redux';
import TermsAndConditions from './modules/pages/TermsAndConditions';
import ReturnAndRefund from './modules/pages/ReturnAndRefund';
import EmailOtpPage from './modules/pages/EmailOtpPage';
import EmailPage from './modules/pages/EmailPage';
import CreatePasswordPage from './modules/pages/CreatePasswordPage';
import ForgetPasswordOtpPage from './modules/pages/ForgetPasswordOtpPage';
import PrivacyPolicyPage from './modules/pages/PrivacyPolicyPage';
function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [search, setSearch] = useState("")
  const loggedOut = useSelector((state) => state.homeInfo.loggedOut);
  const isLoginComplete = useSelector((state) => state.homeInfo.isLoginComplete);
  useEffect(() => {
    const val = localStorage.getItem("isLogin")
    val === "true" ? setIsLogin(true) : setIsLogin(false)
  }, [])
  useEffect(() => {
    const val = localStorage.getItem("isLogin")
    val === "true" ? setIsLogin(true) : setIsLogin(false)
  }, [loggedOut, isLoginComplete])
  // console.log('loggedOut', loggedOut)
  return (
    <>
      <div className='full_content'>
        <Header isLogin={isLogin} search={search} setSearch={setSearch} />
        <div className='content'>
          <div className='w-1176'>
            <Routes>
              <Route path="/" element={<HomePage isLogin={isLogin} search={search} setSearch={setSearch} />} />
              <Route path="/product-details/:id" element={<ProductDetailsPage isLogin={isLogin} />} />
              <Route path="/all-products" element={<AllProductsPage search={search} setSearch={setSearch} />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/add-card" element={<AddCardPage />} />
              <Route path="/order-list" element={<OrderListPage isLogin={isLogin} />} />
              <Route path="/order-details/:id" element={<OrderDetailsPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/email-otp" element={<EmailOtpPage />} />
              <Route path="/user-info" element={<UserInfoPage isLogin={isLogin} />} />
              <Route path="/user-address" element={<UserAddressPage />} />
              <Route path="/add-address" element={<AddAddressPage />} />
              <Route path="/edit-address/:id" element={<EditAddressPage />} />
              <Route path="/shop/:id" element={<ShopProductsPage search={search} isLogin={isLogin} />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/return-and-refund" element={<ReturnAndRefund />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/email" element={<EmailPage />} />
              <Route path="/create-password" element={<CreatePasswordPage />} />
              <Route path="/forget-password-otp" element={<ForgetPasswordOtpPage />} />
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
