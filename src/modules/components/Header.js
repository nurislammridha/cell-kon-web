import React, { useEffect, useState } from 'react'
import sellConIconBlack from '../../assets/images/other/SellkonBlack.png'
import userIcon from '../../assets/images/icons/user.png'
import userLogo from "../../assets/images/icons/userIcon.png"
import cartIcon from '../../assets/images/icons/menu_bar/cart icon select.png'
import loveIcon from '../../assets/images/icons/love.png'
import homeIconSelect from '../../assets/images/icons/menu_bar/home icon select.png'
import homeIconDeSelect from '../../assets/images/icons/menu_bar/home icon deselect.png'
import categoryIcon from '../../assets/images/icons/menu_bar/Categories icon select.png'
import campaignIcon from '../../assets/images/icons/campaign.png'
import notificationIcon from '../../assets/images/icons/notification.png'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import MobileHeader from './MobileHeader'
const Header = ({ isLogin, search, setSearch }) => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const cartApiList = useSelector((state) => state.homeInfo.cartList);
    const userUpdted = useSelector((state) => state.homeInfo.userUpdted);
    const buyerDetails = useSelector((state) => state.homeInfo.buyerDetails);
    const loggedOut = useSelector((state) => state.homeInfo.loggedOut);
    const [cartList, setCartList] = useState([])

    const [userImgUrl, setUserImgUrl] = useState("")
    useEffect(() => {
        if (userUpdted) {
            setUserImgUrl(JSON.parse(localStorage.getItem("buyerData"))?.buyerImgUrl)
        }
        setCartList(JSON.parse(localStorage.getItem("cartList"))?.productInfo || [])
    }, [userUpdted, cartApiList])
    useEffect(() => {
        setCartList(JSON.parse(localStorage.getItem("cartList"))?.productInfo || [])
        setUserImgUrl(JSON.parse(localStorage.getItem("buyerData"))?.buyerImgUrl)
    }, [])
    useEffect(() => {
        setUserImgUrl(JSON.parse(localStorage.getItem("buyerData"))?.buyerImgUrl)
    }, [buyerDetails])
    useEffect(() => {
        setCartList(JSON.parse(localStorage.getItem("cartList"))?.productInfo || [])
        setUserImgUrl(JSON.parse(localStorage.getItem("buyerData"))?.buyerImgUrl)
    }, [loggedOut])
    useEffect(() => {
        if (search.length > 0 && pathname !== "all-products" && pathname.substring(0, 5) !== "/shop") {
            navigate('/all-products')
        }
        console.log('search', search)
    }, [search])
    // console.log('pathname', pathname.substring(0, 5))
    return (<>
        <div className='header'>
            <div className='header_top_container'>
                <div className='w-1176 '>
                    <div className='header_top'>
                        <div
                            className='header_top_img'
                            onClick={() => {
                                navigate("/")
                                setSearch("")
                            }}
                        >
                            <img src={sellConIconBlack} alt='cell kon icon' />
                        </div>
                        <div className='header_top_search'>
                            <div className='search'>
                                <i class="fas fa-search"></i>
                                {/* <label className='ml-8'>Search</label> */}
                            </div>
                            <div className='input'>
                                <input
                                    type='text'
                                    placeholder='Search In Sellkon'
                                    name="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                        </div>
                        <div className='header_top_icon'>
                            <div
                                className='top_icon cart_icon'
                                onClick={() => {
                                    navigate(isLogin ? '/cart' : '/login')
                                    setSearch("")
                                }}
                            >
                                <img src={cartIcon} alt='icon' />
                                {cartList?.length > 0 && (<span>{cartList?.length}</span>)}
                            </div>
                            {/* <div className='top_icon'>
                                <img src={loveIcon} alt='icon' />
                                <span>1</span>
                            </div>
                            <div className='top_icon'>
                                <img src={notificationIcon} alt='icon' />
                                <span>1</span>
                            </div> */}
                            <div
                                className='top_icon'
                                onClick={() => {
                                    navigate(isLogin ? '/user-info' : '/login')
                                    setSearch("")
                                }}
                            >
                                <img src={isLogin ? userImgUrl?.url?.length > 0 ? userImgUrl.url : userLogo : userLogo} alt='icon' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='header_bottom_container'>
                <div className='w-1176'>
                    <div className='header_bottom'>
                        <div
                            className='menu_icon'
                            onClick={() => navigate('/all-products')}
                        >
                            <img className='top_icon' src={categoryIcon} />
                            <label className='ml-8 cp'>Categories</label>
                        </div>
                        <div
                            className='menu_icon'
                            onClick={() => {
                                navigate('/')
                                setSearch("")
                            }}
                        >
                            <img className='top_icon' src={pathname === '/' ? homeIconSelect : homeIconDeSelect} />
                            <label className='ml-8 cp'>Home</label>
                        </div>
                        <div
                            className='menu_icon'
                            onClick={() => {
                                navigate('/')
                                setSearch("")
                            }}
                        >
                            <img className='top_icon' src={campaignIcon} />
                            <label className='ml-8 cp'>Campaigns</label>
                        </div>
                        {/* <div className='menu_icon'>
                        <img className='top_icon' src={campaignIcon} />
                        <label className='ml-8 cp'>Campaigns</label>
                    </div> */}
                    </div>
                </div>
            </div>
        </div>
        <MobileHeader search={search} setSearch={setSearch} />
    </>)
}

export default Header