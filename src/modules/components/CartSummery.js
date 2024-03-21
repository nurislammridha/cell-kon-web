import React from 'react'
import { useNavigate } from 'react-router-dom'

const CartSummery = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className='cart_summery'>
                <div className='order_summery'>
                    Order Summary
                </div>
                <div className='cart_subtotal'>
                    <span>Subtotal (1 items)</span>
                    <span>&#2547;324000</span>
                </div>
                <div className='cart_subtotal'>
                    <span>Shipping Fee</span>
                    <span>&#2547;324000</span>
                </div>
                <div className='cart_total'>
                    <span>Total</span>
                    <span>&#2547;324000</span>
                </div>
                <div className='cp cart_checkout' onClick={() => navigate('/checkout')}>
                    Checkout
                </div>
            </div>
        </div>
    )
}

export default CartSummery