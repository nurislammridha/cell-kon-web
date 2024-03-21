import React, { useEffect, useState } from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AddToCart, FalseCartAdded } from '../_redux/CommonAction'
const ProductDetails = ({ data }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isCartAdded = useSelector((state) => state.homeInfo.isCartAdded);
    const isCartLoading = useSelector((state) => state.homeInfo.isCartLoading);
    const [isLogin, setIsLogin] = useState(false)
    const [buyerData, setBuyerData] = useState({})
    const multiImg = data?.productImgColor || []
    // console.log('multiIim/g', multiImg[0]?.url)
    const [fullImg, setFullImg] = useState(null)
    const [sizeName, setSizeName] = useState(null)
    const [colorName, setColorName] = useState(null)
    const [colorHexCode, setColorHexCode] = useState(null)
    // console.log('fullImg', fullImg)
    const [quantity, setQuantity] = useState(1)
    const handleAddCart = () => {
        const postData = { buyerId: buyerData?._id, productId: data?._id, quantity, colorName, colorHexCode, sizeName, fullImg }
        isLogin ? dispatch(AddToCart(postData)) : navigate('/login')
    }
    useEffect(() => {
        setIsLogin(JSON.parse(localStorage.getItem('isLogin')))
        setBuyerData(JSON.parse(localStorage.getItem('buyerData')))
        dispatch(FalseCartAdded())
    }, [])
    useEffect(() => {
        setFullImg(multiImg[0]?.url)
        setColorHexCode(multiImg[0]?.colorHexCode)
        setColorName(multiImg[0]?.colorName)
        setSizeName(data?.size[0]?.label)
    }, [data])

    return (
        <div className='main'>
            <div className='left'>
                <div className='image'>
                    <img src={fullImg} alt='product img' />
                </div>
                <div className='parent_img'>
                    <div className='images'>
                        {multiImg.length > 0 && multiImg.map((item, index) => (
                            <img
                                key={index}
                                src={item?.url}
                                alt='product'
                                className={fullImg === item?.url ? 'cp active_border' : 'cp c_border'}
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
                    <span>Sold By: {data?.sellerInfo?.shopName}</span>
                    <a href
                        onClick={() => navigate(`/shop/${data?.sellerId}`)}>
                        Visit Store
                    </a>
                </div>
                <div className='del_price'>&#2547;{data?.mrp}</div>
                <div className='product_price'>&#2547;{Math.floor(data?.mrp - data?.mrp * data?.regularDiscount * 0.01)}</div>
                <div className='flex'>
                    <div>
                        <div className='txt_cq'>Color</div>
                        <div className='colors'>
                            {multiImg.length > 0 && multiImg.map((item, index) => (
                                <a
                                    key={index}
                                    href
                                    className={colorName === item?.colorName ? 'active_border' : 'c_border'}
                                    // style={{ backgroundColor: item?.colorHexCode }}
                                    onClick={() => {
                                        setColorName(item?.colorName)
                                        setColorHexCode(item?.colorHexCode)
                                    }}
                                >
                                    {item?.colorName}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className='ml30'>
                        <div className='txt_cq'>Size</div>
                        <div className='colors'>
                            {data?.size?.length > 0 && data?.size?.map((item, index) => (
                                <a
                                    key={index}
                                    href
                                    className={item?.label === sizeName ? 'active_border' : 'c_border'}
                                    onClick={() => setSizeName(item?.label)}
                                >
                                    {item?.label}
                                </a>
                            ))}
                        </div>
                    </div>
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
                    <a
                        href
                        className='btn cart cp'
                        onClick={() => !isCartAdded && !isCartLoading ? handleAddCart() : ""}
                    >
                        {isCartAdded ? "Already Added" : isCartLoading ? "Adding to Cart" : "Add to Cart"}
                    </a>
                    <a href className='btn buy cp'>Buy Now</a>
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