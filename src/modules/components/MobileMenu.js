import React from 'react'
import categoryIcon from '../../assets/images/icons/category11.png'
import orderIcon from '../../assets/images/icons/order.png'
import campaignIcon from '../../assets/images/icons/campaign11.png'
import wishListIcon from '../../assets/images/icons/wishg.png'
const MobileMenu = () => {
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
            <div className='item'>
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