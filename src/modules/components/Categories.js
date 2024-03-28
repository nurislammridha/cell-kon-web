import React, { useState } from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { initialVal } from '../../assets/function/globalFunction'
import { useNavigate } from 'react-router-dom'
const Categories = ({ arr = [] }) => {
    const [page, setPage] = useState(1)
    const navigate = useNavigate();
    return (
        <div className='home_products'>
            <h2 className='title'>Categories</h2>
            <div className='products shops'>

                {arr?.length > 0 && arr.slice(initialVal(arr, page), arr?.length).map((item, index) => (
                    <div
                        key={index}
                        className="product_cart"
                        onClick={() => navigate(`/all-products`, { state: { isFromCategory: true, categoryId: item?._id, categoryName: item.categoryName } })}
                    >
                        <div>
                            <div className='product_img'>
                                <img
                                    src={item?.categoryImg?.url}
                                    alt="product"
                                />
                            </div>
                            <div className='product_name'>
                                {item?.categoryName}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='arrow shop_arrow'>
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

export default Categories