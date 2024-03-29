import React from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { useNavigate } from 'react-router-dom'
const RelatedProducts = ({ arr = [] }) => {
    const navigate = useNavigate()
    return (
        <div className='home_all_products'>
            <div className='all_title'>
                <h2 className='title'>Related Products</h2>
                <a className='view_all' href>View All</a>
            </div>
            <div className='products'>
                {arr?.length > 0 && arr.map(({ value }, index) => (
                    <>
                        {value !== null && (
                            <div
                                key={index}
                                className="product_cart cp"
                                onClick={() => navigate(`/product-details/${value?._id}`)}
                            >
                                <div>
                                    <div className='product_img'>
                                        <img
                                            src={value?.productIcon?.url}
                                            alt="product"
                                        />
                                    </div>
                                    <div className='product_name'>
                                        {value?.productName}
                                    </div>
                                </div>
                                <div>
                                    <div className='del_price'>
                                        &#2547;{value?.mrp}
                                    </div>
                                    <div className='product_price'>
                                        &#2547;{Math.floor(value?.mrp - value?.mrp * value?.regularDiscount * 0.01)}
                                    </div>
                                </div>
                            </div>
                        )}

                    </>
                ))}
            </div>
        </div>
    )
}

export default RelatedProducts