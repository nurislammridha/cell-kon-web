import React, { useEffect, useState } from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AddToCart, FalseCartAdded } from '../_redux/CommonAction'
import { initialVal } from '../../assets/function/globalFunction'
import cartIcon from '../../assets/images/icons/cart.png'
import OwlCarousel from "react-owl-carousel";
const ProductDetails = ({ data, isLogin }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isCartAdded = useSelector((state) => state.homeInfo.isCartAdded);
    const isCartLoading = useSelector((state) => state.homeInfo.isCartLoading);
    const [buyerData, setBuyerData] = useState({})
    const multiImg = data?.productImgColor || []
    // console.log('multiIim/g', multiImg[0]?.url)
    const [fullImg, setFullImg] = useState(null)
    const [sizeName, setSizeName] = useState(null)
    const [colorName, setColorName] = useState(null)
    const [colorHexCode, setColorHexCode] = useState(null)
    // console.log('fullImg', fullImg)
    const [quantity, setQuantity] = useState(1)
    const [page, setPage] = useState(1)
    const [start, setStart] = useState(0)
    const handleAddCart = () => {
        const postData = { buyerId: buyerData?._id, productId: data?._id, quantity, colorName, colorHexCode, sizeName, fullImg }
        isLogin ? dispatch(AddToCart(postData)) : navigate('/login')
    }
    const handleBuyNow = () => {
        const postData = { buyerId: buyerData?._id, productId: data?._id, quantity, colorName, colorHexCode, sizeName, fullImg }
        postData.productImgUrl = fullImg
        data.quantity = quantity
        const obj = { productDetails: data }
        const newData = { ...obj, ...postData }
        isLogin ? navigate('/checkout', { state: { selected: [newData], isFromDetails: true } }) : navigate('/login')
    }
    const handleColor = (item, index) => {
        setColorName(item?.colorName)
        setColorHexCode(item?.colorHexCode)
        setFullImg(item?.url)
        setPage(Math.floor(index / 4) + 1)
    }
    useEffect(() => {
        setBuyerData(JSON.parse(localStorage.getItem('buyerData')))
        dispatch(FalseCartAdded())
    }, [])
    useEffect(() => {
        setFullImg(multiImg[0]?.url)
        setColorHexCode(multiImg[0]?.colorHexCode)
        setColorName(multiImg[0]?.colorName)
        if (data?.size?.length > 0) {
            setSizeName(data?.size[0]?.label)
        }

    }, [data])
    useEffect(() => {
        setStart(initialVal(multiImg, page, 4))
    }, [page])
    return (<>
        {/* mobile carousel */}
        <div className='details_top'>
            <div
                className='l_arrow'
                onClick={() => navigate(-1)}
            >
                <i class="fas fa-arrow-left"></i>
            </div>
            <div className='share2'>
                <i class="fa fa-share-alt" aria-hidden="true"></i>
            </div>
        </div>
        <div className='details_hero'>
            <div className='hero_main'>
                <OwlCarousel
                    className="owl-theme"
                    loop
                    margin={10}
                    items={1}
                    autoplay={false}
                    nav
                    autoplayHoverPause={true}
                >
                    {
                        multiImg?.length > 0 && multiImg.map((item) => {
                            return (
                                <>

                                    <div class="item hero_carousel">
                                        <img
                                            src={item?.url}
                                            className="img-fluid"
                                            alt=""
                                            onClick={() => {
                                                setFullImg(item?.url)
                                                setColorName(item?.colorName)
                                                setColorHexCode(item?.colorHexCode)
                                            }}
                                        />
                                    </div>

                                </>

                            )
                        })
                    }

                </OwlCarousel>
            </div>
        </div>
        <div className='main'>
            <div className='left'>
                <div className='image'>
                    <img src={fullImg} alt='product img' />
                </div>
                <div className='parent_img'>
                    <div className='img'>
                        <div className='images'>
                            {multiImg?.length > 0 && multiImg.slice(start, multiImg?.length)?.map((item, index) => (
                                <img
                                    key={index}
                                    src={item?.url}
                                    className={fullImg === item?.url ? 'cp active_border' : 'cp c_border'}
                                    alt='product'
                                    onClick={() => {
                                        setFullImg(item?.url)
                                        setColorName(item?.colorName)
                                        setColorHexCode(item?.colorHexCode)
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    {multiImg?.length > 4 && (<div className='arrow'>
                        <div
                            className={page == 1 ? 'left_arrow vih' : "left_arrow"}
                            onClick={() => setPage(page - 1)}
                        ><i class='fas fa-chevron-left'></i></div>
                        <div
                            className={multiImg?.length / 4 >= page ? "right_arrow" : "right_arrow vih"}
                            onClick={() => setPage(page + 1)}
                        >
                            <i class='fas fa-chevron-right'></i>
                        </div>
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
                <div className='price_hide_pn'>
                    <div className='del_price'>&#2547;{data?.mrp}</div>
                    <div className='product_price'>&#2547;{Math.floor(data?.mrp - data?.mrp * data?.regularDiscount * 0.01)}</div>
                </div>
                {/* for mobile sections */}
                <div className='mobile_price'>
                    <div>
                        <div className='del_price'>&#2547;{data?.mrp}</div>
                        <div className='product_price'>&#2547;{Math.floor(data?.mrp - data?.mrp * data?.regularDiscount * 0.01)}</div>

                    </div>
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
                </div>

                <div className='flex mobile_color'>
                    <div>
                        <div className='txt_cq'>Color</div>
                        <div className='mobile_colors'>
                            <div className='colors'>
                                {multiImg?.length > 0 && multiImg?.map((item, index) => (<>
                                    {item?.colorName?.length > 0 && (<a
                                        key={index}
                                        href
                                        className={colorName === item?.colorName ? 'active_border' : 'c_border'}
                                        // style={{ backgroundColor: item?.colorHexCode }}
                                        onClick={() => handleColor(item, index + 1)}
                                    >
                                        {item?.colorName}
                                    </a>)}
                                </>))}
                            </div>
                        </div>
                    </div>
                    {data?.size?.length > 0 && <div className='ml30'>
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
                    </div>}
                </div>
                <div className='m_quantity'>
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
                </div>
                <div className='btn_buy'>
                    <a
                        href
                        className='btn cart cp'
                        onClick={() => !isCartAdded && !isCartLoading ? handleAddCart() : ""}
                    >
                        {isCartAdded ? "Already Added" : isCartLoading ? "Adding to Cart" : "Add to Cart"}

                    </a>
                    <a href
                        className='btn buy cp'
                        onClick={() => handleBuyNow()}
                    >
                        Buy Now
                    </a>
                </div>
                <div className='mobile_buy'>
                    <a
                        href
                        className='btn cart cp'
                        style={!isCartAdded && !isCartLoading ? { opacity: "1" } : { opacity: "1" }}
                        onClick={() => !isCartAdded && !isCartLoading ? handleAddCart() : navigate('/cart')}
                    >
                        {isCartAdded ? <small>Added</small> : isCartLoading ? <i class="fa fa-refresh fa-spin"></i> : <img src={cartIcon} />}
                    </a>
                    <a href
                        className='btn buy cp'
                        onClick={() => handleBuyNow()}
                    >
                        Buy Now
                    </a>
                </div>
                <div className='have_question'>Have questions about this product</div>
                <div className='call'>
                    <i class="fa fa-phone" aria-hidden="true"></i>
                    <span>+8801784528799</span>
                </div>
            </div>
        </div>
    </>)
}

export default ProductDetails