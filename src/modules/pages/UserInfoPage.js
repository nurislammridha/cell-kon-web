import React, { useEffect, useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import UserMenu from '../components/UserMenu'
import UserUpdate from '../components/UserUpdate'
import UserReviews from '../components/UserReviews'
import { useDispatch, useSelector } from 'react-redux'
import { GetBuyerDetailsByBuyerId, SetUserInput } from '../_redux/CommonAction'
function UserInfoPage({ isLogin }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const buyerDetails = useSelector((state) => state.homeInfo.buyerDetails);
    const [activeTab, setActiveTab] = useState('profile')

    useEffect(() => {
        if (!isLogin) {
            return
        }
        dispatch(GetBuyerDetailsByBuyerId())
    }, [dispatch, isLogin])

    useEffect(() => {
        if (!isLogin) {
            navigate('/')
        }
    }, [isLogin, navigate])
    useEffect(() => {
        if (buyerDetails) {
            dispatch(SetUserInput(buyerDetails))
        }
    }, [buyerDetails, dispatch])

    useEffect(() => {
        const tab = new URLSearchParams(location.search).get('tab')
        if (tab === 'reviews') {
            setActiveTab('reviews')
            return
        }
        setActiveTab('profile')
    }, [location.search])

    return (<>
        {/* <div className='muser_inf0'>
            <MobileCommonHeader />
        </div> */}
        <div className='user_info'>
            <UserMenu buyerDetails={buyerDetails} activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'reviews' ? <UserReviews /> : <UserUpdate buyerDetails={buyerDetails} />}
        </div>
    </>)
}

export default UserInfoPage