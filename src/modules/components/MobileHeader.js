import React from 'react'
import searchIcon from '../../assets/images/icons/search.png'
import logoMobile from '../../assets/images/other/logoMobile.png'
import notificationIcon from '../../assets/images/icons/notification111.png'
const MobileHeader = () => {
    return (
        <div className='mobile_header_container'>
            <div className='sell_icon'>
                <img src={logoMobile} alt='sell icon' />
            </div>
            <div className='sm_icon'>
                <img src={searchIcon} alt='icon' />
                <div>
                    <img src={notificationIcon} alt='icon' />
                    {/* <label>1</label> */}
                </div>
            </div>
        </div>
    )
}

export default MobileHeader