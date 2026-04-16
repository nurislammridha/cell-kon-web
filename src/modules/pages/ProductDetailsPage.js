import React, { useEffect, useRef, useState } from 'react'
import RelatedProducts from '../components/RelatedProducts'
import FullDetails from '../components/FullDetails'
import ShortDetails from '../components/ShortDetails'
import ProductDetails from '../components/ProductDetails'
import RatingsReviewsSection from '../components/RatingsReviewsSection'
import { useDispatch, useSelector } from 'react-redux'
import { ProductDetailsById } from '../_redux/CommonAction'
import { useLocation, useParams } from 'react-router-dom'

const ProductDetailsPage = ({ isLogin }) => {
    const DESCRIPTION_SECTION_ID = 'descriptions-section';
    const PRODUCT_DETAILS_SECTION_ID = 'product-details-section';
    const CUSTOMER_REVIEWS_SECTION_ID = 'customer-reviews-section';

    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { id } = useParams();
    const productDetails = useSelector((state) => state.homeInfo.productDetails);
    const [activeSectionId, setActiveSectionId] = useState(DESCRIPTION_SECTION_ID);
    const leftColumnRef = useRef(null);
    const [rightColumnMaxHeight, setRightColumnMaxHeight] = useState(null);

    const handleSectionNavClick = (sectionId) => {
        const targetSection = document.getElementById(sectionId);

        if (!targetSection) {
            return;
        }

        const headerOffset = window.innerWidth <= 450 ? 74 : 18;
        const targetY = targetSection.getBoundingClientRect().top + window.scrollY - headerOffset;

        window.scrollTo({
            top: Math.max(0, targetY),
            behavior: 'smooth',
        });

        setActiveSectionId(sectionId);
    };

    useEffect(() => {
        dispatch(ProductDetailsById(id));
    }, [dispatch, id])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    useEffect(() => {
        setActiveSectionId(DESCRIPTION_SECTION_ID)
    }, [id])

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const syncRightColumnHeight = () => {
            if (window.innerWidth <= 900) {
                setRightColumnMaxHeight(null);
                return;
            }

            const leftHeight = leftColumnRef.current?.offsetHeight || 0;
            setRightColumnMaxHeight(leftHeight > 0 ? leftHeight : null);
        };

        syncRightColumnHeight();

        let resizeObserver;
        if (typeof ResizeObserver !== 'undefined' && leftColumnRef.current) {
            resizeObserver = new ResizeObserver(syncRightColumnHeight);
            resizeObserver.observe(leftColumnRef.current);
        }

        window.addEventListener('resize', syncRightColumnHeight);

        return () => {
            window.removeEventListener('resize', syncRightColumnHeight);
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, [productDetails, isLogin]);

    return (
        <>
            <div className='details_page'>
                <ProductDetails data={productDetails} isLogin={isLogin} />
                <div className='rel_top'>
                    <div className='rel_top_left' ref={leftColumnRef}>
                        <div className='details_section_nav'>
                            <button
                                type='button'
                                className={activeSectionId === DESCRIPTION_SECTION_ID ? 'nav_btn active' : 'nav_btn'}
                                onClick={() => handleSectionNavClick(DESCRIPTION_SECTION_ID)}
                            >
                                Descriptions
                            </button>
                            <button
                                type='button'
                                className={activeSectionId === PRODUCT_DETAILS_SECTION_ID ? 'nav_btn active' : 'nav_btn'}
                                onClick={() => handleSectionNavClick(PRODUCT_DETAILS_SECTION_ID)}
                            >
                                Product Details
                            </button>
                            <button
                                type='button'
                                className={activeSectionId === CUSTOMER_REVIEWS_SECTION_ID ? 'nav_btn active' : 'nav_btn'}
                                onClick={() => handleSectionNavClick(CUSTOMER_REVIEWS_SECTION_ID)}
                            >
                                Customer Reviews
                            </button>
                        </div>
                        <div id={DESCRIPTION_SECTION_ID} className='details_section_anchor'>
                            <ShortDetails data={productDetails?.short_description || productDetails?.shortDescriptions} />
                        </div>
                        <div id={PRODUCT_DETAILS_SECTION_ID} className='details_section_anchor' >
                            <FullDetails
                                data={productDetails?.full_description || productDetails?.longDescriptions}
                                videoUrl={productDetails?.video_urls || productDetails?.videoUrl}
                            />
                        </div>
                        <div id={CUSTOMER_REVIEWS_SECTION_ID} className='details_section_anchor' style={{ marginBottom: "20px" }}>
                            <RatingsReviewsSection data={productDetails} isLogin={isLogin} />
                        </div>
                    </div>
                    <div
                        className={rightColumnMaxHeight ? 'rel_top_right sync_height_scroll' : 'rel_top_right'}
                        style={rightColumnMaxHeight ? { maxHeight: `${rightColumnMaxHeight}px` } : undefined}
                    >
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