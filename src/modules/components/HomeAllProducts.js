import React, { useState } from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { initialVal } from '../../assets/function/globalFunction'
const HomeAllProducts = ({ arr = [] }) => {
    const [page, setPage] = useState(1)
    return (
        <div className='home_all_products'>
            <div className='all_title'>
                <h2 className='title'>All Products</h2>
                <a className='view_all' href=''>View All</a>
            </div>
            <div className='products'>

                {arr.length > 0 && arr.slice(initialVal(arr, page), arr.length).map((item, index) => (
                    <div key={index} className="product_cart">
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
                        <div>
                            <div className='del_price'>
                                &#2547;{item?.mrp}
                            </div>
                            <div className='product_price'>
                                &#2547;{Math.floor(item.mrp - item?.mrp * item?.regularDiscount * 0.01)}
                            </div>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default HomeAllProducts