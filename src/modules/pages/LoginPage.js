import React, { useEffect, useState } from 'react'
import facebookIcon from "../../assets/images/icons/facebook.png"
import googleIcon from "../../assets/images/icons/google.png"
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { FalseIsLoginComplete, GetSignUpInput, LoginSubmit, SocialLoginSubmit } from '../_redux/CommonAction'
import MobileCommonHeader from '../components/MobileCommonHeader'
import { auth, facebookAuthProvider, googleAuthProvider } from "../../assets/function/firebase";
import show from '../../assets/images/icons/password_show.png'
import hide from '../../assets/images/icons/password_Hide.png'
import firebase from "firebase";
const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation();
    const [isShow, setShow] = useState(true)
    const [isGoogle, setGoogle] = useState(false)
    const [isFacebook, setFacebook] = useState(false)
    const loginInput = useSelector((state) => state.homeInfo.signUpInput);
    const isLoginLoading = useSelector((state) => state.homeInfo.isLoginLoading);
    const isLoginComplete = useSelector((state) => state.homeInfo.isLoginComplete);
    const handleChange = (name, value) => {
        dispatch(GetSignUpInput(name, value))
    }
    const handleSubmit = () => {
        dispatch(LoginSubmit(loginInput))
    }
    const googleLogin = async () => {
        setGoogle(true)
        auth
            .signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                console.log('result', result)
                // const { user } = result;
                // const idTokenResult = await user.getIdTokenResult();
                dispatch(SocialLoginSubmit(result))
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const facebookLogin = async () => {
        setFacebook(true)
        auth
            .signInWithPopup(facebookAuthProvider)
            .then(async (result) => {
                console.log('result', result)
                // const { user } = result;
                // const idTokenResult = await user.getIdTokenResult();
                dispatch(SocialLoginSubmit(result))
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const logout = () => {
        // firebase.auth().signOut();
        // console.log('signOut', "signOut")
        // dispatch({
        //     type: "LOGOUT",
        //     payload: null,
        // });
        // history.push("/login");
    };
    useEffect(() => {
        if (isLoginComplete) {
            const reDetails = localStorage.getItem("redirect_details") || ""
            const reUrl = localStorage.getItem("redirect_url") || ""
            setGoogle(false)
            setFacebook(false)
            reDetails.length > 0 ? reUrl === "shop" ? navigate(`/shop/${reDetails}`) : navigate(`/product-details/${reDetails}`) : navigate('/')
            localStorage.setItem("redirect_details", "")
            dispatch(FalseIsLoginComplete())
        }
    }, [isLoginComplete])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    console.log('show', isShow)
    return (
        <div className='sign_up_container'>
            {/* <MobileCommonHeader isShare={false} /> */}
            <div className='sign_up'>
                <p className='fs20 fm mfs14'>Welcome back, we missed you!</p>
                <div className='mt24'>
                    <p className='clr959595 mfs12 fs16 fm'>Email</p>
                    <input
                        className='mt12 mmt8'
                        type='text'
                        placeholder='enter email'
                        name='mailOrPhone'
                        value={loginInput.mailOrPhone}
                        onChange={(e) => handleChange("mailOrPhone", e.target.value)}
                    />
                </div>
                <div className='mt24 mmt16'>
                    <p className='clr959595 fs16 fm mfs12'>Password</p>
                    <div className='pass_show'>
                        <input
                            className='mt12 mmt8'
                            type={isShow ? "text" : 'password'}
                            placeholder='enter password'
                            name="password"
                            value={loginInput.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                        />
                        <img onClick={() => setShow(!isShow)} src={isShow ? hide : show} />
                    </div>
                    <p
                        className='forgot_pass'
                        onClick={() => navigate('/email')}
                    >
                        Forgot Password
                    </p>
                </div>

                <div
                    className='mmt32 mt40 sign_up_btn cp'
                    onClick={() => !isGoogle && !isFacebook && !isLoginLoading ? handleSubmit() : {}}
                >
                    <a href>
                        {!isGoogle && !isFacebook && isLoginLoading ? "Login in" : "Login"}
                    </a>
                </div>
                <p className='mmt16 mt21 fs16 tac mfs12'>OR</p>
                <div className='mmt16 mt19 social_media'>
                    <div
                        className='google cp'
                        onClick={() => googleLogin()}
                    >
                        {isGoogle && !isFacebook && isLoginLoading ? <i class="fa fa-refresh fa-spin"></i> : <img className='s2424 ms2020' src={googleIcon} alt='google' />}
                        <span className='ml13 fs16 mfs14'>Continue with google</span>
                    </div>
                    <div
                        className='facebook1 cp'
                        onClick={() => facebookLogin()}
                    >
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