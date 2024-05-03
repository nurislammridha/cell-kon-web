import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import UserMenu from '../components/UserMenu'
import UserUpdate from '../components/UserUpdate'
import { useDispatch, useSelector } from 'react-redux'
import { GetBuyerDetailsByBuyerId, SetUserInput } from '../_redux/CommonAction'
import MobileCommonHeader from '../components/MobileCommonHeader'
function UserInfoPage({ isLogin }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const buyerDetails = useSelector((state) => state.homeInfo.buyerDetails);
    useEffect(() => {
        dispatch(GetBuyerDetailsByBuyerId())
    }, [])
    useEffect(() => {
        if (!isLogin) {
            navigate('/')
        }
    }, [isLogin])
    useEffect(() => {
        if (buyerDetails) {
            dispatch(SetUserInput(buyerDetails))
        }
    }, [buyerDetails])
    return (<>
        {/* <div className='muser_inf0'>
            <MobileCommonHeader />
        </div> */}
        <div className='user_info'>
            <UserMenu buyerDetails={buyerDetails} />
            <UserUpdate buyerDetails={buyerDetails} />
        </div>
    </>)
}

export default UserInfoPage