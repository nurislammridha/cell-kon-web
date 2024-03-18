import React from 'react'
import facebookIcon from "../../assets/images/icons/facebook.png"
import googleIcon from "../../assets/images/icons/google.png"
const SignUpPage = () => {
    return (
        <div className='sign_up_container'>
            <div className='sign_up'>
                <p className='fs20 fm'>Create your Sellkon account</p>
                <div className='mt40'>
                    <p className='clr959595 fs16 fm'>Full Name</p>
                    <input
                        className='mt12'
                        type='text'
                        placeholder='enter full name'
                        name='full_name'
                        value={""}
                    />
                </div>
                <div className='mt24'>
                    <p className='clr959595 fs16 fm'>Mail Or Phone</p>
                    <input
                        className='mt12'
                        type='text'
                        placeholder='enter mail or phone'
                        name='full_name'
                        value={""}
                    />
                </div>
                <div className='mt24'>
                    <p className='clr959595 fs16 fm'>Password</p>
                    <input
                        className='mt12'
                        type='password'
                        placeholder='enter password'
                        name='full_name'
                        value={""}
                    />
                </div>
                <div className='mt24'>
                    <p className='clr959595 fs16 fm'>Confirm Password</p>
                    <input
                        className='mt12'
                        type='password'
                        placeholder='enter confirm password'
                        name='full_name'
                        value={""}
                    />
                </div>
                <div className='mt40 sign_up_btn cp'>
                    <a href>Sign Up</a>
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
                    <span>Already have an account? </span><a href>Sign In</a>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage