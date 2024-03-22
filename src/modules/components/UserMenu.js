import React from 'react'
import { useNavigate } from 'react-router-dom'

import userLogo from "../../assets/images/icons/userIcon.png"
import userIcon from "../../assets/images/icons/user.png"
import orderIcon from "../../assets/images/icons/order.png"
import addressIcon from "../../assets/images/icons/address.png"
import wishIcon from "../../assets/images/icons/wishg.png"
const UserMenu = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='left'>
                <div className='img_container'>
                    <div className='img'>
                        <img src={userLogo} alt='user' />
                        <a href><i class="fas fa-edit"></i></a>
                    </div>
                </div>
                <div className='menu_container'>
                    <div className='cp menu'>
                        <img src={userIcon} alt='user icon' />
                        <p>User Info</p>
                    </div>
                    <div className='cp menu mt32' onClick={() => navigate('/order-list')}>
                        <img src={orderIcon} alt='user icon' />
                        <p>Order</p>
                    </div>
                    <div className='cp menu mt32' onClick={() => navigate('/user-address')}>
                        <img src={addressIcon} alt='user icon' />
                        <p>Address</p>
                    </div>
                    <div className='cp menu mt32'>
                        <img src={wishIcon} alt='user icon' />
                        <p>Wishlist</p>
                    </div>
                </div>
                <div className='logout'>
                    <img src={userIcon} alt='user icon' />
                    <p>Logout</p>
                </div>
            </div>
        </>
    )
}

export default UserMenu