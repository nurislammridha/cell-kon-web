import React, { useState } from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { useDispatch } from 'react-redux'
import { CartProductQuantity } from '../_redux/CommonAction'
const CartProducts = ({ obj = {}, isQuantityLoading, handleSelect }) => {
    const dispatch = useDispatch()
    const { productInfo: arr, _id: cartId, buyerId } = obj || []
    const handleQuantity = (number, productInfoId) => {
        dispatch(CartProductQuantity(number, productInfoId, cartId, buyerId))
    }

    return (
        <div className='cart_products'>
            <div className='cart_top'>
                <span>{arr?.length} Products</span>
                <a href><i class="fas fa-trash-alt"></i></a>
            </div>
            <div className='cart_bottom'>
                {arr?.length > 0 ? arr.map((item, index) => (
                    <div key={index} className='cart_item'>
                        <div className='cart_check'>
                            <input
                                type='checkbox'
                                onChange={() => handleSelect(item)}
                            />
                        </div>
                        <div className='cart_img'>
                            <img src={item.productImgUrl} alt='product' />
                        </div>
                        <div className='cart_right'>
                            <div className='cart_title'>
                                {item?.productDetails?.productName}
                            </div>
                            <div className='cart_amount'>
                                <div className='cart_taka'>
                                    <div className='cart_taka_1'>&#2547;{item?.productDetails?.mrp}</div>
                                    <div className='cart_taka_2'>&#2547;{Math.floor(item?.productDetails?.mrp - item?.productDetails?.mrp * item?.productDetails?.regularDiscount * 0.01)}</div>
                                </div>
                                <div className='quantity_button'>
                                    <div
                                        className='btn minus'
                                        onClick={() => !isQuantityLoading && item?.quantity > 1 ? handleQuantity(item?.quantity - 1, item._id) : {}}
                                    >
                                        <i class="fa fa-minus"></i>
                                    </div>
                                    <div className='btn number'>{item?.quantity}</div>
                                    <div
                                        className='btn plus'
                                        onClick={() => !isQuantityLoading && item?.quantity < 5 ? handleQuantity(item?.quantity + 1, item._id) : {}}
                                    ><i class="fa fa-plus"></i></div>
                                </div>

                            </div>
                        </div>
                    </div>
                )) : (
                    <div>
                        No Cart Added
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartProducts