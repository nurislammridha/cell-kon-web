import React, { useEffect, useState } from 'react'
import CartSummery from '../components/CartSummery'
import CartProducts from '../components/CartProducts'
import { useDispatch, useSelector } from 'react-redux'
import { FalseCartCalled, GetCartListByBuyer } from '../_redux/CommonAction'
import { getSubTotal } from '../../assets/function/globalFunction'

const CartPage = () => {
    const dispatch = useDispatch()
    const cartApiList = useSelector((state) => state.homeInfo.cartList);
    const isQuantityLoading = useSelector((state) => state.homeInfo.isQuantityLoading);
    const isCartListCalled = useSelector((state) => state.homeInfo.isCartListCalled);
    const isRemovedFromCart = useSelector((state) => state.homeInfo.isRemovedFromCart);
    const [selected, setSelected] = useState([])
    const handleSelect = (item) => {
        let isExistArr = selected.filter(el => el._id === item._id)
        if (isExistArr.length > 0) {
            setSelected(l => l.filter(el => el._id !== item._id));
        } else {
            setSelected(prevState => [...prevState, item]);
        }

    }
    useEffect(() => {
        const buyerId = JSON.parse(localStorage.getItem("buyerData") || {})?._id
        dispatch(GetCartListByBuyer(buyerId))
    }, [])
    const newArr = () => {
        let arr = []
        let cart = JSON.parse(localStorage.getItem("cartList"))?.productInfo
        console.log('cart', cart)
        cartApiList?.productInfo.forEach(item => {
            selected.forEach(item2 => {
                if (item2._id === item._id) {
                    arr.push(item)
                }
            });
        });

        return arr
    }
    useEffect(() => {
        if (isRemovedFromCart) {
            setSelected([])
        } else if (isCartListCalled && cartApiList?.productInfo?.length > 0 && selected?.length > 0) {
            setSelected(newArr())
            // dispatch(FalseCartCalled())
        }
    }, [cartApiList])
    // console.log('selected', selected)
    return (
        <>
            <div className='cart_page'>
                {/* Cart products */}
                <CartProducts
                    obj={cartApiList}
                    isQuantityLoading={isQuantityLoading}
                    handleSelect={handleSelect}
                    selected={selected}
                />
                {/* cart Summery */}
                <CartSummery selected={selected} subTotal={getSubTotal(selected)} />
            </div>
        </>
    )
}

export default CartPage