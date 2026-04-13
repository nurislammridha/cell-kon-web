import React, { useEffect, useState } from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetOrderById } from '../_redux/CommonAction';
import moment from 'moment';
import MobileCommonHeader from '../components/MobileCommonHeader';
import Axios from 'axios';
import { showToast } from '../../utils/ToastHelper';
const OrderDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const orderDetailsLoading = useSelector((state) => state.homeInfo.orderDetailsLoading);
    const orderDetails = useSelector((state) => state.homeInfo.orderDetails);
    const { _id, deliveryAddressInfo, createdAt, confirmedAt, deliveredAt, pickedAt,
        processedAt, shippedAt, cancelAt, productInfo, isCancel, isConfirm, isCreated, isDelivered, isFullPaid, isPicked,
        isProcessing, isShipped, subTotal, shippingFee, orderId } = orderDetails || {}
    const { buyerName, buyerPhone, detailsAddress, district, division, upazilla, union } = deliveryAddressInfo || {}

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
    const [selectedOrderItem, setSelectedOrderItem] = useState(null)
    const [myReview, setMyReview] = useState(null)
    const [eligibility, setEligibility] = useState({ canCreate: false, message: '' })
    const [isReviewDataLoading, setIsReviewDataLoading] = useState(false)
    const [isReviewSubmitting, setIsReviewSubmitting] = useState(false)
    const [isReviewDeleting, setIsReviewDeleting] = useState(false)
    const [isEditingReview, setIsEditingReview] = useState(false)
    const [ratingInput, setRatingInput] = useState(0)
    const [reviewInput, setReviewInput] = useState('')

    const isLogin = localStorage.getItem('isLogin') === 'true'
    const reviewApiBase = `${process.env.REACT_APP_API_URL}review`

    const getSelectedProductId = () => String(selectedOrderItem?.products?._id || selectedOrderItem?.productId || '')

    const resetReviewModal = () => {
        setMyReview(null)
        setEligibility({ canCreate: false, message: '' })
        setIsReviewDataLoading(false)
        setIsReviewSubmitting(false)
        setIsReviewDeleting(false)
        setIsEditingReview(false)
        setRatingInput(0)
        setReviewInput('')
    }

    const closeReviewModal = () => {
        setIsReviewModalOpen(false)
        setSelectedOrderItem(null)
        resetReviewModal()
    }

    const loadReviewData = async (orderItem) => {
        const productId = String(orderItem?.products?._id || orderItem?.productId || '')

        if (!productId) {
            showToast('error', 'Product information is missing for review.')
            return
        }

        setIsReviewDataLoading(true)

        try {
            const [myReviewRes, eligibilityRes] = await Promise.all([
                Axios.get(`${reviewApiBase}/product/${productId}/mine`),
                Axios.get(`${reviewApiBase}/eligibility/${productId}`),
            ])

            const fetchedMyReview = myReviewRes?.data?.result || null
            const fetchedEligibility = eligibilityRes?.data?.result || { canCreate: false, message: '' }

            setMyReview(fetchedMyReview)
            setEligibility(fetchedEligibility)

            if (fetchedMyReview) {
                setRatingInput(Number(fetchedMyReview?.rating || 0))
                setReviewInput(String(fetchedMyReview?.review || ''))
            } else {
                setRatingInput(0)
                setReviewInput('')
            }
        } catch (error) {
            const message = error?.response?.data?.message || 'Failed to load review information.'
            showToast('error', message)
            setMyReview(null)
            setEligibility({ canCreate: false, message })
        } finally {
            setIsReviewDataLoading(false)
        }
    }

    const openReviewModal = async (orderItem) => {
        if (!isLogin) {
            showToast('error', 'Please login to submit a review.')
            navigate('/login')
            return
        }

        setSelectedOrderItem(orderItem)
        setIsReviewModalOpen(true)
        await loadReviewData(orderItem)
    }

    const refreshOpenModalData = async () => {
        if (!selectedOrderItem) {
            return
        }

        await loadReviewData(selectedOrderItem)
    }

    const handleSubmitReview = async (event) => {
        event.preventDefault()

        const productId = getSelectedProductId()
        if (!productId) {
            return
        }

        if (!ratingInput && reviewInput.trim().length > 0) {
            showToast('error', 'Please provide a rating along with your review.')
            return
        }

        if (!ratingInput) {
            showToast('error', 'Please provide a rating.')
            return
        }

        setIsReviewSubmitting(true)

        try {
            const payload = {
                productId,
                rating: ratingInput,
                review: reviewInput.trim(),
            }

            const url = myReview && isEditingReview
                ? `${reviewApiBase}/${myReview?._id}`
                : `${reviewApiBase}`

            const req = myReview && isEditingReview
                ? Axios.put(url, payload)
                : Axios.post(url, payload)

            const res = await req

            if (res?.data?.status) {
                showToast('success', res?.data?.message || 'Review submitted successfully.')
                setIsEditingReview(false)
                await refreshOpenModalData()
            }
        } catch (error) {
            const message = error?.response?.data?.message || 'Failed to submit review.'
            showToast('error', message)
        } finally {
            setIsReviewSubmitting(false)
        }
    }

    const handleDeleteReview = async () => {
        if (!myReview?._id || myReview?.status === 'approved') {
            return
        }

        const isConfirmed = window.confirm('Are you sure you want to delete your review?')
        if (!isConfirmed) {
            return
        }

        setIsReviewDeleting(true)

        try {
            const res = await Axios.delete(`${reviewApiBase}/${myReview._id}`)

            if (res?.data?.status) {
                showToast('success', res?.data?.message || 'Review deleted successfully.')
                setIsEditingReview(false)
                setRatingInput(0)
                setReviewInput('')
                await refreshOpenModalData()
            }
        } catch (error) {
            const message = error?.response?.data?.message || 'Failed to delete review.'
            showToast('error', message)
        } finally {
            setIsReviewDeleting(false)
        }
    }

    const canEditOrDelete = Boolean(myReview && myReview?.status !== 'approved')
    const shouldDisableForm = isReviewDataLoading
        || isReviewSubmitting
        || isReviewDeleting
        || (myReview?.status === 'approved')
        || (myReview && !isEditingReview)
        || (!myReview && eligibility?.canCreate === false)
    useEffect(() => {
        dispatch(GetOrderById(id))
    }, [id])
    // console.log('orderDetails', orderDetails)
    return (<div className='morder'>
        {/* <div className='muser_inf0'>
            <MobileCommonHeader />
        </div> */}
        <div className='cart_page checkout_page order_details'>
            <div>
                <div className='checkout_address_section '>
                    <div className='order_id'>
                        <div className='title'>
                            <div>Order ID: <span>{orderId}</span></div>
                            <a className='item'>Copy</a>
                        </div>
                        <div className='item'>{moment(createdAt).format('lll')}</div>
                    </div>
                    <div className='checkout_title'>
                        <span>{buyerName}</span>
                    </div>
                    <div className='item checkout_phone'>{buyerPhone}</div>
                    <div className='item checkout_address'>
                        <div>{detailsAddress}</div>
                        <div>{division}-{district}-{upazilla}-{union}</div>
                    </div>
                </div>
                <div className='status'>
                    <div className='order_timeline'>Order Timeline</div>
                    <div className='status_grow'>
                        <div className='left'>
                            <div className={'active circle created_bg'}><i class="fa fa-check" aria-hidden="true"></i></div>
                            {/* <div className='line '></div> */}
                            <div className={isConfirm ? 'active circle confirm_bg' : 'circle confirm_bg'}><i class="fa fa-check" aria-hidden="true"></i></div>
                            {/* <div className='line'></div> */}
                            <div className={isProcessing ? 'active circle processing_bg' : 'circle processing_bg'}><i class="fa fa-check" aria-hidden="true"></i></div>
                            {/* <div className='line'></div> */}
                            <div className={isPicked ? 'active circle picked_bg' : 'circle picked_bg'}><i class="fa fa-check" aria-hidden="true"></i></div>
                            {/* <div className='line'></div> */}
                            <div className={isShipped ? 'active circle shipped_bg' : 'circle shipped_bg'}><i class="fa fa-check" aria-hidden="true"></i></div>
                            <div className='line'></div>
                            <div className={isDelivered ? 'active circle delivered_bg' : 'circle delivered_bg'}><i class="fa fa-check" aria-hidden="true"></i></div>
                            {isCancel ? <div className={isCancel ? 'active circle cancelled_bg' : 'circle cancelled_bg'}><i class="fa fa-check" aria-hidden="true"></i></div> : ""}
                            {/* <div className='line'></div> */}
                        </div>
                        <div className='right'>
                            <div className='status_item'>
                                <p>Created</p>
                                <span className='item'>{createdAt && moment(createdAt).format('lll')}</span>
                            </div>
                            <div className='status_item'>
                                <p>Confirm</p>
                                <span className='item'>{confirmedAt && moment(confirmedAt).format('lll')}</span>
                            </div>
                            <div className='status_item'>
                                <p>Processing</p>
                                <span className='item'>{processedAt && moment(processedAt).format('lll')}</span>
                            </div>
                            <div className='status_item'>
                                <p>Pickup</p>
                                <span className='item'>{pickedAt && moment(pickedAt).format('lll')}</span>
                            </div>
                            <div className='status_item'>
                                <p>Shipped</p>
                                <span className='item'>{shippedAt && moment(shippedAt).format('lll')}</span>
                            </div>
                            <div className='status_item'>
                                <p>Delivered</p>
                                <span className='item'>{deliveredAt && moment(deliveredAt).format('lll')}</span>
                            </div>
                            {isCancel && <div className='status_item'>
                                <p>Canceled</p>
                                <span className='item'>{cancelAt && moment(cancelAt).format('lll')}</span>
                            </div>}
                        </div>
                    </div>
                </div>


                <div className='cart_products mt16'>
                    <div className='cart_top'>
                        <span>{productInfo?.length} Products</span>
                        <span>Variation</span>
                    </div>
                    <div className='cart_bottom'>
                        {productInfo?.length > 0 && productInfo.map((item, index) => (
                            <div key={index} className='cart_item'>
                                <div className='cart_img'>
                                    <img src={item?.products?.productIcon?.url} alt='product' />
                                </div>
                                <div className='cart_right'>
                                    <div className='cart_title'>
                                        {item?.products?.productName}
                                    </div>
                                    <div className='cart_taka_3 taka_q'>
                                        <span>&#2547;{item.sellPrice}X{item.quantity}</span>
                                        <span>Color: {item.colorName}</span>
                                    </div>
                                    <div className='cart_taka_3 taka_r'>
                                        <span>&#2547;{item.sellPrice}X{item.quantity}</span>
                                        <span>Size: {item.sizeName}</span>
                                    </div>
                                    <div className='order_review_button_wrap'>
                                        <button
                                            type='button'
                                            className='order_review_button'
                                            onClick={() => openReviewModal(item)}
                                        >
                                            Reviews
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Checkout order summery */}
            <div>
                <div className='cart_summery'>
                    <div className='order_summery'>
                        Order Summary
                    </div>
                    <div className='cart_subtotal'>
                        <span>Total Amount</span>
                        <span className='clrF54C54'>&#2547;{subTotal + shippingFee}</span>
                    </div>
                    <div className='cart_subtotal'>
                        <span>Paid Amount</span>
                        <span className='clr3598DA'>&#2547;{subTotal + shippingFee}</span>
                    </div>
                    <div className='cart_subtotal'>
                        <span>Due Amount</span>
                        <span className='clrE9BA00'>&#2547;0</span>
                    </div>

                    <div className='order_policy'>
                        *Order Delivery Policy for this order can be found <a href>here</a>
                    </div>

                </div>
                <div className='cart_summery mt16'>
                    <div className='order_summery'>
                        <span>Order Summary</span>
                        <a>Paid</a>
                    </div>
                    <div className='cart_subtotal '>
                        <span>COD</span>
                    </div>

                </div>
            </div>
        </div>

        {isReviewModalOpen && <div className='review_modal_overlay' onClick={closeReviewModal}>
            <div className='review_modal' onClick={(event) => event.stopPropagation()}>
                <div className='review_modal_header'>
                    <h3>Rate & Review</h3>
                    <button type='button' onClick={closeReviewModal}><i className='fa fa-times'></i></button>
                </div>

                <div className='review_modal_product'>
                    <strong>{selectedOrderItem?.products?.productName || 'Product'}</strong>
                </div>

                {myReview && <div className='review_modal_status'>
                    Status: <span className={`status_${myReview?.status}`}>{String(myReview?.status || 'disapproved')}</span>
                </div>}

                {!myReview && eligibility?.canCreate === false && <div className='review_modal_message warning'>
                    {eligibility?.message || 'You are not eligible to review this product yet.'}
                </div>}

                {myReview && myReview?.status === 'approved' && <div className='review_modal_message warning'>
                    This review is approved and cannot be edited or deleted.
                </div>}

                {myReview && myReview?.status !== 'approved' && !isEditingReview && <div className='review_modal_message'>
                    You have already reviewed this product. Use Edit to update your review.
                </div>}

                <form onSubmit={handleSubmitReview}>
                    <div className='review_modal_stars'>
                        {Array.from({ length: 5 }, (_, index) => {
                            const star = index + 1
                            const active = star <= Number(ratingInput || 0)
                            return (
                                <button
                                    key={`modal-rate-${star}`}
                                    type='button'
                                    className={active ? 'star_btn active' : 'star_btn'}
                                    onClick={() => setRatingInput(star)}
                                    disabled={shouldDisableForm}
                                >
                                    <i className='fa fa-star'></i>
                                </button>
                            )
                        })}
                    </div>

                    <textarea
                        rows='4'
                        placeholder='Share your review (optional)'
                        value={reviewInput}
                        onChange={(event) => setReviewInput(event.target.value)}
                        disabled={shouldDisableForm}
                    ></textarea>

                    <div className='review_modal_actions'>
                        <button type='submit' disabled={shouldDisableForm}>
                            {isReviewSubmitting ? 'Saving...' : myReview && isEditingReview ? 'Update Review' : 'Submit Review'}
                        </button>

                        {myReview && myReview?.status !== 'approved' && !isEditingReview && (
                            <button
                                type='button'
                                className='outline'
                                onClick={() => setIsEditingReview(true)}
                            >
                                Edit
                            </button>
                        )}

                        {myReview && isEditingReview && (
                            <button
                                type='button'
                                className='outline'
                                onClick={() => {
                                    setIsEditingReview(false)
                                    setRatingInput(Number(myReview?.rating || 0))
                                    setReviewInput(String(myReview?.review || ''))
                                }}
                            >
                                Cancel
                            </button>
                        )}

                        {canEditOrDelete && (
                            <button type='button' className='danger' onClick={handleDeleteReview} disabled={isReviewDeleting}>
                                {isReviewDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>}

    </div>)
}

export default OrderDetailsPage