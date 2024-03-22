import React, { useEffect, useState } from 'react'
import CheckoutOrderSummery from '../components/CheckoutOrderSummery'
import CheckoutProducts from '../components/CheckoutProducts'
import { useLocation } from 'react-router-dom';
import { GetBuyerDetailsByBuyerId } from '../_redux/CommonAction';
import { useDispatch, useSelector } from 'react-redux';

const CheckoutPage = () => {
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
                <CheckoutProducts list={location?.state?.selected} addressList={addressList} addressInfo={addressInfo} />
                {/* Checkout order summery */}
                <CheckoutOrderSummery list={location?.state?.selected} addressList={addressList} />
            </div>
        </>
    )
}

export default CheckoutPage