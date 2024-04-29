import React, { useEffect, useState } from 'react'
import facebookIcon from "../../assets/images/icons/facebook.png"
import googleIcon from "../../assets/images/icons/google.png"
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { FalseIsLoginComplete, GetSignUpInput, LoginSubmit, SignUpSubmit, SocialLoginSubmit, sendEmailOtp } from '../_redux/CommonAction'
import MobileCommonHeader from '../components/MobileCommonHeader'

const EmailOtpPage = () => {
    const { pathname } = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [otp, setOtp] = useState("")
    const [signUpInput, setSignUpInput] = useState({})
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const isSignUpLoading = useSelector((state) => state.homeInfo.isSignUpLoading);
    const isSignUpComplete = useSelector((state) => state.homeInfo.isSignUpComplete);
    const isEmailOtpLoading = useSelector((state) => state.homeInfo.isEmailOtpLoading);
    const isEmailOtpComplete = useSelector((state) => state.homeInfo.isEmailOtpComplete);
    const handleSubmit = () => {
        dispatch(SignUpSubmit(signUpInput, otp))
    }
    // console.log('isSignUpComplete', isSignUpComplete)

    const resendOTP = () => {
        dispatch(sendEmailOtp(signUpInput))
    };
    useEffect(() => {
        if (isSignUpComplete) {
            const reDetails = localStorage.getItem("redirect_details") || ""
            setOtp("")
            reDetails.length > 0 ? navigate(`/product-details/${reDetails}`) : navigate('/')
            localStorage.setItem("redirect_details", "")
            dispatch(FalseIsLoginComplete())
        }
    }, [isSignUpComplete])

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });
    useEffect(() => {
        setSignUpInput(JSON.parse(localStorage.getItem("signUpData")) || {})
        setMinutes(1);
        setSeconds(49);
    }, [])
    useEffect(() => {
        if (isEmailOtpComplete) {
            setMinutes(1);
            setSeconds(49);
            dispatch(FalseIsLoginComplete())
        }
    }, [isEmailOtpComplete])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return (
        <div className='sign_up_container'>
            <MobileCommonHeader isShare={false} />
            <div className='sign_up'>
                <p className='fs20 fm mfs14'>Otp send to {signUpInput?.buyerEmail}</p>
                <div className='mt24'>
                    <p className='clr959595 mfs12 fs16 fm'>OTP</p>
                    <input
                        className='mt12 mmt8'
                        type='text'
                        placeholder='enter otp'
                        name='otp'
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    {/* <p className='forgot_pass'>Forgot Password</p> */}
                </div>

                <div className="mt10">
                    {seconds > 0 || minutes > 0 ? (
                        <p>
                            Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                            {seconds < 10 ? `0${seconds}` : seconds}
                        </p>
                    ) : (
                        <p>Didn't receive otp?</p>
                    )}

                    <a
                        className='cp'
                        disabled={seconds > 0 || minutes > 0}
                        style={{
                            color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630"
                        }}
                        onClick={() => !isEmailOtpLoading && resendOTP()}
                    >
                        {isEmailOtpLoading ? "Resending OTP" : "Resend OTP"}
                    </a>
                </div>
                <div
                    className='mmt32 mt40 sign_up_btn cp'
                    onClick={() => !isSignUpLoading && handleSubmit()}
                >
                    <a href>
                        {isSignUpLoading ? "SUBMITING OTP" : "SUBMIT OTP"}
                    </a>
                </div>


            </div>
        </div>
    )
}

export default EmailOtpPage