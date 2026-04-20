import React from 'react'
import categoryIcon from '../../assets/images/icons/mobileCategory.png'
import orderIcon from '../../assets/images/icons/mobileOrder.png'
import campaignIcon from '../../assets/images/icons/mobileCampaign.png'
import wishListIcon from '../../assets/images/icons/mobileWish.png'
import { useNavigate } from 'react-router-dom'
const MobileMenu = () => {
    const navigate = useNavigate()
    return (
        <div className='mobile_menu_container'>
            <div className='item cp' onClick={() => navigate('/all-products')}>
                <img src={categoryIcon} alt='categories' />
                <div>Categories</div>
            </div>
            <div className='item cp' onClick={() => navigate('/')}>
                <img src={campaignIcon} alt='campaigns' />
                <div>Campaigns</div>
            </div>
            <div
                className='item cp'
                onClick={() => navigate('/order-list')}
            >
                <img src={orderIcon} alt='orders' />
                <div>Order</div>
            </div>
            <div className='item cp' onClick={() => navigate('/wishlist')}>
                <img src={wishListIcon} alt='wishlist' />
                <div>Wishlist</div>
            </div>
        </div>
    )
}

export default MobileMenu