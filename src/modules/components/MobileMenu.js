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
            <div className='item'>
                <img src={categoryIcon} />
                <div>Categories</div>
            </div>
            <div className='item'>
                <img src={campaignIcon} />
                <div>Campaigns</div>
            </div>
            <div
                className='item cp'
                onClick={() => navigate('/order-list')}
            >
                <img src={orderIcon} />
                <div>Order</div>
            </div>
            <div className='item'>
                <img src={wishListIcon} />
                <div>Wishlist</div>
            </div>
        </div>
    )
}

export default MobileMenu