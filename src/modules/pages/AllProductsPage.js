import React from 'react'
import ProductsPagination from '../components/ProductsPagination'
import AllProducts from '../components/AllProducts'
import Filter from '../components/Filter'
import Order from '../components/Order'

const AllProductsPage = () => {
    return (
        <>
            <div className='product_page'>
                {/* order section */}
                <Order />
                <div className='filter_product'>
                    {/* Filter  */}
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

export default AllProductsPage