import React from 'react'
import { useNavigate } from 'react-router-dom'

import userLogo from "../../assets/images/icons/userIcon.png"
import userIcon from "../../assets/images/icons/user.png"
import orderIcon from "../../assets/images/icons/order.png"
import addressIcon from "../../assets/images/icons/address.png"
import wishIcon from "../../assets/images/icons/wishg.png"
import { useDispatch, useSelector } from 'react-redux'
import { LogoutRequest, UserProfileUpdate } from '../_redux/CommonAction'
const UserMenu = ({ buyerDetails, activeTab = 'profile', setActiveTab = null }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userUpdted = useSelector((state) => state.homeInfo.userUpdted);

    const isInUserInfoTabs = typeof setActiveTab === 'function'

    const handleChangeImg = (img) => {
        if (!img) {
            return
        }
        dispatch(UserProfileUpdate(img, buyerDetails?.buyerImgUrl?.publicId, userUpdted))
    }

    const handleMenuSelect = (menuName) => {
        if (menuName === 'profile') {
            if (isInUserInfoTabs) {
                setActiveTab('profile')
                return
            }
            navigate('/user-info')
            return
        }

        if (menuName === 'reviews') {
            if (isInUserInfoTabs) {
                setActiveTab('reviews')
                return
            }
            navigate('/user-info?tab=reviews')
            return
        }

        if (menuName === 'order') {
            navigate('/order-list')
            return
        }

        if (menuName === 'address') {
            navigate('/user-address')
            return
        }

        if (menuName === 'wishlist') {
            navigate('/wishlist')
        }
    }

    const handleLogout = () => {
        dispatch(LogoutRequest())
        navigate('/')
    }

    return (
        <>
            <div className='left'>
                <div className='user_topbar'>
                    <div className='img_container'>
                        <div className='img'>
                            <img src={buyerDetails?.buyerImgUrl?.url ? buyerDetails?.buyerImgUrl?.url : userLogo} alt='user' />
                            <label htmlFor='file-upload'><span><i className='fas fa-edit'></i></span></label>
                            <input
                                type='file'
                                className='d_none'
                                accept='image/*'
                                id='file-upload'
                                onChange={(e) =>
                                    handleChangeImg(e.target.files[0])
                                }
                            />
                        </div>
                    </div>

                    <div className='user_meta'>
                        <p className='name'>{buyerDetails?.buyerName || 'User'}</p>
                        <p className='phone'>{buyerDetails?.buyerPhone || buyerDetails?.buyerEmail || 'No phone added'}</p>
                    </div>

                    <button
                        type='button'
                        className='logout mobile_logout'
                        onClick={() => handleLogout()}
                    >
                        <p>Logout</p>
                    </button>
                </div>

                <div className='menu_scroll_wrap'>
                    <div className='menu_container'>
                        <div className={activeTab === 'profile' ? 'cp menu active' : 'cp menu'} onClick={() => handleMenuSelect('profile')}>
                            <img src={userIcon} alt='user icon' />
                            <p>User Info</p>
                        </div>
                        <div className={activeTab === 'order' ? 'cp menu mt32 active' : 'cp menu mt32'} onClick={() => handleMenuSelect('order')}>
                            <img src={orderIcon} alt='user icon' />
                            <p>Order</p>
                        </div>
                        <div className={activeTab === 'address' ? 'cp menu mt32 active' : 'cp menu mt32'} onClick={() => handleMenuSelect('address')}>
                            <img src={addressIcon} alt='user icon' />
                            <p>Address</p>
                        </div>
                        <div className={activeTab === 'wishlist' ? 'cp menu mt32 active' : 'cp menu mt32'} onClick={() => handleMenuSelect('wishlist')}>
                            <img src={wishIcon} alt='user icon' />
                            <p>Wishlist</p>
                        </div>
                        <div className={activeTab === 'reviews' ? 'cp menu mt32 active' : 'cp menu mt32'} onClick={() => handleMenuSelect('reviews')}>
                            <img src={wishIcon} alt='user icon' />
                            <p>Reviews</p>
                        </div>
                    </div>
                </div>
                <div
                    className='logout desktop_logout'
                    onClick={() => handleLogout()}
                >
                    <img src={userIcon} alt='user icon' />
                    <p>Logout</p>
                </div>
            </div>
        </>
    )
}

export default UserMenu