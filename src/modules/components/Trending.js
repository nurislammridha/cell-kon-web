import React from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
const Trending = () => {
    return (
        <div className='home_products'>
            <h2 className='title'>Trending Products</h2>
            <div className='products'>
                {[1, 2, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((item, index) => (
                    <div className="product_cart">
                        <div>
                            <div className='product_img'>
                                <img
                                    src={pro3}
                                    alt="product"
                                />
                            </div>
                            <div className='product_name'>
                                hello bike dff fer tes fgr dfdsf df ... ... ..
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
                <div className='left_arrow'>
                    <i class='fas fa-chevron-left'></i>
                </div>
                <div className='right_arrow'>
                    <i class='fas fa-chevron-right'></i>
                </div>
            </div>
        </div>
    )
}

export default Trending