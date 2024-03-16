import React from 'react'
import CheckoutOrderSummery from '../components/CheckoutOrderSummery'
import CheckoutProducts from '../components/CheckoutProducts'

const CheckoutPage = () => {
    return (
        <>
            <div className='cart_page checkout_page'>
                <CheckoutProducts />
                {/* Checkout order summery */}
                <CheckoutOrderSummery />
            </div>
        </>
    )
}

export default CheckoutPage