import React from 'react'
import appStore from '../../assets/images/other/appstore.png'
import playStore from '../../assets/images/other/playstore.png'
import sellConWhite from '../../assets/images/other/SellkonBlack.png'
import { useNavigate } from 'react-router-dom'
const Footer = () => {
    const navigate = useNavigate()
    const d = new Date()
    return (<div className='footer_parent'>
        <div className='footer'>
            <div className='w-1176'>
                <div className='footer_in'>
                    <div className='footer_left'>
                        <div className='footer_img'>
                            <img src={sellConWhite} alt='cellkon' />
                        </div>
                        <div className='text'>
                            Sellkon: Your one-stop e-commerce destination
                            for all your needs. Browse a wide range of
                            products, from electronics to fashion, and enjoy
                            seamless shopping with secure transactions and fast delivery.
                        </div>
                    </div>
                    <div className='footer_middle'>
                        <h2 className='footer_contact_us'>Contact Us</h2>
                        <div className='footer_address'>
                            House #1757, Road-3, Block A,
                            Bashundhara riverview, keraniganj, Dhaka.
                        </div>
                        <div className='footer_email'>
                            Email: support@sellkon.com
                        </div>
                        <div className='footer_contact'>
                            Contact no: +8801784528799
                        </div>
                    </div>
                    <div className='footer_middle'>
                        <h2 className='footer_contact_us'>About Us</h2>
                        <div className='footer_link cp footer_address'><a onClick={() => navigate('/terms-and-conditions')} href>Terms And Conditions</a></div>
                        <div className='footer_link cp'><a onClick={() => navigate('/return-and-refund')} href>Return And Refund Policy</a></div>
                        <div className='footer_link cp'><a onClick={() => navigate('/privacy-policy')} href>Privacy Policy</a></div>

                    </div>
                    <div className='footer_right'>
                        <h2 className='foter_download'>Upcoming App</h2>
                        <div className='footer_store'>
                            <img src={appStore} className='app_store' />
                            <img src={playStore} className='play_store' />
                        </div>
                        <h2 className='join_us'>Join Us</h2>
                        <div className='footer_social'>
                            <span className='facebook social'><i className='fa fa-facebook'></i></span>
                            <span className='linkedin social'><i className='fa fa-linkedin'></i></span>
                            <span className='youtube social'><i className='fa fa-youtube'></i></span>
                            <span className='instagram social'><i className='fa fa-instagram'></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='footer_bottom'>
            {d.getFullYear()} Sellkon.com All rights reserved.
        </div>
    </div>
    )
}

export default Footer