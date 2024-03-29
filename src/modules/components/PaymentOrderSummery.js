import React from 'react'
import { getSubTotal } from 'src/assets/function/globalFunction'

const PaymentOrderSummery = ({ list, addressList }) => {
    const { district } = addressList || {}
    return (
        <div>
            <div className='cart_summery'>
                <div className='order_summery'>
                    Order Summary
                </div>
                <div className='cart_subtotal'>
                    <span>Subtotal ({list?.length} items & Delivery Fee)</span>
                    <span>&#2547;{getSubTotal(list)}</span>
                </div>

                <div className='cart_total'>
                    <span>Total</span>
                    <span>&#2547;{getSubTotal(list) + (district === "Dhaka" ? 50 : 100)}</span>
                </div>

            </div>
        </div>
    )
}

export default PaymentOrderSummery