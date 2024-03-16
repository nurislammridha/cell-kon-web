import React from 'react'
import RelatedProducts from '../components/RelatedProducts'
import FullDetails from '../components/FullDetails'
import ShortDetails from '../components/ShortDetails'
import ProductDetails from '../components/ProductDetails'

const ProductDetailsPage = () => {
    return (
        <>
            <div className='details_page'>
                <ProductDetails />
                <ShortDetails />
                <FullDetails />
                <RelatedProducts />
            </div>


        </>
    )
}

export default ProductDetailsPage