import React, { useEffect, useState } from 'react'
import facebookIcon from "../../assets/images/icons/facebook.png"
import googleIcon from "../../assets/images/icons/google.png"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CheckBuyerSubmit, FalseIsLoginComplete, GetSignUpInput, LoginSubmit, ResetPasswordSubmit, SocialLoginSubmit } from '../_redux/CommonAction'
import MobileCommonHeader from '../components/MobileCommonHeader'
import firebase from "firebase";
const EmailPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [buyerEmail, setBuyerEmail] = useState("")
    const isCheckBuyerLoading = useSelector((state) => state.homeInfo.isCheckBuyerLoading);
    const isCheckBuyerCompleted = useSelector((state) => state.homeInfo.isCheckBuyerCompleted);

    const handleSubmit = () => {
        dispatch(CheckBuyerSubmit(buyerEmail))
    }


    useEffect(() => {
        if (isCheckBuyerCompleted) {
            setBuyerEmail("")
            navigate('/create-password')
            dispatch(FalseIsLoginComplete())
        }
    }, [isCheckBuyerCompleted])

    return (
        <div className='sign_up_container'>
            {/* <MobileCommonHeader isShare={false} /> */}
            <div className='sign_up'>
                <p className='fs20 fm mfs14'>Your signed up email address.</p>
                <div className='mt24'>
                    <p className='clr959595 mfs12 fs16 fm'>Email</p>
                    <input
                        className='mt12 mmt8'
                        type='text'
                        placeholder='enter email'
                        name='email'
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                    />
                </div>


                <div
                    className='mmt32 mt40 sign_up_btn cp'
                    onClick={() => !isCheckBuyerLoading && handleSubmit()}
                >
                    <a href>
                        {isCheckBuyerLoading ? "SUBMITTING" : "SUBMIT"}
                    </a>
                </div>


            </div>
        </div>
    )
}

export default EmailPage