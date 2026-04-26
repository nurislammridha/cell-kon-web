import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import 'font-awesome/css/font-awesome.css'
// Owl Carousel....
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import './assets/css/style.css'
import './assets/css/mobileStyle.css'
//test
import HomePage from './modules/pages/HomePage';
import Footer from './modules/components/Footer';
import Header from './modules/components/Header';
import { useSelector } from 'react-redux';

const ProductDetailsPage = lazy(() => import('./modules/pages/ProductDetailsPage'));
const AllProductsPage = lazy(() => import('./modules/pages/AllProductsPage'));
const CartPage = lazy(() => import('./modules/pages/CartPage'));
const CheckoutPage = lazy(() => import('./modules/pages/CheckoutPage'));
const PaymentPage = lazy(() => import('./modules/pages/PaymentPage'));
const AddCardPage = lazy(() => import('./modules/pages/AddCardPage'));
const OrderListPage = lazy(() => import('./modules/pages/OrderListPage'));
const OrderDetailsPage = lazy(() => import('./modules/pages/OrderDetailsPage'));
const SignUpPage = lazy(() => import('./modules/pages/SignUpPage'));
const LoginPage = lazy(() => import('./modules/pages/LoginPage'));
const UserInfoPage = lazy(() => import('./modules/pages/UserInfoPage'));
const UserAddressPage = lazy(() => import('./modules/pages/UserAddressPage'));
const AddAddressPage = lazy(() => import('./modules/pages/AddAddressPage'));
const EditAddressPage = lazy(() => import('./modules/pages/EditAddressPage'));
const ShopProductsPage = lazy(() => import('./modules/pages/ShopProductsPage'));
const TermsAndConditions = lazy(() => import('./modules/pages/TermsAndConditions'));
const ReturnAndRefund = lazy(() => import('./modules/pages/ReturnAndRefund'));
const EmailOtpPage = lazy(() => import('./modules/pages/EmailOtpPage'));
const EmailPage = lazy(() => import('./modules/pages/EmailPage'));
const CreatePasswordPage = lazy(() => import('./modules/pages/CreatePasswordPage'));
const ForgetPasswordOtpPage = lazy(() => import('./modules/pages/ForgetPasswordOtpPage'));
const PrivacyPolicyPage = lazy(() => import('./modules/pages/PrivacyPolicyPage'));
const CampaignProductsPage = lazy(() => import('./modules/pages/CampaignProductsPage'));
const CategoryProductsPage = lazy(() => import('./modules/pages/CategoryProductsPage'));
const CreateUserPage = lazy(() => import('./modules/pages/CreateUserPgae'));
const PhonePage = lazy(() => import('./modules/pages/PhonePage'));
const PlaceOrder = lazy(() => import('./modules/pages/PlaceOrder'));
const WishlistPage = lazy(() => import('./modules/pages/WishlistPage'));

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
  const routeFallback = <div className='route_loading'>Loading...</div>

  return (
    <>
      <div className='full_content'>
        <Header isLogin={isLogin} search={search} setSearch={setSearch} />
        <div className='content'>
          <div className='w-1176'>
            <Suspense fallback={routeFallback}>
              <Routes>
                <Route path="/" element={<HomePage isLogin={isLogin} search={search} setSearch={setSearch} />} />
                <Route path="/product-details/:id" element={<ProductDetailsPage isLogin={isLogin} />} />
                <Route path="/all-products" element={<AllProductsPage search={search} setSearch={setSearch} />} />
                <Route path="/category/:id" element={<CategoryProductsPage search={search} setSearch={setSearch} />} />
                <Route path="/campaign-products/:id" element={<CampaignProductsPage search={search} setSearch={setSearch} />} />
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
                <Route path="/user-address" element={<UserAddressPage isLogin={isLogin} />} />
                <Route path="/wishlist" element={<WishlistPage isLogin={isLogin} />} />
                <Route path="/add-address" element={<AddAddressPage />} />
                <Route path="/create-user" element={<CreateUserPage />} />
                <Route path="/phone" element={<PhonePage />} />
                <Route path="/edit-address/:id" element={<EditAddressPage />} />
                <Route path="/shop/:id" element={<ShopProductsPage search={search} isLogin={isLogin} />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/return-and-refund" element={<ReturnAndRefund />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/email" element={<EmailPage />} />
                <Route path="/place-order" element={<PlaceOrder />} />
                <Route path="/create-password" element={<CreatePasswordPage />} />
                <Route path="/forget-password-otp" element={<ForgetPasswordOtpPage />} />
                <Route path="/*" element={<div>No page found</div>} />
              </Routes>
            </Suspense>
          </div>
        </div>
        {/* //footer */}
        <Footer />

      </div>
    </>
  );
}

export default App;
