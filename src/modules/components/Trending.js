import React, { useState } from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { initialVal } from '../../assets/function/globalFunction'
import { useNavigate } from 'react-router-dom'
const Trending = ({ arr = [] }) => {
    const [page, setPage] = useState(1)
    const navigate = useNavigate();
    return (
        <div className='home_products'>
            <h2 className='title'>Trending Products</h2>
            <div className='products'>
                {arr.length > 0 && arr.slice(initialVal(arr, page), arr.length).map((item, index) => (
                    <div
                        key={index}
                        className="product_cart"
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
                        <div>
                            <div className='del_price'>
                                &#2547;{item?.mrp}
                            </div>
                            <div className='product_price'>
                                &#2547;{Math.floor(item?.mrp - item?.mrp * item?.regularDiscount * 0.01)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='arrow'>
                <div
                    className={page == 1 ? 'left_arrow vih' : "left_arrow"}
                    onClick={() => setPage(page - 1)}
                >
                    <i class='fas fa-chevron-left'></i>
                </div>
                <div
                    className={arr.length / 5 >= page ? "right_arrow" : "right_arrow vih"}
                    onClick={() => setPage(page + 1)}
                >
                    <i class='fas fa-chevron-right'></i>
                </div>
            </div>
        </div>
    )
}

export default Trending