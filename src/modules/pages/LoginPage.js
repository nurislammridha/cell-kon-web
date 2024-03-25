import React, { useEffect } from 'react'
import facebookIcon from "../../assets/images/icons/facebook.png"
import googleIcon from "../../assets/images/icons/google.png"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FalseIsLoginComplete, GetSignUpInput, LoginSubmit } from '../_redux/CommonAction'
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
            <div className='sign_up'>
                <p className='fs20 fm'>Welcome back, we missed you!</p>
                <div className='mt24'>
                    <p className='clr959595 fs16 fm'>Mail Or Phone</p>
                    <input
                        className='mt12'
                        type='text'
                        placeholder='enter mail or phone'
                        name='mailOrPhone'
                        value={loginInput.mailOrPhone}
                        onChange={(e) => handleChange("mailOrPhone", e.target.value)}
                    />
                </div>
                <div className='mt24'>
                    <p className='clr959595 fs16 fm'>Password</p>
                    <input
                        className='mt12'
                        type='password'
                        placeholder='enter password'
                        name='password'
                        value={loginInput.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                    />
                    <p className='forgot_pass'>Forgot Password</p>
                </div>

                <div
                    className='mt40 sign_up_btn cp'
                    onClick={() => !isLoginLoading ? handleSubmit() : {}}
                >
                    <a href>
                        {isLoginLoading ? "Login in" : "Login"}
                    </a>
                </div>
                <p className='mt21 fs16 tac'>OR</p>
                <div className='mt19 social_media'>
                    <div className='google cp'>
                        <img className='s2424' src={googleIcon} alt='google' />
                        <span className='ml13 fs16'>Continue with google</span>
                    </div>
                    <div className='facebook1 cp'>
                        <img className='s1426' src={facebookIcon} alt='facebook' />
                    </div>
                </div>
                <div className='mt32'>
                    <span>Don't have an account? </span>
                    <a href
                        className='cp'
                        onClick={() => navigate('/sign-up')}
                    >Sign Sign Up</a>
                </div>
            </div>
        </div>
    )
}

export default LoginPage