import React from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
const ProductDetails = () => {
    return (
        <div className='main'>
            <div className='left'>
                <div className='image'>
                    <img src={pro3} alt='product img' />
                </div>
                <div className='parent_img'>
                    <div className='images'>
                        {[1, 2, 3, 4].map((item) => (<img src={pro3} alt='product' />))}
                    </div>
                    <div className='arrow'>
                        <div className='left_arrow'><i class='fas fa-chevron-left'></i></div>
                        <div className='right_arrow'><i class='fas fa-chevron-right'></i></div>
                    </div>
                </div>
            </div>
            <div className='right'>
                <div className='title_section'>
                    <div className='txt'>Yamaha yZF R15 df er rtt rtt rtt frt rtg rrt</div>
                    <div className='share'>
                        <i class="fa fa-share-alt" aria-hidden="true"></i>
                    </div>
                </div>
                <div className='brand'>Brand: YAMAHA</div>
                <div className='sold_by'>
                    <span>Sold By: YAMAHA Official</span>
                    <a>Visit Store</a>
                </div>
                <div className='del_price'>&#2547;4,50990</div>
                <div className='product_price'>&#2547;4,50990</div>
                <div className='txt_cq'>Color</div>
                <div className='colors'>
                    {["#f00", "#0f0", "#00f", "#ff0"].map((item) => (<a href style={{ backgroundColor: item }}>Black</a>))}
                </div>
                <div className='txt_cq'>Quantity</div>
                <div className='quantity_button'>
                    <div className='btn plus'><i class="fa fa-plus"></i></div>
                    <div className='btn number'>1</div>
                    <div className='btn minus'><i class="fa fa-minus"></i></div>
                </div>
                <div className='btn_buy'>
                    <a href className='btn cart'>Add to Cart</a>
                    <a href className='btn buy'>Buy Now</a>
                </div>
                <div className='have_question'>Have questions about this product</div>
                <div className='call'>
                    <i class="fa fa-phone" aria-hidden="true"></i>
                    <span>+8801784528799</span>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails