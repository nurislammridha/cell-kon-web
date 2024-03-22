import React, { useEffect, useState } from 'react'
import CartSummery from '../components/CartSummery'
import CartProducts from '../components/CartProducts'
import { useDispatch, useSelector } from 'react-redux'
import { GetCartListByBuyer } from '../_redux/CommonAction'

const CartPage = () => {
    const dispatch = useDispatch()
    const cartApiList = useSelector((state) => state.homeInfo.cartList);
    const isQuantityLoading = useSelector((state) => state.homeInfo.isQuantityLoading);
    const [selected, setSelected] = useState([])
    useEffect(() => {
        const buyerId = JSON.parse(localStorage.getItem("buyerData") || {})?._id
        dispatch(GetCartListByBuyer(buyerId))
    }, [])
    const handleSelect = (item) => {
        let isExistArr = selected.filter(el => el._id === item._id)

        if (isExistArr.length > 0) {
            setSelected(l => l.filter(el => el._id !== item._id));
        } else {
            setSelected(prevState => [...prevState, item]);
        }

    }
    return (
        <>
            <div className='cart_page'>
                {/* Cart products */}
                <CartProducts
                    obj={cartApiList}
                    isQuantityLoading={isQuantityLoading}
                    handleSelect={handleSelect}
                />
                {/* cart Summery */}
                <CartSummery selected={selected} />
            </div>
        </>
    )
}

export default CartPage