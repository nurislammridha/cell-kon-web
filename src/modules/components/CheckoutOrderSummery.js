import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getSubTotal } from '../../assets/function/globalFunction'
import { showToast } from 'src/utils/ToastHelper'
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FalseOrderCreated, SubmitOrder } from '../_redux/CommonAction';
import { useDispatch, useSelector } from 'react-redux';
const CheckoutOrderSummery = ({ list, addressList, isFromDetails }) => {
    const dispatch = useDispatch();
    const [isPromo, setPromo] = useState(false)
    const { district } = addressList || {}
    const navigate = useNavigate()
    const isOrderCreated = useSelector((state) => state.homeInfo.isOrderCreated);
    const isOrderLoading = useSelector((state) => state.homeInfo.isOrderLoading);
    const location = useLocation();

    const orderCon = () => {
        dispatch(SubmitOrder(list, addressList, isFromDetails))
        // confirmAlert({
        //     title: "Confirm To Order",
        //     message: `Are you sure to order this product(s)?`,
        //     closeOnEscape: true,
        //     buttons: [
        //         {
        //             label: "Yes",
        //             onClick: () => { dispatch(SubmitOrder(list, addressList, isFromDetails)) },
        //         },
        //         {
        //             label: "No",
        //         },
        //     ],
        // });
    };
    useEffect(() => {
        if (isOrderCreated) {
            navigate('/place-order')
            dispatch(FalseOrderCreated())
        }
    }, [isOrderCreated])
    const handleOrder = () => {
        if (addressList === undefined) {
            showToast('error', "Please Add Delivery Address")
        } else {
            // navigate("/payment", { state: { list, addressList, isFromDetails } })
            orderCon()
        }

    }
    // console.log('addressList 2',)
    return (
        <div>
            <div className='cart_summery'>
                <div className='order_summery'>
                    Order Summary
                </div>
                <div className='cart_subtotal'>
                    <span>Subtotal ({list?.length} items)</span>
                    <span>&#2547;{getSubTotal(list)}</span>
                </div>
                <div className='cart_subtotal'>
                    <span>Shipping Fee</span>
                    <span>&#2547;{district === "Dhaka" ? 50 : 100}</span>
                </div>
                <div
                    className='coupon_code'
                    onClick={() => setPromo(true)}
                >
                    Have a coupon code?
                </div>
                {isPromo && (<>
                    <div className='promo_code'>
                        <input type="text" />
                        <a href>Apply</a>
                    </div></>)}
                <div className='cart_total'>
                    <span>Total</span>
                    <span>&#2547;{getSubTotal(list) + (district === "Dhaka" ? 50 : 100)}</span>
                </div>
                <div className='order_policy'>
                    *Order Delivery Policy for this order can be found <a href>here</a>
                </div>
                <div className='cp cart_checkout' onClick={() => { !isOrderLoading && handleOrder() }}>
                    {isOrderLoading ? "Ordering..." : "Please Order"}
                </div>
            </div>
        </div>
    )
}

export default CheckoutOrderSummery