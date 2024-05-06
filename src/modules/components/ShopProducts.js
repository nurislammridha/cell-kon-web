import React, { useEffect } from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { useNavigate } from 'react-router-dom'
import shopCart from '../../assets/images/icons/shop_cart.png'
import noProduct from '../../assets/images/other/no_product_found.png'
import { useDispatch, useSelector } from 'react-redux'
import { AddToCart, FalseCartAdded } from '../_redux/CommonAction'
const ShopProducts = ({ list = [], isLogin, shopId }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isCartAdded = useSelector((state) => state.homeInfo.isCartAdded);
    const isCartLoading = useSelector((state) => state.homeInfo.isCartLoading);
    const handleAddCart = (data) => {
        const buyerId = JSON.parse(localStorage.getItem("buyerData"))._id || ""
        const postData = { buyerId, productId: data?._id, quantity: 1, colorName: data.productImgColor[0].colorName, colorHexCode: "", sizeName: "", fullImg: data.productIcon.url }
        isLogin ? dispatch(AddToCart(postData)) : navigate('/login')
        !isLogin && localStorage.setItem('redirect_details', shopId)
        !isLogin && localStorage.setItem('redirect_url', "shop")
    }
    useEffect(() => {
        if (isCartAdded) {
            dispatch(FalseCartAdded())
        }
    }, [isCartAdded])

    return (<> {list?.length > 0 ?
        <div className='products ms_products'>
            {list.map((item, index) => (
                <div
                    key={index}
                    className="product_cart cp"

                >
                    <div onClick={() => navigate(`/product-details/${item?._id}`)}>
                        <div className='product_img'>
                            <img
                                src={item?.productIcon?.url}
                                alt="product"
                            />
                        </div>
                        <div className='product_name'>
                            {item?.productName}
                        </div>
                    </div>
                    <div className='shop_cart'>
                        <div onClick={() => navigate(`/product-details/${item?._id}`)}>
                            <div className='del_price'>
                                &#2547;{item?.mrp}
                            </div>
                            <div className='product_price'>
                                &#2547;{Math.floor(item?.mrp - item?.mrp * item?.regularDiscount * 0.01)}
                            </div>
                        </div>
                        <div
                            className='shop_cart_img'
                            onClick={() => !isCartLoading ? handleAddCart(item) : ""}
                        >
                            <img src={shopCart} />
                        </div>
                    </div>
                </div>
            ))}

        </div> :
        <div className='shop_no_product'>
            <img src={noProduct} />
        </div>

    }
    </>
    )
}

export default ShopProducts