import React, { useEffect, useState } from 'react'
import facebookIcon from "../../assets/images/icons/facebook.png"
import googleIcon from "../../assets/images/icons/google.png"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CheckBuyerSubmit, CreatePasswordSubmit, FalseIsLoginComplete, GetSignUpInput, LoginSubmit, ResetPasswordSubmit, SocialLoginSubmit } from '../_redux/CommonAction'
import MobileCommonHeader from '../components/MobileCommonHeader'
import firebase from "firebase";
const CreatePasswordPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [buyerEmail, setBuyerEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const isCreatePasswordLoading = useSelector((state) => state.homeInfo.isCreatePasswordLoading);
    const isPasswordCreated = useSelector((state) => state.homeInfo.isPasswordCreated);

    const handleSubmit = () => {
        dispatch(CreatePasswordSubmit({ password, cPassword }))
    }
    useEffect(() => {
        setBuyerEmail(localStorage.getItem("buyerEmail"))
    }, [])


    useEffect(() => {
        if (isPasswordCreated) {
            setBuyerEmail("")
            navigate('/forget-password-otp')
            dispatch(FalseIsLoginComplete())
        }
    }, [isPasswordCreated])

    return (
        <div className='sign_up_container'>
            <MobileCommonHeader isShare={false} />
            <div className='sign_up'>
                <p className='fs20 fm mfs14'>Create new password.</p>
                <div className='mt24'>
                    <p className='clr959595 mfs12 fs16 fm'>New Password</p>
                    <input
                        className='mt12 mmt8'
                        type='text'
                        placeholder='enter new password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='mt24'>
                    <p className='clr959595 mfs12 fs16 fm'>Confirm New Password</p>
                    <input
                        className='mt12 mmt8'
                        type='text'
                        placeholder='enter confirm new password'
                        name='cPassword'
                        value={cPassword}
                        onChange={(e) => setCPassword(e.target.value)}
                    />
                </div>


                <div
                    className='mmt32 mt40 sign_up_btn cp'
                    onClick={() => !isCreatePasswordLoading && handleSubmit()}
                >
                    <a href>
                        {isCreatePasswordLoading ? "SUBMITTING" : "SUBMIT"}
                    </a>
                </div>


            </div>
        </div>
    )
}

export default CreatePasswordPage