import React, { useState } from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { initialVal } from '../../assets/function/globalFunction'
const Categories = ({ arr = [] }) => {
    const [page, setPage] = useState(1)
    return (
        <div className='home_products'>
            <h2 className='title'>Categories</h2>
            <div className='products shops'>

                {arr.length > 0 && arr.slice(initialVal(arr, page), arr.length).map((item, index) => (
                    <div className="product_cart">
                        <div>
                            <div className='product_img'>
                                <img
                                    src={item?.categoryImgUrl}
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