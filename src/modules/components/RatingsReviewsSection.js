import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Axios from 'axios'

const REVIEWS_PER_PAGE = 10;
const DEFAULT_BREAKDOWN = [5, 4, 3, 2, 1].map((star) => ({ star, count: 0, percent: 0 }));

const toNumber = (value, fallback = 0) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeReviewImages = (value) => {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .map((item) => {
            if (typeof item === 'string') {
                return item.trim();
            }

            if (item && typeof item === 'object') {
                return String(item.url || item.secure_url || item.src || '').trim();
            }

            return '';
        })
        .filter(Boolean)
        .slice(0, 4);
};

const formatReviewDate = (value) => {
    if (!value) {
        return 'Recent order';
    }

    const parsedDate = new Date(value);
    if (!Number.isNaN(parsedDate.getTime())) {
        return parsedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    }

    return String(value).slice(0, 11);
};

const RatingsReviewsSection = ({ data, isLogin = false }) => {
    const productId = data?._id;

    const [reviewPage, setReviewPage] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [summary, setSummary] = useState({ averageRating: 0, totalReviews: 0, breakdown: DEFAULT_BREAKDOWN });
    const [pagination, setPagination] = useState({ totalPage: 1, currentPage: 1, count: 0 });
    const [isReviewsLoading, setIsReviewsLoading] = useState(false);

    const [myReview, setMyReview] = useState(null);
    const [isMyDataLoading, setIsMyDataLoading] = useState(false);

    const reviewApiBase = `${process.env.REACT_APP_API_URL}review`;

    const fetchReviews = useCallback(async (page = 1) => {
        if (!productId) {
            return;
        }

        setIsReviewsLoading(true);

        try {
            const url = `${reviewApiBase}/product/${productId}?page=${page}&limit=${REVIEWS_PER_PAGE}`;
            const res = await Axios.get(url);

            if (res?.data?.status) {
                const result = res?.data?.result || {};
                setReviews(result?.reviews || []);
                setSummary(result?.summary || { averageRating: 0, totalReviews: 0, breakdown: DEFAULT_BREAKDOWN });
                setPagination(result?.pagination || { totalPage: 1, currentPage: 1, count: 0 });
            }
        } catch (error) {
            setReviews([]);
            setSummary({ averageRating: 0, totalReviews: 0, breakdown: DEFAULT_BREAKDOWN });
            setPagination({ totalPage: 1, currentPage: 1, count: 0 });
        } finally {
            setIsReviewsLoading(false);
        }
    }, [productId, reviewApiBase]);

    const fetchMyReviewData = useCallback(async () => {
        if (!isLogin || !productId) {
            setMyReview(null);
            return;
        }

        setIsMyDataLoading(true);

        try {
            const myReviewRes = await Axios.get(`${reviewApiBase}/product/${productId}/mine`);
            setMyReview(myReviewRes?.data?.result || null);
        } catch (error) {
            setMyReview(null);
        } finally {
            setIsMyDataLoading(false);
        }
    }, [isLogin, productId, reviewApiBase]);

    useEffect(() => {
        setReviewPage(1);
    }, [productId]);

    useEffect(() => {
        fetchReviews(reviewPage);
    }, [fetchReviews, reviewPage]);

    useEffect(() => {
        fetchMyReviewData();
    }, [fetchMyReviewData]);

    const normalizedBreakdown = useMemo(() => {
        const incoming = Array.isArray(summary?.breakdown) ? summary.breakdown : [];
        if (incoming.length === 0) {
            return DEFAULT_BREAKDOWN;
        }

        return [5, 4, 3, 2, 1].map((star) => {
            const item = incoming.find((entry) => Number(entry?.star) === star);
            return {
                star,
                count: Number(item?.count || 0),
                percent: Number(item?.percent || 0),
            };
        });
    }, [summary]);

    const renderStars = (rating, keyPrefix = 'review-star') => {
        const safeRating = Math.max(0, Math.min(5, Math.round(toNumber(rating, 0))));

        return Array.from({ length: 5 }, (_, index) => (
            <i
                key={`${keyPrefix}-${index}`}
                className={index < safeRating ? 'fa fa-star star_fill' : 'fa fa-star-o star_empty'}
            ></i>
        ));
    };

    const totalReviewPages = Math.max(1, Number(pagination?.totalPage || 1));
    const reviewPaginationItems = Array.from({ length: totalReviewPages }, (_, index) => index + 1);

    return (<></>
        // <div className='ratings_reviews_section'>
        //     <div className='reviews_section_header'>
        //         <h2>Customer Reviews</h2>
        //         <p>See what customers are saying before making your purchase.</p>
        //     </div>

        //     {isLogin && myReview && <div className='my_review_card'>
        //         <div className='my_review_top'>
        //             <h4>Your Review</h4>
        //             <span className={`status_badge ${myReview?.status || 'disapproved'}`}>{String(myReview?.status || 'disapproved')}</span>
        //         </div>
        //         <div className='my_review_rating'>{renderStars(myReview?.rating, 'my-review')}</div>
        //         <p>{myReview?.review || 'You rated this product without a written review.'}</p>
        //         {normalizeReviewImages(myReview?.reviewImages).length > 0 && <div className='my_review_images'>
        //             {normalizeReviewImages(myReview?.reviewImages).map((image, index) => (
        //                 <img key={`my-review-image-${index}`} src={image} alt={`Your review ${index + 1}`} className='my_review_image' />
        //             ))}
        //         </div>}
        //         {isMyDataLoading && <small>Refreshing your review...</small>}
        //     </div>}

        //     <div className='reviews_overview_grid'>
        //         <div className='reviews_summary_card'>
        //             <div className='score_value'>{toNumber(summary?.averageRating, 0).toFixed(1)}</div>
        //             <div className='score_out_of'>Out of 5.0</div>
        //             <div className='score_stars'>
        //                 {renderStars(summary?.averageRating, 'summary')}
        //             </div>
        //             <div className='score_total'>{Number(summary?.totalReviews || 0)} reviews</div>
        //         </div>

        //         <div className='reviews_breakdown_card'>
        //             {normalizedBreakdown.map((item) => (
        //                 <div className='rating_row' key={`rating-${item.star}`}>
        //                     <div className='label'>{item.star} Star</div>
        //                     <div className='bar_track'>
        //                         <div className='bar_fill' style={{ width: `${item.percent}%` }}></div>
        //                     </div>
        //                     <div className='percent'>{item.percent}%</div>
        //                 </div>
        //             ))}
        //         </div>
        //     </div>

        //     <div className='reviews_list_card'>
        //         {isReviewsLoading && <div className='review_loading'>Loading reviews...</div>}

        //         {!isReviewsLoading && reviews.length === 0 && (
        //             <div className='review_empty'>No approved reviews yet. Be the first to rate this product.</div>
        //         )}

        //         {!isReviewsLoading && reviews.map((item, index) => (
        //             <div className='review_item' key={`review-item-${reviewPage}-${index}`}>
        //                 <div className='review_head'>
        //                     <div>
        //                         <div className='reviewer_name'>{item?.buyerName || item?.userName || `Customer ${index + 1}`}</div>
        //                         <div className='review_stars'>{renderStars(item?.rating, `row-${reviewPage}-${index}`)}</div>
        //                     </div>
        //                     <div className='review_date'>{formatReviewDate(item?.createdAt || item?.date)}</div>
        //                 </div>
        //                 <p className='review_text'>{item?.review || item?.comment || 'Rated this product.'}</p>
        //                 {normalizeReviewImages(item?.reviewImages).length > 0 && (
        //                     <div className='review_images_grid'>
        //                         {normalizeReviewImages(item?.reviewImages).map((image, imageIndex) => (
        //                             <img
        //                                 key={`review-image-${reviewPage}-${index}-${imageIndex}`}
        //                                 src={image}
        //                                 alt={`Review ${index + 1} image ${imageIndex + 1}`}
        //                                 className='review_image_item'
        //                             />
        //                         ))}
        //                     </div>
        //                 )}
        //             </div>
        //         ))}
        //     </div>

        //     <div className='review_pagination'>
        //         <button
        //             type='button'
        //             className='page_btn'
        //             disabled={reviewPage === 1}
        //             onClick={() => reviewPage > 1 ? setReviewPage(reviewPage - 1) : {}}
        //         >
        //             Prev
        //         </button>
        //         {reviewPaginationItems.map((item) => (
        //             <button
        //                 type='button'
        //                 key={`review-page-${item}`}
        //                 className={reviewPage === item ? 'page_btn active' : 'page_btn'}
        //                 onClick={() => setReviewPage(item)}
        //             >
        //                 {item}
        //             </button>
        //         ))}
        //         <button
        //             type='button'
        //             className='page_btn'
        //             disabled={reviewPage === totalReviewPages}
        //             onClick={() => reviewPage < totalReviewPages ? setReviewPage(reviewPage + 1) : {}}
        //         >
        //             Next
        //         </button>
        //     </div>
        // </div>
    );
};

export default RatingsReviewsSection;
