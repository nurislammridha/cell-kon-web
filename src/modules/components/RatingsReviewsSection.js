import React, { useEffect, useMemo, useState } from 'react'

const REVIEWS_PER_PAGE = 10;

const DEFAULT_RATING_BREAKDOWN = [
    { star: 5, percent: 70 },
    { star: 4, percent: 20 },
    { star: 3, percent: 5 },
    { star: 2, percent: 3 },
    { star: 1, percent: 2 },
];

const DEFAULT_REVIEW_ITEMS = [
    { name: 'Rahim Hossain', rating: 5, date: '05 Apr 2026', text: 'Excellent product quality and very fast delivery. Packaging was also very secure.' },
    { name: 'Nusrat Jahan', rating: 4, date: '03 Apr 2026', text: 'Looks exactly like the photos. Value for money is great and the finish is clean.' },
    { name: 'Sabbir Ahmed', rating: 5, date: '02 Apr 2026', text: 'I bought this for my family and everyone liked it. Will order again soon.' },
    { name: 'Fariha Karim', rating: 4, date: '31 Mar 2026', text: 'Good overall experience. Customer support responded quickly to my query.' },
    { name: 'Tanvir Hasan', rating: 5, date: '29 Mar 2026', text: 'Premium feel and the size/color options are very useful. Fully satisfied.' },
    { name: 'Mehedi Islam', rating: 4, date: '27 Mar 2026', text: 'Product is good and as described. Delivery took one extra day but worth it.' },
    { name: 'Arifa Sultana', rating: 5, date: '24 Mar 2026', text: 'One of my best purchases this year. Easy to use and build quality is strong.' },
    { name: 'Shakib Al Hasan', rating: 4, date: '22 Mar 2026', text: 'Nice design and useful features. Price is fair compared to similar products.' },
    { name: 'Tasnim Akter', rating: 5, date: '20 Mar 2026', text: 'Very user friendly and attractive in real life. I highly recommend this item.' },
    { name: 'Mamun Chowdhury', rating: 4, date: '19 Mar 2026', text: 'Received the same product shown in listing. Good quality and neat finishing.' },
    { name: 'Jannatul Ferdous', rating: 5, date: '18 Mar 2026', text: 'Color, texture and fit are all perfect for my needs. Great buying experience.' },
    { name: 'Riyad Khan', rating: 4, date: '16 Mar 2026', text: 'Satisfied with product performance so far. Would like to see more variants.' },
];

const asArray = (value) => {
    if (Array.isArray(value)) {
        return value;
    }

    if (value === null || value === undefined || value === '') {
        return [];
    }

    return [value];
};

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

const RatingsReviewsSection = ({ data }) => {
    const [reviewPage, setReviewPage] = useState(1);

    const apiReviewCount = asArray(data?.commentsInfo).length;
    const averageRating = Math.max(0, toNumber(data?.sellerRatings, 0));
    const reviewSummaryAverage = averageRating > 0 ? averageRating : 4.5;

    const reviewItems = useMemo(() => {
        const incomingReviews = asArray(data?.commentsInfo).map((item, index) => ({
            name: String(item?.name || item?.buyerName || item?.userName || `Customer ${index + 1}`),
            rating: Math.max(1, Math.min(5, Math.round(toNumber(item?.rating, 4)))),
            date: formatReviewDate(item?.date || item?.createdAt),
            text: String(item?.comment || item?.review || item?.message || 'Great product and shopping experience.'),
        }));

        if (incomingReviews.length > 0) {
            return incomingReviews;
        }

        return DEFAULT_REVIEW_ITEMS;
    }, [data]);

    const reviewSummaryCount = reviewItems.length || apiReviewCount || 150;
    const totalReviewPages = Math.max(1, Math.ceil(reviewItems.length / REVIEWS_PER_PAGE));
    const reviewStartIndex = (reviewPage - 1) * REVIEWS_PER_PAGE;
    const visibleReviews = reviewItems.slice(reviewStartIndex, reviewStartIndex + REVIEWS_PER_PAGE);
    const reviewPaginationItems = Array.from({ length: totalReviewPages }, (_, index) => index + 1);

    const renderStars = (rating, keyPrefix = 'review-star') => {
        const safeRating = Math.max(0, Math.min(5, Math.round(toNumber(rating, 0))));

        return Array.from({ length: 5 }, (_, index) => (
            <i
                key={`${keyPrefix}-${index}`}
                className={index < safeRating ? 'fa fa-star star_fill' : 'fa fa-star-o star_empty'}
            ></i>
        ));
    };

    useEffect(() => {
        if (reviewPage > totalReviewPages) {
            setReviewPage(totalReviewPages);
        }
    }, [reviewPage, totalReviewPages]);

    useEffect(() => {
        setReviewPage(1);
    }, [data?._id]);

    return (
        <div className='ratings_reviews_section'>
            <div className='reviews_section_header'>
                <h2>Customer Reviews</h2>
                <p>See what customers are saying before making your purchase.</p>
            </div>

            <div className='reviews_overview_grid'>
                <div className='reviews_summary_card'>
                    <div className='score_value'>{reviewSummaryAverage.toFixed(1)}</div>
                    <div className='score_out_of'>Out of 5.0</div>
                    <div className='score_stars'>
                        {renderStars(reviewSummaryAverage, 'summary')}
                    </div>
                    <div className='score_total'>{reviewSummaryCount} reviews</div>
                </div>

                <div className='reviews_breakdown_card'>
                    {DEFAULT_RATING_BREAKDOWN.map((item) => (
                        <div className='rating_row' key={`rating-${item.star}`}>
                            <div className='label'>{item.star} Star</div>
                            <div className='bar_track'>
                                <div className='bar_fill' style={{ width: `${item.percent}%` }}></div>
                            </div>
                            <div className='percent'>{item.percent}%</div>
                        </div>
                    ))}
                </div>

                <form className='review_form_card' onSubmit={(event) => event.preventDefault()}>
                    <h3>Write a Review</h3>
                    <div className='review_form_fields'>
                        {/* <input type='text' placeholder='Your name' /> */}
                        <select defaultValue=''>
                            <option value='' disabled>Select rating</option>
                            <option value='5'>5 - Excellent</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='3'>3 - Good</option>
                            <option value='2'>2 - Fair</option>
                            <option value='1'>1 - Poor</option>
                        </select>
                        <textarea rows='4' placeholder='Share your review about this product'></textarea>
                        <button type='submit'>Submit Review</button>
                    </div>
                </form>
            </div>

            <div className='reviews_list_card'>
                {visibleReviews.map((item, index) => (
                    <div className='review_item' key={`review-item-${reviewPage}-${index}`}>
                        <div className='review_head'>
                            <div>
                                <div className='reviewer_name'>{item.name}</div>
                                <div className='review_stars'>{renderStars(item.rating, `row-${reviewPage}-${index}`)}</div>
                            </div>
                            <div className='review_date'>{item.date}</div>
                        </div>
                        <p className='review_text'>{item.text}</p>
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
