import React from 'react'

const CheckoutOrderSummery = () => {
    return (
        <div>
            <div className='cart_summery'>
                <div className='order_summery'>
                    Order Summary
                </div>
                <div className='cart_subtotal'>
                    <span>Subtotal (2 items)</span>
                    <span>&#2547;324000</span>
                </div>
                <div className='cart_subtotal'>
                    <span>Shipping Fee</span>
                    <span>&#2547;500</span>
                </div>
                <div className='promo_code'>
                    <input type="text" />
                    <a href>Apply</a>
                </div>
                <div className='cart_total'>
                    <span>Total</span>
                    <span>&#2547;324000</span>
                </div>
                <div className='order_policy'>
                    *Order Delivery Policy for this order can be found <a href>here</a>
                </div>
                <div className='cart_checkout'>
                    Please Order
                </div>
            </div>
        </div>
    )
}

export default CheckoutOrderSummery