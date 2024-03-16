import React from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
const CheckoutProducts = () => {
    return (
        <div>
            <div className='checkout_address_section'>
                <div className='checkout_title'>
                    <span>Sellkon.com</span>
                    <a href><i class="fas fa-edit-alt"></i></a>
                </div>
                <div className='item checkout_phone'>01784528799</div>
                <div className='item checkout_address'>
                    House -237/1, Road, W4, Eastern housing,
                    Pollobi, dhaka-1216
                </div>
            </div>
            <div className='cart_products'>
                <div className='cart_top'>
                    <span>5 Products</span>
                    <span>Variation</span>
                </div>
                <div className='cart_bottom'>
                    {[1, 4].map((item) => (
                        <div className='cart_item'>
                            <div className='cart_img'>
                                <img src={pro3} alt='product' />
                            </div>
                            <div className='cart_right'>
                                <div className='cart_title'>
                                    Origine Starde Revolutio red
                                    we we we qw  we er we r er er erwe 123
                                </div>
                                <div className='cart_taka_3 taka_q'>
                                    <span>&#2547;3,24,000X1</span>
                                    <span>Color: Blue</span>
                                </div>
                                <div className='cart_taka_3 taka_r'>
                                    <span>&#2547;3,24,000X1</span>
                                    <span>Size: 0</span>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CheckoutProducts