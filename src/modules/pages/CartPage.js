import React, { useEffect } from 'react'
import CartSummery from '../components/CartSummery'
import CartProducts from '../components/CartProducts'
import { useDispatch, useSelector } from 'react-redux'
import { GetCartListByBuyer } from '../_redux/CommonAction'

const CartPage = () => {
    const dispatch = useDispatch()
    const cartApiList = useSelector((state) => state.homeInfo.cartList);
    useEffect(() => {
        const buyerId = JSON.parse(localStorage.getItem("buyerData"))._id
        dispatch(GetCartListByBuyer(buyerId))
    }, [])
    return (
        <>
            <div className='cart_page'>
                {/* Cart products */}
                <CartProducts obj={cartApiList} />
                {/* cart Summery */}
                <CartSummery />
            </div>
        </>
    )
}

export default CartPage