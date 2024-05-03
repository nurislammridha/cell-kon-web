import React from 'react'
import searchIcon from '../../assets/images/icons/search.png'
import logoMobile from '../../assets/images/other/logoMobile.png'
import sellBlack from '../../assets/images/icons/sellkonBlack.png'
import notificationIcon from '../../assets/images/icons/notification111.png'
import arrowLeft from '../../assets/images/icons/arrow_left.png'
import shareIcon from '../../assets/images/icons/share_icon.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
const MobileHeader = ({ search, setSearch }) => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const [isShowSearch, setShowSearch] = useState(false)
    const [isShowSearchIcon, setShowSearchIcon] = useState(false)
    const [isShowNotification, setShowNotification] = useState(false)
    const [isShowLogo, setShowLogo] = useState(false)
    const [isShowLongLogo, setShowLongLogo] = useState(false)
    const [isShowBackIcon, setShowBackIcon] = useState(false)
    const [isShowShareIcon, setShowShareIcon] = useState(false)
    useEffect(() => {
        if (pathname === "/") {
            //true
            setShowLongLogo(true)
            setShowNotification(true)
            setShowSearchIcon(true)
            //false
            setShowBackIcon(false)
            setShowSearch(false)
            setShowShareIcon(false)
        } else if (pathname.substring(0, 5) === '/shop' || pathname === '/all-products') {
            setShowNotification(true)
            setShowBackIcon(true)
            setShowSearch(true)
            //false item
            setShowLogo(false)
            setShowLongLogo(false)
            setShowSearchIcon(false)
            setShowShareIcon(false)
        } else if (pathname.substring(0, 16) === '/product-details') {
            //true
            setShowShareIcon(true)
            setShowBackIcon(true)
            //false
            setShowNotification(false)
            setShowSearch(false)
            setShowSearchIcon(false)
            setShowLogo(false)
            setShowLongLogo(false)
        } else {
            //true
            setShowBackIcon(true)
            setShowNotification(true)
            //false
            setShowShareIcon(false)
            setShowShareIcon(false)
            setShowSearch(false)
            setShowSearchIcon(false)
            setShowLogo(false)
            setShowLongLogo(false)
        }

    }, [pathname])

    return (
        <div className='mobile_header_container'>
            <div className='sell_icon'>
                {isShowLongLogo &&
                    <img
                        onClick={() => {
                            navigate("/")
                            setSearch("")
                        }}
                        className='nsearch_icon'
                        src={logoMobile}
                        alt='sell icon'
                    />}
                {isShowLogo &&
                    <img
                        onClick={() => {
                            navigate("/")
                            setSearch("")
                        }}
                        className='search_icon'
                        src={sellBlack}
                        alt='sell icon'
                    />}
                {isShowBackIcon && <img onClick={() => navigate(-1)} className='search_icon' src={arrowLeft} alt='sell icon' />}

            </div>
            {isShowSearch && <div className='mobile_search'>
                <img className='mSearch_icon' src={searchIcon} alt='icon' />
                <input
                    name='search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type='text'
                    placeholder='Search In Sellkon'

                />

            </div>}
            <div className='sm_icon'>
                {isShowSearchIcon && <img
                    onClick={() => {
                        setShowSearchIcon(false)
                        setShowSearch(true)
                        setShowLogo(true)
                        setShowLongLogo(false)
                    }}
                    src={searchIcon} alt='icon' />}
                <div>
                    {isShowShareIcon && <img src={shareIcon} alt='icon' />}
                    {isShowNotification && <img src={notificationIcon} alt='icon' />}
                    {/* <label>1</label> */}
                </div>
            </div>
        </div>
    )
}

export default MobileHeader