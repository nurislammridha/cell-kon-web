import React, { useState } from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GetBuyerDetailsByBuyerId } from '../_redux/CommonAction'
import { useEffect } from 'react'
const CheckoutProducts = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const buyerDetails = useSelector((state) => state.homeInfo.buyerDetails);
    const { addressInfo } = buyerDetails || { addressInfo: [] }
    const [addressList, setAddressList] = useState({})
    const { buyerName, buyerPhone, detailsAddress, division, district, upazilla, union } = addressList || {}
    useEffect(() => {
        dispatch(GetBuyerDetailsByBuyerId())
    }, [])
    useEffect(() => {
        if (!location?.state?.isFromAddress) {
            setAddressList(addressInfo[0])
        }

    }, [buyerDetails])
    useEffect(() => {
        if (location?.state?.isFromAddress) {
            setAddressList(location?.state?.data)
        }
    }, [location])
    console.log('buyerDetails', buyerDetails)
    console.log('addressInfo', addressInfo)
    return (
        <div>
            <div className='checkout_address_section'>
                {addressInfo?.length > 0 ? (<>
                    <div className='checkout_title'>
                        <span>{buyerName}</span>
                        <a href
                            className='cp'
                            onClick={() => navigate('/user-address', { state: { isFromChackout: true } })}
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
                            onClick={() => navigate("/add-address")}
                        >
                            Add Address
                        </a>
                    </div>
                )}
            </div>
            <div className='cart_products'>
                <div className='cart_top'>
                    <span>5 Products</span>
                    <span>Variation</span>
                </div>
                <div className='cart_bottom'>
                    {[1, 4].map((item) => (
                        <div className='cart_item'>
                            <div className='cart_img'>
                                <img src={pro3} alt='product' />
                            </div>
                            <div className='cart_right'>
                                <div className='cart_title'>
                                    Origine Starde Revolutio red
                                    we we we qw  we er we r er er erwe 123
                                </div>
                                <div className='cart_taka_3 taka_q'>
                                    <span>&#2547;3,24,000X1</span>
                                    <span>Color: Blue</span>
                                </div>
                                <div className='cart_taka_3 taka_r'>
                                    <span>&#2547;3,24,000X1</span>
                                    <span>Size: 0</span>
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