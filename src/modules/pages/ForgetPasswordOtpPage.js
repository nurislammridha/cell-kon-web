import React, { useEffect, useState } from 'react'
import facebookIcon from "../../assets/images/icons/facebook.png"
import googleIcon from "../../assets/images/icons/google.png"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CreatePasswordSubmit, FalseIsLoginComplete, GetSignUpInput, LoginSubmit, SetPasswordSubmit, SignUpSubmit, SocialLoginSubmit, sendEmailOtp } from '../_redux/CommonAction'
import MobileCommonHeader from '../components/MobileCommonHeader'

const ForgetPasswordOtpPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [otp, setOtp] = useState("")
    const [resetInfo, setResetInfo] = useState({})
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const isSetPasswordLoading = useSelector((state) => state.homeInfo.isSetPasswordLoading);
    const isSetPasswordComplete = useSelector((state) => state.homeInfo.isSetPasswordComplete);
    const isCreatePasswordLoading = useSelector((state) => state.homeInfo.isCreatePasswordLoading);
    const isPasswordCreated = useSelector((state) => state.homeInfo.isPasswordCreated);
    const handleSubmit = () => {
        dispatch(SetPasswordSubmit(resetInfo, otp))
    }


    const resendOTP = () => {
        let obj = { ...resetInfo, cPassword: resetInfo.password }
        dispatch(CreatePasswordSubmit(obj))
    };
    useEffect(() => {
        if (isSetPasswordComplete) {
            setOtp("")
            navigate('/login')
            dispatch(FalseIsLoginComplete())
        }
    }, [isSetPasswordComplete])

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
        setResetInfo(JSON.parse(localStorage.getItem("resetInfo")) || {})
        setMinutes(0);
        setSeconds(2);
    }, [])
    useEffect(() => {
        if (isPasswordCreated) {
            setMinutes(1);
            setSeconds(49);
            dispatch(FalseIsLoginComplete())
        }
    }, [isPasswordCreated])

    return (
        <div className='sign_up_container'>
            <MobileCommonHeader isShare={false} />
            <div className='sign_up'>
                <p className='fs20 fm mfs14'>Otp send to {resetInfo?.buyerEmail}</p>
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
                        onClick={() => !isCreatePasswordLoading && resendOTP()}
                    >
                        {isCreatePasswordLoading ? "Resending OTP" : "Resend OTP"}
                    </a>
                </div>
                <div
                    className='mmt32 mt40 sign_up_btn cp'
                    onClick={() => !isSetPasswordLoading && handleSubmit()}
                >
                    <a href>
                        {isSetPasswordLoading ? "SUBMITING OTP" : "SUBMIT OTP"}
                    </a>
                </div>


            </div>
        </div>
    )
}

export default ForgetPasswordOtpPage