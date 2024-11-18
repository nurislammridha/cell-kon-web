import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { FalseIsLoginComplete, GetSignUpInput, LoginSubmit, PhoneSubmit, SocialLoginSubmit } from '../_redux/CommonAction'

const PhonePage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname, state } = useLocation();
    const isPhoneLoading = useSelector((state) => state.homeInfo.isPhoneLoading);
    const userInfo = useSelector((state) => state.homeInfo.userInfo);
    const [phone, setPhone] = useState("")
    // console.log('state', state)
    const handleSubmit = () => {
        dispatch(PhoneSubmit(phone))
    }

    useEffect(() => {
        console.log('userInfo', userInfo)
        if (userInfo?.isPresent) {
            localStorage.setItem("buyerData", JSON.stringify(userInfo?.result))
            navigate('/checkout', { state })

        } else if (userInfo !== null && !userInfo?.isPresent) {
            navigate('/create-user', { state: { ...state, phone } })
        }
    }, [userInfo])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return (
        <div className='sign_up_container'>
            {/* <MobileCommonHeader isShare={false} /> */}
            <div className='sign_up'>
                <p className='fs20 fm mfs14'>Add Your ActivePhone Number.</p>
                <div className='mt24'>
                    <p className='clr959595 mfs12 fs16 fm'>Phone Number</p>
                    <input
                        className='mt12 mmt8'
                        type='text'
                        placeholder='01XXXXXXXXX'
                        name='phone'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>


                <div
                    className='mmt32 mt40 sign_up_btn cp'
                    onClick={() => !isPhoneLoading ? handleSubmit() : {}}
                >
                    <a href>
                        {isPhoneLoading ? "SUBMITTING.." : "SUBMIT"}
                    </a>
                </div>

            </div>
        </div>
    )
}

export default PhonePage