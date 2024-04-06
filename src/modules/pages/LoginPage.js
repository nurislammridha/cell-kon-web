import React, { useEffect } from 'react'
import facebookIcon from "../../assets/images/icons/facebook.png"
import googleIcon from "../../assets/images/icons/google.png"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FalseIsLoginComplete, GetSignUpInput, LoginSubmit } from '../_redux/CommonAction'
import MobileCommonHeader from '../components/MobileCommonHeader'
const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginInput = useSelector((state) => state.homeInfo.signUpInput);
    const isLoginLoading = useSelector((state) => state.homeInfo.isLoginLoading);
    const isLoginComplete = useSelector((state) => state.homeInfo.isLoginComplete);
    const handleChange = (name, value) => {
        dispatch(GetSignUpInput(name, value))
    }
    const handleSubmit = () => {
        dispatch(LoginSubmit(loginInput))
    }
    useEffect(() => {
        if (isLoginComplete) {
            navigate('/')
            dispatch(FalseIsLoginComplete())
        }
    }, [isLoginComplete])

    return (
        <div className='sign_up_container'>
            <MobileCommonHeader isShare={false} />
            <div className='sign_up'>
                <p className='fs20 fm mfs14'>Welcome back, we missed you!</p>
                <div className='mt24'>
                    <p className='clr959595 mfs12 fs16 fm'>Email Or Phone</p>
                    <input
                        className='mt12 mmt8'
                        type='text'
                        placeholder='enter email or phone'
                        name='mailOrPhone'
                        value={loginInput.mailOrPhone}
                        onChange={(e) => handleChange("mailOrPhone", e.target.value)}
                    />
                </div>
                <div className='mt24 mmt16'>
                    <p className='clr959595 fs16 fm mfs12'>Password</p>
                    <input
                        className='mt12 mmt8'
                        type='password'
                        placeholder='enter password'
                        name='password'
                        value={loginInput.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                    />
                    <p className='forgot_pass'>Forgot Password</p>
                </div>

                <div
                    className='mmt32 mt40 sign_up_btn cp'
                    onClick={() => !isLoginLoading ? handleSubmit() : {}}
                >
                    <a href>
                        {isLoginLoading ? "Login in" : "Login"}
                    </a>
                </div>
                <p className='mmt16 mt21 fs16 tac mfs12'>OR</p>
                <div className='mmt16 mt19 social_media'>
                    <div className='google cp'>
                        <img className='s2424 ms2020' src={googleIcon} alt='google' />
                        <span className='ml13 fs16 mfs14'>Continue with google</span>
                    </div>
                    <div className='facebook1 cp'>
                        <img className='s1426 ms1120' src={facebookIcon} alt='facebook' />
                    </div>
                </div>
                <div className='mmt24 mt32 have_an_account'>
                    <span>Don't have an account? </span>
                    <a href
                        className='cp'
                        onClick={() => navigate('/sign-up')}
                    > Sign Up</a>
                </div>
            </div>
        </div>
    )
}

export default LoginPage