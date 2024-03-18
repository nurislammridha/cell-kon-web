import React from 'react'
import ProductsPagination from '../components/ProductsPagination'
import AllProducts from '../components/AllProducts'
import Filter from '../components/Filter'
import Order from '../components/Order'
import shopIcon from "../../assets/images/icons/userIcon.png"
import starIcon from "../../assets/images/icons/star.png"
import starFillIcon from "../../assets/images/icons/startFill.png"
const ShopProductsPage = () => {
    return (
        <>
            <div className='product_page'>
                {/* order section */}
                <div className='shop'>
                    <img src={shopIcon} alt='shop icon' />
                    <div className='shop_info'>
                        <h1>Nova Enterprise For Flash Sale COD</h1>
                        <h3 className='mt13'>Delivery in 1-5 Days</h3>
                        <div className='star mt13'>
                            <img src={starFillIcon} />
                            <img src={starFillIcon} />
                            <img src={starFillIcon} />
                            <img src={starFillIcon} />
                            <img src={starIcon} />
                            <h3>(1.8K)</h3>
                        </div>
                        <h3 className='mt13'>Savar, Dhaka, Dhaka</h3>
                    </div>
                </div>
                <div className='filter_product'>
                    {/* Shops  */}
                    <Filter />
                    <div className='filter_right'>
                        <div className='products'>
                            <div className='home_all_products product_form_page'>
                                {/* All products */}
                                <AllProducts />
                                {/* //pagination */}
                                <ProductsPagination />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopProductsPage