import React from 'react'
import { getSubTotal } from 'src/assets/function/globalFunction'
import { getShippingFeeByAddress } from '../../assets/function/shippingFee'

const PaymentOrderSummery = ({ list, addressList }) => {
    const shippingFee = getShippingFeeByAddress(addressList || {})
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
                    <span>&#2547;{getSubTotal(list) + shippingFee}</span>
                </div>

            </div>
        </div>
    )
}

export default PaymentOrderSummery