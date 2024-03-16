import React from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
const AllProducts = () => {
    return (
        <div className='products'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((item, index) => (
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
    )
}

export default AllProducts