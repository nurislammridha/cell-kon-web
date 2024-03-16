import React from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
const CartProducts = () => {
    return (
        <div className='cart_products'>
            <div className='cart_top'>
                <span>5 Products</span>
                <a href><i class="fas fa-trash-alt"></i></a>
            </div>
            <div className='cart_bottom'>
                {[1, 2, 3, 4].map((item) => (
                    <div className='cart_item'>
                        <div className='cart_check'>
                            <input type='checkbox' />
                        </div>
                        <div className='cart_img'>
                            <img src={pro3} alt='product' />
                        </div>
                        <div className='cart_right'>
                            <div className='cart_title'>
                                Origine Starde Revolutio red sd sd we wer we er wew
                                we we we qw  we efr we er wer er we r er er erwe
                                w2 w3 we2 we2 we2 ewe2 ewe2 we we we we we we we
                            </div>
                            <div className='cart_amount'>
                                <div className='cart_taka'>
                                    <div className='cart_taka_1'>&#2547;3,24,000X1</div>
                                    <div className='cart_taka_2'>&#2547;3,24,000</div>
                                </div>
                                <div className='quantity_button'>
                                    <div className='btn minus'><i class="fa fa-minus"></i></div>
                                    <div className='btn number'>1</div>
                                    <div className='btn plus'><i class="fa fa-plus"></i></div>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CartProducts