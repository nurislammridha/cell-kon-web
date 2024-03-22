import React from 'react'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../../utils/ToastHelper'

const CartSummery = ({ selected }) => {
    const navigate = useNavigate()
    const handleCheckout = () => {
        if (selected.length === 0) {
            showToast("error", "Please select at least one product")
        } else {
            navigate('/checkout', { state: { selected } })
        }
    }
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
                <div
                    className='cp cart_checkout'
                    onClick={() => handleCheckout()}>
                    Checkout
                </div>
            </div>
        </div>
    )
}

export default CartSummery