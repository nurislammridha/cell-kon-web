import React, { useEffect } from 'react'
import RelatedProducts from '../components/RelatedProducts'
import FullDetails from '../components/FullDetails'
import ShortDetails from '../components/ShortDetails'
import ProductDetails from '../components/ProductDetails'
import { useDispatch, useSelector } from 'react-redux'
import { ProductDetailsById } from '../_redux/CommonAction'
import { useLocation, useParams } from 'react-router-dom'

const ProductDetailsPage = ({ isLogin }) => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { id } = useParams();
    const productDetails = useSelector((state) => state.homeInfo.productDetails);
    // const { categoriesList, data, popularProducts,
    //     sellKonMallProducts, shopsList, trendingProducts } = productDetails || {}
    console.log('productDetails', productDetails)
    useEffect(() => {
        dispatch(ProductDetailsById(id));
    }, [id])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return (
        <>
            <div className='details_page'>
                <ProductDetails data={productDetails} isLogin={isLogin} />
                <div className='rel_top'>
                    <div className='rel_top_left'>
                        <ShortDetails data={productDetails?.shortDescriptions} />
                        <FullDetails
                            data={productDetails?.longDescriptions}
                            videoUrl={productDetails?.videoUrl}
                        />
                    </div>
                    <div className='rel_top_right'>
                        <RelatedProducts arr={productDetails?.relatedProducts} />
                    </div>
                </div>
                <div className='mobile_rel_top_right'>
                    {productDetails?.relatedProducts?.length > 0 && <RelatedProducts arr={productDetails?.relatedProducts} />}
                </div>
            </div>
        </>
    )
}

export default ProductDetailsPage