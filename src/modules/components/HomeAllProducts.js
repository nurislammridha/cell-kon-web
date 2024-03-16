import React from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
const HomeAllProducts = () => {
    return (
        <div className='home_all_products'>
            <div className='all_title'>
                <h2 className='title'>All Products</h2>
                <a className='view_all' href=''>View All</a>
            </div>
            <div className='products'>

                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17].map((item, index) => (
                    <div className="product_cart">
                        <div>
                            <div className='product_img'>
                                <img
                                    src={pro3}
                                    alt="product"
                                />
                            </div>
                            <div className='product_name'>
                                he llo bi ke dff fe r te s fg rd f d sf df ... ... ..
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

        </div>
    )
}

export default HomeAllProducts