import React, { useState } from 'react'
import cartIcon from '../../assets/images/icons/cartFooter.png'
import homeIcon from '../../assets/images/icons/home11.png'
import campaignIcon from '../../assets/images/icons/campaign11.png'
import userLogo from '../../assets/images/icons/userIcon.png'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
const MobileFooter = ({ isLogin }) => {
    const navigate = useNavigate()
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
    return (
        <div className='mobile_footer_container'>
            <div
                className='item'
                onClick={() => navigate('/')}
            >
                <img src={homeIcon} />
                <div>HOME</div>
            </div>
            <div className='item'>
                <img src={campaignIcon} />
                <div>UTSHOB</div>
            </div>
            <div
                className='item'
                onClick={() => navigate('/cart')}
            >
                <span className='mobile_cart'>
                    <img src={cartIcon} />
                    {cartList?.length > 0 && (<span>{cartList?.length}</span>)}
                </span>
                <div>CART</div>
            </div>
            <div
                className='item'
                onClick={() => isLogin ? navigate('/user-info') : navigate('/login')}
            >
                <img src={isLogin ? userImgUrl?.url?.length > 0 ? userImgUrl.url : userLogo : userLogo} />
                <div>Profile</div>
            </div>
        </div>
    )
}

export default MobileFooter