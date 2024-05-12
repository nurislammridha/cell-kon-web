import React, { useState } from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import deleteIcon from '../../assets/images/icons/deleteIcon.png'
import { useDispatch } from 'react-redux'
import { CartProductQuantity, DeleteFromCart } from '../_redux/CommonAction'
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from 'react-router-dom';
import { isCampaign } from 'src/assets/function/globalFunction'
const CartProducts = ({ obj = {}, isQuantityLoading, handleSelect, selected }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { productInfo: arr, _id: cartId, buyerId } = obj || []
    const handleQuantity = (number, productInfoId) => {
        dispatch(CartProductQuantity(number, productInfoId, cartId, buyerId))
    }
    const handleDelete = () => {
        confirmAlert({
            title: "Confirm To Delete",
            message: `Are you sure to delete product from cart?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => { dispatch(DeleteFromCart(selected)) },
                },
                {
                    label: "No",
                },
            ],
        });
    };
    return (
        <div className='cart_products'>
            <div className='cart_top'>
                <span>{arr?.length} Products</span>
                <a href onClick={() => handleDelete()} ><i class="fas fa-trash-alt"></i></a>
            </div>
            {/* for mobile */}
            <div className='mobile_cart_top'>
                <div
                    className='l_arrow'
                    onClick={() => navigate(-1)}
                >
                    <i class="fas fa-arrow-left"></i>
                </div>
                <span>{arr?.length} Products</span>
                <a href onClick={() => handleDelete()} >
                    <img src={deleteIcon} />
                </a>
            </div>
            <div className='cart_bottom'>
                {arr?.length > 0 ? arr.map((item, index) => (
                    <div key={index} className='cart_item'>
                        <div className='cart_check'>
                            <input
                                type='checkbox'
                                checked={selected.find(v => v._id === item._id)}
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
                                    <div className='cart_taka_2'>&#2547;{isCampaign(item?.campaignEndTime, item.campaignEndDate) ? item?.campaignPrice : Math.floor(item?.productDetails?.mrp - item?.productDetails?.mrp * item?.productDetails?.regularDiscount * 0.01)}</div>
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