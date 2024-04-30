import React from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { useNavigate } from 'react-router-dom'
import shopCart from '../../assets/images/icons/shop_cart.png'
import noProduct from '../../assets/images/other/no_product_found.png'
const ShopProducts = ({ list = [] }) => {
    const navigate = useNavigate()
    return (<> {list?.length > 0 ?
        <div className='products ms_products'>
            {list.map((item, index) => (
                <div
                    key={index}
                    className="product_cart cp"
                    onClick={() => navigate(`/product-details/${item?._id}`)}
                >
                    <div>
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
                        <div>
                            <div className='del_price'>
                                &#2547;{item?.mrp}
                            </div>
                            <div className='product_price'>
                                &#2547;{Math.floor(item?.mrp - item?.mrp * item?.regularDiscount * 0.01)}
                            </div>
                        </div>
                        <div className='shop_cart_img'>
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