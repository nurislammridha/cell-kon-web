import React from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
const Categories = () => {
    return (
        <div className='home_products'>
            <h2 className='title'>Categories</h2>
            <div className='products shops'>

                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((item, index) => (
                    <div className="product_cart">
                        <div>
                            <div className='product_img'>
                                <img
                                    src={pro3}
                                    alt="product"
                                />
                            </div>
                            <div className='product_name'>
                                Bike Bazar BD ddd ddd
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='arrow shop_arrow'>
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

export default Categories