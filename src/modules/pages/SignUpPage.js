import React, { useEffect } from 'react'
import facebookIcon from "../../assets/images/icons/facebook.png"
import googleIcon from "../../assets/images/icons/google.png"
import { useDispatch, useSelector } from 'react-redux'
import { FalseIsLoginComplete, GetSignUpInput, SignUpSubmit } from '../_redux/CommonAction'
import { useNavigate } from 'react-router-dom'
import MobileCommonHeader from '../components/MobileCommonHeader'
const SignUpPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const signUpInput = useSelector((state) => state.homeInfo.signUpInput);
    const isSignUpLoading = useSelector((state) => state.homeInfo.isSignUpLoading);
    const isSignUpComplete = useSelector((state) => state.homeInfo.isSignUpComplete);
    const handleChange = (name, value) => {
        dispatch(GetSignUpInput(name, value))
    }
    const handleSubmit = () => {
        dispatch(SignUpSubmit(signUpInput))
    }
    // console.log('isSignUpComplete', isSignUpComplete)
    useEffect(() => {
        if (isSignUpComplete) {
            navigate('/')
            dispatch(FalseIsLoginComplete())
        }
    }, [isSignUpComplete])

    return (
        <div className='sign_up_container'>
            <MobileCommonHeader isShare={false} />
            <div className='sign_up'>
                <p className='mfs14 fs20 fm'>Create your Sellkon account</p>
                <div className='mmt24 mt40'>
                    <p className='clr959595 mfs12 fs16 fm'>Full Name</p>
                    <input
                        className='mmt8 mt12'
                        type='text'
                        placeholder='enter full name'
                        name='full_name'
                        value={signUpInput.buyerName}
                        onChange={(e) => handleChange("buyerName", e.target.value)}
                    />
                </div>
                <div className='mmt16 mt24'>
                    <p className='clr959595 mfs12 fs16 fm'>Email Or Phone</p>
                    <input
                        className='mmt8 mt12'
                        type='text'
                        placeholder='enter email or phone'
                        name='mailOrPhone'
                        value={signUpInput.mailOrPhone}
                        onChange={(e) => handleChange("mailOrPhone", e.target.value)}
                    />
                </div>
                <div className='mmt16 mt24'>
                    <p className='clr959595 mfs12  fs16 fm'>Password</p>
                    <input
                        className='mmt8 mt12'
                        type='password'
                        placeholder='enter password'
                        name='password'
                        value={signUpInput.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                    />
                </div>
                <div className='mmt16 mt24'>
                    <p className='clr959595 mfs12 fs16 fm'>Confirm Password</p>
                    <input
                        className='mmt8 mt12'
                        type='password'
                        placeholder='enter confirm password'
                        name='cPassword'
                        value={signUpInput.cPassword}
                        onChange={(e) => handleChange("cPassword", e.target.value)}
                    />
                </div>
                <div
                    className='mt40 sign_up_btn cp'
                    onClick={() => !isSignUpLoading ? handleSubmit() : {}}
                >
                    <a href
                    >
                        {isSignUpLoading ? "Signing Up" : "Sign Up"}
                    </a>
                </div>
                <p className='mmt16 mt21 mfs12 fs16 tac'>OR</p>
                <div className='mmt16 mt19 social_media'>
                    <div className='google cp'>
                        <img className='ms2020 s2424' src={googleIcon} alt='google' />
                        <span className='ml13 mfs14 fs16'>Continue with google</span>
                    </div>
                    <div className='facebook1 cp'>
                        <img className='ms1120 s1426' src={facebookIcon} alt='facebook' />
                    </div>
                </div>
                <div className='mmt24 mt32 have_an_account'>
                    <span>Already have an account? </span>
                    <a href
                        className='cp'
                        onClick={() => navigate('/login')}
                    >
                        Sign In
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage