import React from 'react'
import facebookIcon from "../../assets/images/icons/facebook.png"
import googleIcon from "../../assets/images/icons/google.png"
const SignUpPage = () => {
    return (
        <div className='sign_up_container'>
            <div className='sign_up'>
                <p>Create your Sellkon account</p>
                <div className='mt-40'>
                    <p>Full Name</p>
                    <input
                        className='mt12'
                        type='text'
                        placeholder='enter full name'
                        name='full_name'
                        value={""}
                    />
                </div>
                <div className='mt-24'>
                    <p>Mail Or Phone</p>
                    <input
                        className='mt12'
                        type='text'
                        placeholder='enter mail or phone'
                        name='full_name'
                        value={""}
                    />
                </div>
                <div className='mt-24'>
                    <p>Password</p>
                    <input
                        className='mt12'
                        type='password'
                        placeholder='enter password'
                        name='full_name'
                        value={""}
                    />
                </div>
                <div className='mt-24'>
                    <p>Confirm Password</p>
                    <input
                        className='mt12'
                        type='password'
                        placeholder='enter confirm password'
                        name='full_name'
                        value={""}
                    />
                </div>
                <div className='mt40'>
                    <a href>Sign Up</a>
                </div>
                <p className='mt21'>OR</p>
                <div className='mt19 social_media'>
                    <div className='google'>
                        <img src={googleIcon} alt='google' />
                    </div>
                    <div className='facebook'>
                        <img src={facebookIcon} alt='facebook' />
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