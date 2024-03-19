import React, { useState } from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { initialVal } from '../../assets/function/globalFunction'
// import { initialVal } from 'src/assets/function/globalFunction'
const Mall = ({ arr = [] }) => {
    const [page, setPage] = useState(1)
    // let arr = ["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9", "item10", "item11", "item12", "item13"]

    return (
        <div className='home_products'>
            <h2 className='title'>Sellkon Mall</h2>
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
        </div >
    )
}

export default Mall