import React, { useState } from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { useNavigate } from 'react-router-dom'
const ProductDetails = ({ data }) => {
    const navigate = useNavigate()
    const multiImg = data?.productImgColor || []
    // console.log('multiIim/g', multiImg[0]?.url)
    const [fullImg, setFullImg] = useState(multiImg[0]?.url)
    // console.log('fullImg', fullImg)
    const [quantity, setQuantity] = useState(1)
    return (
        <div className='main'>
            <div className='left'>
                <div className='image'>
                    <img src={fullImg || multiImg[0]?.url} alt='product img' />
                </div>
                <div className='parent_img'>
                    <div className='images'>
                        {multiImg.length > 0 && multiImg.map((item, index) => (
                            <img
                                key={index}
                                src={item?.url}
                                alt='product'
                                className='cp'
                                onClick={() => setFullImg(item?.url)}
                            />
                        ))}
                    </div>
                    {multiImg.length > 4 && (<div className='arrow'>
                        <div className='left_arrow'><i class='fas fa-chevron-left'></i></div>
                        <div className='right_arrow'><i class='fas fa-chevron-right'></i></div>
                    </div>)}
                </div>
            </div>
            <div className='right'>
                <div className='title_section'>
                    <div className='txt'>{data?.productName}</div>
                    <div className='share'>
                        <i class="fa fa-share-alt" aria-hidden="true"></i>
                    </div>
                </div>
                <div className='brand'>Brand: {data?.brandName}</div>
                <div className='sold_by'>
                    <span>Sold By: {data?.sellerId?.shopName}</span>
                    <a href
                        onClick={() => navigate(`/shop/${data?.sellerId?._id}`)}>
                        Visit Store
                    </a>
                </div>
                <div className='del_price'>&#2547;{data?.mrp}</div>
                <div className='product_price'>&#2547;{Math.floor(data?.mrp - data?.mrp * data?.regularDiscount * 0.01)}</div>
                <div className='txt_cq'>Color</div>
                <div className='colors'>
                    {multiImg.length > 0 && multiImg.map((item, index) => (
                        <a key={index} href style={{ backgroundColor: item?.colorHexCode }}>{item?.colorName}</a>
                    ))}
                </div>
                <div className='txt_cq'>Quantity</div>
                <div className='quantity_button'>
                    <div
                        className='btn plus'
                        onClick={() => quantity < 5 ? setQuantity(quantity + 1) : {}}
                    >
                        <i class="fa fa-plus"></i>
                    </div>
                    <div className='btn number'>{quantity}</div>
                    <div
                        className='btn minus'
                        onClick={() => quantity > 1 ? setQuantity(quantity - 1) : {}}

                    >
                        <i class="fa fa-minus"></i>
                    </div>
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