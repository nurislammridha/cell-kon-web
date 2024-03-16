import React from 'react'

const AddCardOrderSummery = () => {
    return (
        <div>
            <div className='cart_summery'>
                <div className='order_summery'>
                    Order Summary
                </div>
                <div className='cart_subtotal'>
                    <span>Subtotal (1 items & Delivery Fee)</span>
                    <span>&#2547;324000</span>
                </div>

                <div className='cart_total'>
                    <span>Total</span>
                    <span>&#2547;324000</span>
                </div>
                <div className='cart_checkout'>
                    Please Order
                </div>
            </div>
        </div>
    )
}

export default AddCardOrderSummery