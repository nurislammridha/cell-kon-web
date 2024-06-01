import React, { useState } from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { initialVal } from '../../assets/function/globalFunction'
import { useNavigate } from 'react-router-dom'
const HomeAllProducts = ({ arr = [] }) => {
    const [page, setPage] = useState(1)
    const navigate = useNavigate()
    return (<>
        <div className='home_all_products'>
            <div className='all_title'>
                <h2 className='title'>All Products</h2>

            </div>
            <div className='products'>

                {arr?.length > 0 && arr.filter((item3, index) => index !== arr.length - 1).map((item, index) => (
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
                                {item?.productName.length <= 30 ? <span>{item?.productName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> : item?.productName}
                            </div>
                        </div>
                        <div>
                            <div className='del_price'>
                                &#2547;{item?.mrp}
                            </div>
                            <div className='product_price'>
                                &#2547;{item?.isCampaign ? item?.campaignDiscount : item?.regularDiscount}
                            </div>
                        </div>
                    </div>
                ))}
                <div
                    className="product_cart cp all_product_card_last"
                    onClick={() => navigate('/all-products')}
                >
                    <div className='all_product_card_last_text'>VIEW ALL</div>
                </div>
            </div>

            <div
                className='m_all_view'
                onClick={() => navigate('/all-products')}
            >
                <a
                    href

                >
                    VIEW ALL
                </a>
            </div>
        </div>
        <div className='m_view_bg_fix'></div>
    </>)
}

export default HomeAllProducts