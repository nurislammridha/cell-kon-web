import React, { useState } from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { initialVal } from '../../assets/function/globalFunction'
// import { initialVal } from 'src/assets/function/globalFunction'
const Mall = () => {
    const [page, setPage] = useState(1)
    let arr = ["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9", "item10", "item11", "item12", "item13"]

    return (
        <div className='home_products'>
            <h2 className='title'>Sellkon Mall</h2>
            <div className='products'>
                {arr.slice(initialVal(arr, page), arr.length).map((item, index) => (
                    <div className="product_cart">
                        <div>
                            <div className='product_img'>
                                <img
                                    src={pro3}
                                    alt="product"
                                />
                            </div>
                            <div className='product_name'>
                                {item} dff ffg ffg fdedr fdd fd ddf cdd ff fer tes fgr dfdsf df ... ... ..
                            </div>
                        </div>
                        <div>
                            <div className='del_price'>
                                &#2547;9,9990
                            </div>
                            <div className='product_price'>
                                &#2547;8,990
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