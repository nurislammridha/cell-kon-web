import React, { useState } from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GetBuyerDetailsByBuyerId } from '../_redux/CommonAction'
import { useEffect } from 'react'
const CheckoutProducts = ({ list, addressList, addressInfo }) => {
    const navigate = useNavigate()

    const { buyerName, buyerPhone, detailsAddress, division, district, upazilla, union } = addressList || {}

    console.log('list', list)
    return (
        <div>
            <div className='checkout_address_section'>
                {addressInfo?.length > 0 ? (<>
                    <div className='checkout_title'>
                        <span>{buyerName}</span>
                        <a href
                            className='cp'
                            onClick={() => navigate('/user-address', { state: { isFromChackout: true, selected: list } })}
                        >
                            <i class="fas fa-edit"></i>
                        </a>
                    </div>
                    <div className='item checkout_phone'>{buyerPhone}</div>
                    <div className='item checkout_address'>
                        <span>{detailsAddress}</span>
                        <div>{`${division}-${district}-${upazilla}-${union}`}</div>
                    </div>
                </>) : (
                    <div className='checkout_title'>
                        <span>No delivery address found</span>
                        <a href
                            className='btn_delivery_address'
                            onClick={() => navigate("/add-address", { state: { isFromCheckout: true, selected: list } })}
                        >
                            Add Address
                        </a>
                    </div>
                )}
            </div>
            <div className='cart_products'>
                <div className='cart_top'>
                    <span>{list?.length} Products</span>
                    <span>Variation</span>
                </div>
                <div className='cart_bottom'>
                    {list?.length > 0 && list?.map((item, index) => (
                        <div key={index} className='cart_item'>
                            <div className='cart_img'>
                                <img src={item.productImgUrl} alt='product' />
                            </div>
                            <div className='cart_right'>
                                <div className='cart_title'>
                                    {item?.productDetails?.productName}
                                </div>
                                <div className='cart_taka_3 taka_q' >
                                    <span style={{ textDecoration: 'line-through' }}>&#2547;{item?.productDetails?.mrp}</span>
                                    <span>Color: {item.colorName}</span>
                                </div>
                                <div className='cart_taka_3 taka_r'>
                                    <span>
                                        &#2547;
                                        {
                                            item?.productDetails?.isCampaign ? item?.productDetails?.campaignDiscount : item?.productDetails?.regularDiscount}
                                    </span>
                                    <span>Size: {item.sizeName}</span>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CheckoutProducts