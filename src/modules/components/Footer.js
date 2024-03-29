import React from 'react'
import appStore from '../../assets/images/other/appstore.png'
import playStore from '../../assets/images/other/playstore.png'
import sellConWhite from '../../assets/images/other/SellKonWhite.png'
const Footer = () => {
    return (
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
                        <div className='footer_email mt20'>
                            Email: support@sellkon.com
                        </div>
                        <div className='footer_contact'>
                            Contact no: +8801784528799
                        </div>
                    </div>
                    <div className='footer_right'>
                        <h2 className='foter_download'>Download</h2>
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
    )
}

export default Footer