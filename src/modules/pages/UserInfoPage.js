import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import UserMenu from '../components/UserMenu'
import UserUpdate from '../components/UserUpdate'
import { useDispatch, useSelector } from 'react-redux'
import { GetBuyerDetailsByBuyerId, SetUserInput } from '../_redux/CommonAction'
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
    return (
        <div className='user_info'>
            <UserMenu buyerDetails={buyerDetails} />
            <UserUpdate buyerDetails={buyerDetails} />
        </div>
    )
}

export default UserInfoPage