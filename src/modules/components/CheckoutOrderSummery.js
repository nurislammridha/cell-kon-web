import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSubTotal } from '../../assets/function/globalFunction'
import { showToast } from 'src/utils/ToastHelper'

const CheckoutOrderSummery = ({ list, addressList, isFromDetails }) => {
    const [isPromo, setPromo] = useState(false)
    const { district } = addressList || {}
    const navigate = useNavigate()
    const handleOrder = () => {
        if (addressList === undefined) {
            showToast('error', "Please Add Delivery Address")
        } else {
            navigate("/payment", { state: { list, addressList, isFromDetails } })
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
                <div className='cp cart_checkout' onClick={() => handleOrder()}>
                    Please Order
                </div>
            </div>
        </div>
    )
}

export default CheckoutOrderSummery