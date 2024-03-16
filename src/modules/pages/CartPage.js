import React from 'react'
import CartSummery from '../components/CartSummery'
import CartProducts from '../components/CartProducts'

const CartPage = () => {
    return (
        <>
            <div className='cart_page'>
                {/* Cart products */}
                <CartProducts />
                {/* cart Summery */}
                <CartSummery />
            </div>
        </>
    )
}

export default CartPage