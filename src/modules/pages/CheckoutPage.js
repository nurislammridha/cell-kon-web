import React, { useEffect, useState } from 'react'
import CheckoutOrderSummery from '../components/CheckoutOrderSummery'
import CheckoutProducts from '../components/CheckoutProducts'
import { useLocation, useNavigate } from 'react-router-dom';
import { GetBuyerDetailsByBuyerId } from '../_redux/CommonAction';
import { useDispatch, useSelector } from 'react-redux';

const CheckoutPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();
    const buyerDetails = useSelector((state) => state.homeInfo.buyerDetails);
    const { addressInfo } = buyerDetails || { addressInfo: [] }
    const [addressList, setAddressList] = useState({})
    useEffect(() => {
        dispatch(GetBuyerDetailsByBuyerId())
    }, [])
    useEffect(() => {
        if (!location?.state?.isFromAddress) {
            setAddressList(addressInfo[0])
        }

    }, [buyerDetails])
    useEffect(() => {
        if (location?.state?.isFromAddress) {
            setAddressList(location?.state?.data)
        }
    }, [location])
    return (
        <>
            <div className='cart_page checkout_page'>
                <div className='mobile_cart_top'>
                    <div
                        className='l_arrow'
                        onClick={() => navigate('/')}
                    >
                        <i class="fas fa-arrow-left"></i>
                    </div>
                    <span>Checkout</span>
                    <div></div>
                </div>
                <CheckoutProducts list={location?.state?.selected} addressList={addressList} addressInfo={addressInfo} />
                {/* Checkout order summery */}
                <CheckoutOrderSummery
                    list={location?.state?.selected}
                    addressList={addressList}
                    isFromDetails={location?.state?.isFromDetails || false}
                />
            </div>
        </>
    )
}

export default CheckoutPage