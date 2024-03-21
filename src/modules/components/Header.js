import React, { useEffect, useState } from 'react'
import sellConIconBlack from '../../assets/images/other/SellkonBlack.png'
import userIcon from '../../assets/images/icons/user.png'
import cartIcon from '../../assets/images/icons/cart.png'
import loveIcon from '../../assets/images/icons/love.png'
import homeIcon from '../../assets/images/icons/home.png'
import categoryIcon from '../../assets/images/icons/category.png'
import campaignIcon from '../../assets/images/icons/campaign.png'
import notificationIcon from '../../assets/images/icons/notification.png'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Header = () => {
    const navigate = useNavigate()
    const cartApiList = useSelector((state) => state.homeInfo.cartList);
    const [cartList, setCartList] = useState([])
    useEffect(() => {
        setCartList(JSON.parse(localStorage.getItem("cartList")).productInfo)
    }, [])
    useEffect(() => {
        setCartList(JSON.parse(localStorage.getItem("cartList")).productInfo)
    }, [cartApiList])

    return (
        <div className='header'>
            <div className='w-1176'>
                <div className='header_top'>
                    <div
                        className='header_top_img'
                        onClick={() => navigate("/")}
                    >
                        <img src={sellConIconBlack} alt='cell kon icon' />
                    </div>
                    <div className='header_top_search'>
                        <div className='input'>
                            <input
                                type='text'
                                placeholder='Search In Cellkon'
                                name="search"
                            />
                        </div>
                        <div className='search'>
                            <i class="fas fa-search"></i>
                            <label className='ml-8'>Search</label>
                        </div>
                    </div>
                    <div className='header_top_icon'>
                        <div
                            className='top_icon'
                            onClick={() => navigate('/cart')}
                        >
                            <img src={cartIcon} alt='icon' />
                            {cartList?.length > 0 && (<span>{cartList?.length}</span>)}
                        </div>
                        <div className='top_icon'>
                            <img src={loveIcon} alt='icon' />
                            {/* <span>1</span> */}
                        </div>
                        <div className='top_icon'>
                            <img src={notificationIcon} alt='icon' />
                            <span>1</span>
                        </div>
                        <div className='top_icon'>
                            <img src={userIcon} alt='icon' />
                        </div>
                    </div>
                </div>
                <div className='header_bottom'>
                    <div className='menu_icon'>
                        <img className='top_icon' src={categoryIcon} />
                        <label className='ml-8 cp'>Categories</label>
                    </div>
                    <div className='menu_icon'>
                        <img className='top_icon' src={homeIcon} />
                        <label className='ml-8 cp'>Home</label>
                    </div>
                    <div className='menu_icon'>
                        <img className='top_icon' src={campaignIcon} />
                        <label className='ml-8 cp'>Campaigns</label>
                    </div>
                    <div className='menu_icon'>
                        <img className='top_icon' src={campaignIcon} />
                        <label className='ml-8 cp'>Campaigns</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header