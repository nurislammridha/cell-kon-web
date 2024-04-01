import React from 'react'
import cartIcon from '../../assets/images/icons/cart11.png'
import homeIcon from '../../assets/images/icons/home11.png'
import campaignIcon from '../../assets/images/icons/campaign11.png'
import userIcon from '../../assets/images/icons/userIcon.png'
const MobileFooter = () => {
    return (
        <div className='mobile_footer_container'>
            <div className='item'>
                <img src={homeIcon} />
                <div>HOME</div>
            </div>
            <div className='item'>
                <img src={campaignIcon} />
                <div>UTSHOB</div>
            </div>
            <div className='item'>
                <img src={cartIcon} />
                <div>CART</div>
            </div>
            <div className='item'>
                <img src={userIcon} />
                <div>Profile</div>
            </div>
        </div>
    )
}

export default MobileFooter