import React from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { useNavigate } from 'react-router-dom'
const AllProducts = ({ list = [] }) => {
    const navigate = useNavigate()
    return (
        <div className='products'>
            {list?.length > 0 ? list.map((item, index) => (
                <div
                    key={index}
                    className="product_cart cp"
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
            )) : (
                <div><h2 className='tac'>No products found</h2></div>
            )}

        </div>
    )
}

export default AllProducts