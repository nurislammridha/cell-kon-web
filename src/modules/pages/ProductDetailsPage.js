import React, { useEffect } from 'react'
import RelatedProducts from '../components/RelatedProducts'
import FullDetails from '../components/FullDetails'
import ShortDetails from '../components/ShortDetails'
import ProductDetails from '../components/ProductDetails'
import { useDispatch, useSelector } from 'react-redux'
import { ProductDetailsById } from '../_redux/CommonAction'
import { useParams } from 'react-router-dom'

const ProductDetailsPage = ({ isLogin }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const productDetails = useSelector((state) => state.homeInfo.productDetails);
    // const { categoriesList, data, popularProducts,
    //     sellKonMallProducts, shopsList, trendingProducts } = productDetails || {}
    console.log('productDetails', productDetails)
    useEffect(() => {
        dispatch(ProductDetailsById(id));
    }, [id])
    return (
        <>
            <div className='details_page'>
                <ProductDetails data={productDetails} isLogin={isLogin} />
                <ShortDetails data={productDetails?.shortDescriptions} />
                <FullDetails data={productDetails?.longDescriptions} />
                <RelatedProducts arr={productDetails?.relatedProducts} />
            </div>
        </>
    )
}

export default ProductDetailsPage