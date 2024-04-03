import React, { useEffect } from 'react'
import PaymentOrderSummery from '../components/PaymentOrderSummery'
import PaymentMethod from '../components/PaymentMethod'
import SavedAccounts from '../components/SavedAccounts'
import RecomendedMethods from '../components/RecomendedMethods'
import { useLocation, useNavigate } from 'react-router-dom'
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch, useSelector } from 'react-redux'
import { FalseOrderCreated, SubmitOrder } from '../_redux/CommonAction'
import MobileCommonHeader from '../components/MobileCommonHeader'
const PaymentPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const isOrderCreated = useSelector((state) => state.homeInfo.isOrderCreated);
    const isOrderLoading = useSelector((state) => state.homeInfo.isOrderLoading);
    // const isOrderLoading = true


    const handleOrder = () => {
        confirmAlert({
            title: "Confirm To Order",
            message: `Are you sure to order this product(s)?`,
            closeOnEscape: true,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => { dispatch(SubmitOrder(location?.state?.list, location?.state?.addressList, location?.state?.isFromDetails)) },
                },
                {
                    label: "No",
                },
            ],
        });
    };
    useEffect(() => {
        if (isOrderCreated) {
            navigate('/')
            dispatch(FalseOrderCreated())
        }
    }, [isOrderCreated])
    console.log('isOrderCreated', isOrderCreated)
    return (
        <>
            <div className='mobile_payment'>
                <div className='details_top'>
                    <div
                        className='l_arrow'
                        onClick={() => navigate('/')}
                    >
                        <i class="fas fa-arrow-left"></i>
                    </div>
                    <div>Payment Method</div>
                    <div>

                    </div>
                </div>
            </div>
            <div className={isOrderLoading ? 'cart_page payment_page blur' : 'cart_page payment_page'}>

                <div>
                    {/* recommended method */}
                    <RecomendedMethods />
                    {/* saved account */}
                    <SavedAccounts />
                    {/* payment method */}
                    <PaymentMethod handleOrder={handleOrder} isOrderLoading={isOrderLoading} />
                </div>
                {/* //payment order summery */}
                <PaymentOrderSummery
                    list={location?.state?.list}
                    addressList={location?.state?.addressList}
                />

            </div>
            {isOrderLoading && (<div className='ordering_products'>Ordering....</div>)}
        </>
    )
}

export default PaymentPage