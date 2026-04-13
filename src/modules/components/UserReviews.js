import React, { useEffect, useMemo, useState } from 'react'
import Axios from 'axios'
import { showToast } from '../../utils/ToastHelper'

const REVIEWS_PER_PAGE = 10;

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

const UserReviews = () => {
    const [reviews, setReviews] = useState([])
    const [pagination, setPagination] = useState({ totalPage: 1, currentPage: 1, count: 0 })
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [editingId, setEditingId] = useState('')
    const [editingRating, setEditingRating] = useState(0)
    const [editingReview, setEditingReview] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const reviewApiBase = `${process.env.REACT_APP_API_URL}review`

    const fetchMyReviews = async (nextPage = page, nextSearch = search, nextStatus = status) => {
        setIsLoading(true)

        try {
            let url = `${reviewApiBase}/my/list?page=${nextPage}&limit=${REVIEWS_PER_PAGE}`

            if (nextSearch.trim().length > 0) {
                url += `&search=${encodeURIComponent(nextSearch.trim())}`
            }

            if (nextStatus) {
                url += `&status=${encodeURIComponent(nextStatus)}`
            }

            const res = await Axios.get(url)
            if (res?.data?.status) {
                const result = res?.data?.result || {}
                setReviews(result?.reviews || [])
                setPagination(result?.pagination || { totalPage: 1, currentPage: 1, count: 0 })
            }
        } catch (error) {
            const message = error?.response?.data?.message || 'Failed to load your reviews.'
            showToast('error', message)
            setReviews([])
            setPagination({ totalPage: 1, currentPage: 1, count: 0 })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchMyReviews(page, search, status)
        }, 280)

        return () => clearTimeout(timer)
    }, [page, search, status])

    useEffect(() => {
        setPage(1)
    }, [search, status])

    const totalPages = Math.max(1, Number(pagination?.totalPage || 1))
    const pageItems = useMemo(() => {
        return Array.from({ length: totalPages }, (_, index) => index + 1)
    }, [totalPages])

    const renderStars = (rating, keyPrefix = 'review-star') => {
        const safeRating = Math.max(0, Math.min(5, Math.round(toNumber(rating, 0))))

        return Array.from({ length: 5 }, (_, index) => (
            <i
                key={`${keyPrefix}-${index}`}
                className={index < safeRating ? 'fa fa-star star_fill' : 'fa fa-star-o star_empty'}
            ></i>
        ))
    }

    const startEdit = (review) => {
        setEditingId(review?._id || '')
        setEditingRating(Math.max(0, Math.min(5, Math.round(toNumber(review?.rating, 0)))))
        setEditingReview(String(review?.review || ''))
    }

    const cancelEdit = () => {
        setEditingId('')
        setEditingRating(0)
        setEditingReview('')
    }

    const handleUpdateReview = async (review) => {
        if (!review?._id) {
            return
        }

        if (!editingRating && editingReview.trim().length > 0) {
            showToast('error', 'Please provide a rating along with your review.')
            return
        }

        if (!editingRating) {
            showToast('error', 'Please provide a rating.')
            return
        }

        setIsSaving(true)

        try {
            const payload = {
                rating: editingRating,
                review: editingReview.trim(),
            }

            const res = await Axios.put(`${reviewApiBase}/${review._id}`, payload)

            if (res?.data?.status) {
                showToast('success', res?.data?.message || 'Review updated successfully.')
                cancelEdit()
                await fetchMyReviews(page, search, status)
            }
        } catch (error) {
            const message = error?.response?.data?.message || 'Failed to update review.'
            showToast('error', message)
        } finally {
            setIsSaving(false)
        }
    }

    const handleDeleteReview = async (reviewId) => {
        if (!reviewId) {
            return
        }

        const isConfirmed = window.confirm('Are you sure you want to delete this review?')
        if (!isConfirmed) {
            return
        }

        setIsDeleting(true)

        try {
            const res = await Axios.delete(`${reviewApiBase}/${reviewId}`)

            if (res?.data?.status) {
                showToast('success', res?.data?.message || 'Review deleted successfully.')
                if (editingId === reviewId) {
                    cancelEdit()
                }
                await fetchMyReviews(page, search, status)
            }
        } catch (error) {
            const message = error?.response?.data?.message || 'Failed to delete review.'
            showToast('error', message)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className='right user_reviews_panel' style={{ paddingBottom: '70px' }}>
            <p className='user_txt'>Rates & Reviews</p>

            <div className='user_reviews_toolbar mt24'>
                <input
                    type='text'
                    placeholder='Search reviews by product or text'
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
                <select value={status} onChange={(event) => setStatus(event.target.value)}>
                    <option value=''>All Status</option>
                    <option value='approved'>Approved</option>
                    <option value='disapproved'>Disapproved</option>
                    <option value='rejected'>Rejected</option>
                </select>
            </div>

            <div className='user_reviews_list mt24'>
                {isLoading && <div className='user_reviews_empty'>Loading your reviews...</div>}

                {!isLoading && reviews.length === 0 && (
                    <div className='user_reviews_empty'>No reviews found.</div>
                )}

                {!isLoading && reviews.map((review) => {
                    const isApproved = review?.status === 'approved'
                    const isEditing = editingId === review?._id

                    return (
                        <div key={review?._id} className='user_review_item'>
                            <div className='user_review_top'>
                                <div>
                                    <h4>{review?.productInfo?.productName || review?.productName || 'Product'}</h4>
                                    <div className='user_review_date'>{formatReviewDate(review?.createdAt)}</div>
                                </div>
                                <span className={`status_badge ${review?.status || 'disapproved'}`}>{String(review?.status || 'disapproved')}</span>
                            </div>

                            <div className='user_review_rating'>
                                {renderStars(review?.rating, `my-rating-${review?._id}`)}
                            </div>

                            {!isEditing && <p className='user_review_text'>{review?.review || 'You rated this product without a written review.'}</p>}

                            {isEditing && (
                                <div className='user_review_edit_box'>
                                    <div className='rating_input_row'>
                                        {Array.from({ length: 5 }, (_, index) => {
                                            const star = index + 1
                                            const active = star <= editingRating
                                            return (
                                                <button
                                                    key={`edit-rate-${review?._id}-${star}`}
                                                    type='button'
                                                    className={active ? 'star_pick active' : 'star_pick'}
                                                    onClick={() => setEditingRating(star)}
                                                    disabled={isSaving}
                                                >
                                                    <i className='fa fa-star'></i>
                                                </button>
                                            )
                                        })}
                                    </div>
                                    <textarea
                                        rows='4'
                                        value={editingReview}
                                        onChange={(event) => setEditingReview(event.target.value)}
                                        disabled={isSaving}
                                    ></textarea>
                                </div>
                            )}

                            <div className='user_review_actions'>
                                {!isApproved && !isEditing && (
                                    <button type='button' onClick={() => startEdit(review)}>Edit</button>
                                )}
                                {!isApproved && isEditing && (
                                    <>
                                        <button type='button' onClick={() => handleUpdateReview(review)} disabled={isSaving}>
                                            {isSaving ? 'Saving...' : 'Update'}
                                        </button>
                                        <button type='button' className='outline' onClick={cancelEdit} disabled={isSaving}>Cancel</button>
                                    </>
                                )}
                                {!isApproved && (
                                    <button
                                        type='button'
                                        className='danger'
                                        onClick={() => handleDeleteReview(review?._id)}
                                        disabled={isDeleting || isSaving}
                                    >
                                        {isDeleting ? 'Deleting...' : 'Delete'}
                                    </button>
                                )}
                                {isApproved && <small>Approved reviews cannot be edited or deleted.</small>}
                            </div>
                        </div>
                    )
                })}
            </div>

            {totalPages > 1 && (
                <div className='review_pagination user_review_pagination'>
                    <button
                        type='button'
                        className='page_btn'
                        disabled={page === 1}
                        onClick={() => page > 1 ? setPage(page - 1) : {}}
                    >
                        Prev
                    </button>
                    {pageItems.map((item) => (
                        <button
                            type='button'
                            key={`my-review-page-${item}`}
                            className={page === item ? 'page_btn active' : 'page_btn'}
                            onClick={() => setPage(item)}
                        >
                            {item}
                        </button>
                    ))}
                    <button
                        type='button'
                        className='page_btn'
                        disabled={page === totalPages}
                        onClick={() => page < totalPages ? setPage(page + 1) : {}}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}

export default UserReviews
