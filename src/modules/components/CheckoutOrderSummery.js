import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getSubTotal } from '../../assets/function/globalFunction'

const CheckoutOrderSummery = ({ list, addressList }) => {
    const { district } = addressList || {}
    const navigate = useNavigate()
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
                <div className='promo_code'>
                    <input type="text" />
                    <a href>Apply</a>
                </div>
                <div className='cart_total'>
                    <span>Total</span>
                    <span>&#2547;{getSubTotal(list) + (district === "Dhaka" ? 50 : 100)}</span>
                </div>
                <div className='order_policy'>
                    *Order Delivery Policy for this order can be found <a href>here</a>
                </div>
                <div className='cp cart_checkout' onClick={() => navigate("/payment", { state: { list, addressList } })}>
                    Please Order
                </div>
            </div>
        </div>
    )
}

export default CheckoutOrderSummery