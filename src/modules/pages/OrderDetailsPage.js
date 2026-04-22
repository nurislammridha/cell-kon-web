import React, { useEffect, useState } from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetOrderById } from '../_redux/CommonAction';
import moment from 'moment';
import MobileCommonHeader from '../components/MobileCommonHeader';
import Axios from 'axios';
import { showToast } from '../../utils/ToastHelper';

const MAX_REVIEW_IMAGES = 4;
const MAX_REVIEW_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/nurislammridha/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'nurislam';

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
        .slice(0, MAX_REVIEW_IMAGES);
};

const toReviewImageSlots = (value) => {
    const normalized = normalizeReviewImages(value);
    return Array.from({ length: MAX_REVIEW_IMAGES }, (_, index) => normalized[index] || '');
};

const fromReviewImageSlots = (slots) => {
    if (!Array.isArray(slots)) {
        return [];
    }

    return slots
        .map((item) => String(item || '').trim())
        .filter(Boolean)
        .slice(0, MAX_REVIEW_IMAGES);
};

const isSupportedReviewImage = (file) => {
    const type = String(file?.type || '').toLowerCase();
    return ['image/jpeg', 'image/jpg', 'image/png'].includes(type);
};

const uploadReviewImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const res = await Axios.post(CLOUDINARY_UPLOAD_URL, data);
    return String(res?.data?.secure_url || res?.data?.url || '').trim();
};

const OrderDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const orderDetailsLoading = useSelector((state) => state.homeInfo.orderDetailsLoading);
    const orderDetails = useSelector((state) => state.homeInfo.orderDetails);
    const { _id, deliveryAddressInfo, createdAt, confirmedAt, deliveredAt, pickedAt,
        processedAt, shippedAt, cancelAt, productInfo, isCancel, isConfirm, isCreated, isDelivered, isFullPaid, isPicked,
        isProcessing, isShipped, subTotal, shippingFee, orderId, orderStatus } = orderDetails || {}
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
    const [reviewImages, setReviewImages] = useState(() => toReviewImageSlots([]))
    const [reviewImageUploadingIndex, setReviewImageUploadingIndex] = useState(-1)

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
        setReviewImages(toReviewImageSlots([]))
        setReviewImageUploadingIndex(-1)
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
                setReviewImages(toReviewImageSlots(fetchedMyReview?.reviewImages))
            } else {
                setRatingInput(0)
                setReviewInput('')
                setReviewImages(toReviewImageSlots([]))
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

        const delivered = Boolean(isDelivered) || String(orderStatus || '').toLowerCase() === 'delivered'
        if (!delivered) {
            showToast('error', 'Review is available after delivery.')
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
                reviewImages: fromReviewImageSlots(reviewImages),
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
                setReviewImages(toReviewImageSlots([]))
                await refreshOpenModalData()
            }
        } catch (error) {
            const message = error?.response?.data?.message || 'Failed to delete review.'
            showToast('error', message)
        } finally {
            setIsReviewDeleting(false)
        }
    }

    const handleReviewImageSlotUpload = async (event, slotIndex) => {
        const file = event.target.files?.[0]
        event.target.value = ''

        if (!file) {
            return
        }

        if (!isSupportedReviewImage(file)) {
            showToast('error', 'Only png, .jpg, .jpeg images are allowed.')
            return
        }

        if (Number(file?.size || 0) > MAX_REVIEW_IMAGE_SIZE_BYTES) {
            showToast('error', 'Image size must be 2MB or less.')
            return
        }

        setReviewImageUploadingIndex(slotIndex)

        try {
            const uploaded = await uploadReviewImageToCloudinary(file)
            if (!uploaded) {
                throw new Error('Image upload failed')
            }

            setReviewImages((prev) => {
                const next = Array.isArray(prev) ? [...prev] : toReviewImageSlots([])
                next[slotIndex] = uploaded
                return next.slice(0, MAX_REVIEW_IMAGES)
            })
        } catch (error) {
            showToast('error', `Image ${slotIndex + 1} upload failed. Please try again.`)
        } finally {
            setReviewImageUploadingIndex(-1)
        }
    }

    const handleClearReviewImageSlot = (slotIndex) => {
        setReviewImages((prev) => {
            const next = Array.isArray(prev) ? [...prev] : toReviewImageSlots([])
            next[slotIndex] = ''
            return next.slice(0, MAX_REVIEW_IMAGES)
        })
    }

    const isOrderDelivered = Boolean(isDelivered) || String(orderStatus || '').toLowerCase() === 'delivered'
    const canEditOrDelete = Boolean(myReview && myReview?.status !== 'approved')
    const shouldDisableForm = isReviewDataLoading
        || isReviewSubmitting
        || isReviewDeleting
        || reviewImageUploadingIndex !== -1
        || (myReview?.status === 'approved')
        || (myReview && !isEditingReview)
        || (!myReview && !isOrderDelivered)
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
                                    {isOrderDelivered && <div className='order_review_button_wrap'>
                                        <button
                                            type='button'
                                            className='order_review_button'
                                            onClick={() => openReviewModal(item)}
                                        >
                                            Reviews
                                        </button>
                                    </div>}

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

                    <div className='review_modal_image_tools'>
                        <div className='review_modal_image_hint'>Upload up to {MAX_REVIEW_IMAGES} images (png, .jpg, .jpeg support, max 2MB each)</div>
                    </div>

                    <div className='review_modal_images_grid'>
                        {Array.from({ length: MAX_REVIEW_IMAGES }, (_, index) => {
                            const image = String(reviewImages?.[index] || '').trim()
                            const isSlotUploading = reviewImageUploadingIndex === index

                            return (
                                <div className='review_modal_image_item' key={`modal-review-image-slot-${index}`}>
                                    {image ? (
                                        <img src={image} alt={`Review upload ${index + 1}`} />
                                    ) : (
                                        <div className='review_modal_image_placeholder'>Image {index + 1}</div>
                                    )}

                                    <label className='review_modal_file_input review_modal_file_input_slot'>
                                        <input
                                            type='file'
                                            accept='image/png,image/jpg,image/jpeg'
                                            onChange={(event) => handleReviewImageSlotUpload(event, index)}
                                            disabled={shouldDisableForm || (reviewImageUploadingIndex !== -1 && !isSlotUploading)}
                                        />
                                        <span>{isSlotUploading ? 'Uploading...' : image ? 'Change' : 'Upload'}</span>
                                    </label>

                                    {image && !shouldDisableForm && (
                                        <button
                                            type='button'
                                            className='review_modal_image_remove'
                                            onClick={() => handleClearReviewImageSlot(index)}
                                            disabled={reviewImageUploadingIndex !== -1}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            )
                        })}
                    </div>

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
                                    setReviewImages(toReviewImageSlots(myReview?.reviewImages))
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