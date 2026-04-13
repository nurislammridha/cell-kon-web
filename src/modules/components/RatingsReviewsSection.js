import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../../utils/ToastHelper'

const REVIEWS_PER_PAGE = 10;
const DEFAULT_BREAKDOWN = [5, 4, 3, 2, 1].map((star) => ({ star, count: 0, percent: 0 }));

const toNumber = (value, fallback = 0) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
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
    const navigate = useNavigate();
    const productId = data?._id;

    const [reviewPage, setReviewPage] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [summary, setSummary] = useState({ averageRating: 0, totalReviews: 0, breakdown: DEFAULT_BREAKDOWN });
    const [pagination, setPagination] = useState({ totalPage: 1, currentPage: 1, count: 0 });
    const [isReviewsLoading, setIsReviewsLoading] = useState(false);

    const [myReview, setMyReview] = useState(null);
    const [eligibility, setEligibility] = useState({ canCreate: false, message: '' });
    const [isMyDataLoading, setIsMyDataLoading] = useState(false);

    const [ratingInput, setRatingInput] = useState(0);
    const [reviewInput, setReviewInput] = useState('');
    const [isEditingMyReview, setIsEditingMyReview] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

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
            setEligibility({ canCreate: false, message: '' });
            return;
        }

        setIsMyDataLoading(true);

        try {
            const [myReviewRes, eligibilityRes] = await Promise.all([
                Axios.get(`${reviewApiBase}/product/${productId}/mine`),
                Axios.get(`${reviewApiBase}/eligibility/${productId}`),
            ]);

            const nextMyReview = myReviewRes?.data?.result || null;
            const eligibilityResult = eligibilityRes?.data?.result || { canCreate: false, message: '' };

            setMyReview(nextMyReview);
            setEligibility(eligibilityResult);

            if (nextMyReview) {
                setRatingInput(Math.max(0, Math.min(5, Math.round(toNumber(nextMyReview?.rating, 0)))));
                setReviewInput(String(nextMyReview?.review || ''));
            } else {
                setRatingInput(0);
                setReviewInput('');
            }
        } catch (error) {
            setMyReview(null);
            setEligibility({ canCreate: false, message: '' });
        } finally {
            setIsMyDataLoading(false);
        }
    }, [isLogin, productId, reviewApiBase]);

    useEffect(() => {
        setReviewPage(1);
        setIsEditingMyReview(false);
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

    const isApprovedReview = myReview?.status === 'approved';
    const canEditOrDelete = Boolean(myReview && !isApprovedReview);
    const shouldDisableForm = !isLogin
        || isSubmitting
        || isDeleting
        || isMyDataLoading
        || isApprovedReview
        || (Boolean(myReview) && !isEditingMyReview)
        || (!myReview && eligibility?.canCreate === false);

    const openLogin = () => {
        localStorage.setItem('redirect_details', productId || '');
        localStorage.setItem('redirect_url', 'product_details');
        navigate('/login');
    };

    const handleStartEdit = () => {
        if (!myReview) {
            return;
        }

        setRatingInput(Math.max(0, Math.min(5, Math.round(toNumber(myReview?.rating, 0)))));
        setReviewInput(String(myReview?.review || ''));
        setIsEditingMyReview(true);
    };

    const handleCancelEdit = () => {
        if (myReview) {
            setRatingInput(Math.max(0, Math.min(5, Math.round(toNumber(myReview?.rating, 0)))));
            setReviewInput(String(myReview?.review || ''));
        } else {
            setRatingInput(0);
            setReviewInput('');
        }

        setIsEditingMyReview(false);
    };

    const handleSubmitReview = async (event) => {
        event.preventDefault();

        if (!isLogin) {
            showToast('error', 'Please login to submit a review.');
            openLogin();
            return;
        }

        if (!productId) {
            showToast('error', 'Product information is missing.');
            return;
        }

        if (!ratingInput && reviewInput.trim().length > 0) {
            showToast('error', 'Please provide a rating along with your review.');
            return;
        }

        if (!ratingInput) {
            showToast('error', 'Please provide a rating.');
            return;
        }

        const payload = {
            productId,
            rating: ratingInput,
            review: reviewInput.trim(),
        };

        setIsSubmitting(true);

        try {
            const url = myReview && isEditingMyReview
                ? `${reviewApiBase}/${myReview?._id}`
                : `${reviewApiBase}`;

            const request = myReview && isEditingMyReview
                ? Axios.put(url, payload)
                : Axios.post(url, payload);

            const res = await request;

            if (res?.data?.status) {
                showToast('success', res?.data?.message || 'Review submitted successfully.');
                setIsEditingMyReview(false);
                await Promise.all([fetchReviews(reviewPage), fetchMyReviewData()]);
            }
        } catch (error) {
            const message = error?.response?.data?.message || 'Failed to submit review.';
            showToast('error', message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteReview = async () => {
        if (!myReview?._id || !canEditOrDelete) {
            return;
        }

        const confirmed = window.confirm('Are you sure you want to delete your review?');
        if (!confirmed) {
            return;
        }

        setIsDeleting(true);

        try {
            const res = await Axios.delete(`${reviewApiBase}/${myReview._id}`);

            if (res?.data?.status) {
                showToast('success', res?.data?.message || 'Review deleted successfully.');
                setIsEditingMyReview(false);
                setRatingInput(0);
                setReviewInput('');

                await Promise.all([fetchReviews(1), fetchMyReviewData()]);
                setReviewPage(1);
            }
        } catch (error) {
            const message = error?.response?.data?.message || 'Failed to delete review.';
            showToast('error', message);
        } finally {
            setIsDeleting(false);
        }
    };

    const totalReviewPages = Math.max(1, Number(pagination?.totalPage || 1));
    const reviewPaginationItems = Array.from({ length: totalReviewPages }, (_, index) => index + 1);

    return (
        <div className='ratings_reviews_section'>
            <div className='reviews_section_header'>
                <h2>Customer Reviews</h2>
                <p>See what customers are saying before making your purchase.</p>
            </div>

            {myReview && <div className='my_review_card'>
                <div className='my_review_top'>
                    <h4>Your Review</h4>
                    <span className={`status_badge ${myReview?.status || 'disapproved'}`}>{String(myReview?.status || 'disapproved')}</span>
                </div>
                <div className='my_review_rating'>{renderStars(myReview?.rating, 'my-review')}</div>
                <p>{myReview?.review || 'You rated this product without a written review.'}</p>
                {canEditOrDelete && <div className='my_review_actions'>
                    <button type='button' onClick={handleStartEdit}>Edit</button>
                    <button type='button' className='danger' onClick={handleDeleteReview} disabled={isDeleting}>
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>}
                {isApprovedReview && <small>Approved reviews are locked from editing or deleting.</small>}
            </div>}

            <div className='reviews_overview_grid'>
                <div className='reviews_summary_card'>
                    <div className='score_value'>{toNumber(summary?.averageRating, 0).toFixed(1)}</div>
                    <div className='score_out_of'>Out of 5.0</div>
                    <div className='score_stars'>
                        {renderStars(summary?.averageRating, 'summary')}
                    </div>
                    <div className='score_total'>{Number(summary?.totalReviews || 0)} reviews</div>
                </div>

                <div className='reviews_breakdown_card'>
                    {normalizedBreakdown.map((item) => (
                        <div className='rating_row' key={`rating-${item.star}`}>
                            <div className='label'>{item.star} Star</div>
                            <div className='bar_track'>
                                <div className='bar_fill' style={{ width: `${item.percent}%` }}></div>
                            </div>
                            <div className='percent'>{item.percent}%</div>
                        </div>
                    ))}
                </div>

                <form className='review_form_card' onSubmit={handleSubmitReview}>
                    <h3>{myReview && isEditingMyReview ? 'Update Your Review' : 'Write a Review'}</h3>

                    {!isLogin && <div className='review_form_state'>Please login to submit a review.
                        <button type='button' className='outline_btn' onClick={openLogin}>Login</button>
                    </div>}

                    {isLogin && !myReview && eligibility?.canCreate === false && <div className='review_form_state warning'>{eligibility?.message || 'You are not eligible to review this product yet.'}</div>}

                    {isLogin && myReview && !isEditingMyReview && !isApprovedReview && (
                        <div className='review_form_state'>You have already reviewed this product. Click Edit to update.</div>
                    )}

                    {isLogin && isApprovedReview && <div className='review_form_state warning'>Your review is approved and cannot be modified.</div>}

                    <div className='review_form_fields'>
                        <div className='rating_input_row'>
                            {Array.from({ length: 5 }, (_, index) => {
                                const star = index + 1;
                                const active = star <= ratingInput;
                                return (
                                    <button
                                        key={`rate-${star}`}
                                        type='button'
                                        className={active ? 'star_pick active' : 'star_pick'}
                                        disabled={shouldDisableForm}
                                        onClick={() => setRatingInput(star)}
                                    >
                                        <i className='fa fa-star'></i>
                                    </button>
                                );
                            })}
                        </div>
                        <textarea
                            rows='4'
                            placeholder='Share your review about this product (optional)'
                            value={reviewInput}
                            disabled={shouldDisableForm}
                            onChange={(event) => setReviewInput(event.target.value)}
                        ></textarea>

                        <button type='submit' disabled={shouldDisableForm}>
                            {isSubmitting ? 'Saving...' : myReview && isEditingMyReview ? 'Update Review' : 'Submit Review'}
                        </button>

                        {myReview && isEditingMyReview && (
                            <button type='button' className='outline_btn' onClick={handleCancelEdit} disabled={isSubmitting}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className='reviews_list_card'>
                {isReviewsLoading && <div className='review_loading'>Loading reviews...</div>}

                {!isReviewsLoading && reviews.length === 0 && (
                    <div className='review_empty'>No approved reviews yet. Be the first to rate this product.</div>
                )}

                {!isReviewsLoading && reviews.map((item, index) => (
                    <div className='review_item' key={`review-item-${reviewPage}-${index}`}>
                        <div className='review_head'>
                            <div>
                                <div className='reviewer_name'>{item?.buyerName || item?.userName || `Customer ${index + 1}`}</div>
                                <div className='review_stars'>{renderStars(item?.rating, `row-${reviewPage}-${index}`)}</div>
                            </div>
                            <div className='review_date'>{formatReviewDate(item?.createdAt || item?.date)}</div>
                        </div>
                        <p className='review_text'>{item?.review || item?.comment || 'Rated this product.'}</p>
                    </div>
                ))}
            </div>

            <div className='review_pagination'>
                <button
                    type='button'
                    className='page_btn'
                    disabled={reviewPage === 1}
                    onClick={() => reviewPage > 1 ? setReviewPage(reviewPage - 1) : {}}
                >
                    Prev
                </button>
                {reviewPaginationItems.map((item) => (
                    <button
                        type='button'
                        key={`review-page-${item}`}
                        className={reviewPage === item ? 'page_btn active' : 'page_btn'}
                        onClick={() => setReviewPage(item)}
                    >
                        {item}
                    </button>
                ))}
                <button
                    type='button'
                    className='page_btn'
                    disabled={reviewPage === totalReviewPages}
                    onClick={() => reviewPage < totalReviewPages ? setReviewPage(reviewPage + 1) : {}}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default RatingsReviewsSection;
