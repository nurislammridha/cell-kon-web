import React, { useCallback, useEffect, useState } from 'react'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserMenu from '../components/UserMenu'
import { GetBuyerDetailsByBuyerId } from '../_redux/CommonAction'
import { showToast } from '../../utils/ToastHelper'

const getBuyerData = () => {
    try {
        return JSON.parse(localStorage.getItem('buyerData')) || {}
    } catch (error) {
        return {}
    }
}

const toNumber = (value, fallback = 0) => {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : fallback
}

const WishlistPage = ({ isLogin }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const buyerDetails = useSelector((state) => state.homeInfo.buyerDetails)

    const [wishlistProducts, setWishlistProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [removingProductId, setRemovingProductId] = useState('')

    const fetchWishlist = useCallback(async () => {
        const buyerData = getBuyerData()
        const buyerId = String(buyerData?._id || '').trim()
        if (!buyerId) {
            setWishlistProducts([])
            return
        }

        setIsLoading(true)
        try {
            const res = await Axios.get(`${process.env.REACT_APP_API_URL}love/buyer/${buyerId}`)
            const rawProductInfo = Array.isArray(res?.data?.result?.productInfo) ? res.data.result.productInfo : []
            const products = rawProductInfo
                .map((item) => item?.productId)
                .filter(Boolean)

            setWishlistProducts(products)
        } catch (error) {
            showToast('error', 'Failed to load wishlist')
            setWishlistProducts([])
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!isLogin) {
            navigate('/')
            return
        }

        dispatch(GetBuyerDetailsByBuyerId())
        fetchWishlist()
    }, [dispatch, fetchWishlist, isLogin, navigate])

    const handleRemoveWishlist = async (product) => {
        const buyerData = getBuyerData()
        const buyerId = String(buyerData?._id || '').trim()
        const buyerName = String(buyerData?.buyerName || buyerDetails?.buyerName || '').trim()
        const productId = String(product?._id || '').trim()

        if (!buyerId || !productId || removingProductId) {
            return
        }

        setRemovingProductId(productId)
        try {
            const res = await Axios.post(`${process.env.REACT_APP_API_URL}love/toggle`, {
                buyerId,
                buyerName,
                productId,
            })

            if (res?.data?.status) {
                setWishlistProducts((prev) => prev.filter((item) => String(item?._id) !== productId))
                showToast('success', 'Product removed from wishlist')
            }
        } catch (error) {
            showToast('error', 'Failed to update wishlist')
        } finally {
            setRemovingProductId('')
        }
    }

    return (
        <div className='user_info'>
            <UserMenu buyerDetails={buyerDetails} activeTab='wishlist' />

            <div className='right'>
                <div className='wishlist_page'>
                    <div className='wishlist_header'>
                        <h2>Wishlist</h2>
                        <p>{wishlistProducts.length} item(s)</p>
                    </div>

                    {isLoading && <div className='wishlist_empty'>Loading wishlist...</div>}

                    {!isLoading && wishlistProducts.length === 0 && (
                        <div className='wishlist_empty'>No products in your wishlist yet.</div>
                    )}

                    {!isLoading && wishlistProducts.length > 0 && (
                        <div className='wishlist_grid'>
                            {wishlistProducts.map((product, index) => {
                                const productId = String(product?._id || `wishlist-${index}`)
                                const productName = String(product?.product_name || product?.productName || 'Product')
                                const productImage = product?.thumbnail || product?.productIcon?.url || product?.productImgColor?.[0]?.color_images?.[0] || ''
                                const rp = toNumber(product?.mrp, toNumber(product?.rp, 0))
                                const sale = toNumber(product?.isCampaign ? product?.campaignDiscount : product?.regularDiscount, rp)

                                return (
                                    <div className='wishlist_item' key={productId}>
                                        <div className='wishlist_item_img cp' onClick={() => navigate(`/product-details/${product?._id}`)}>
                                            {productImage ? <img src={productImage} alt={productName} /> : <div className='wishlist_img_placeholder'>No Image</div>}
                                        </div>

                                        <div className='wishlist_item_body'>
                                            <h4 className='cp' onClick={() => navigate(`/product-details/${product?._id}`)}>{productName}</h4>
                                            <div className='wishlist_prices'>
                                                <span className='sale'>&#2547;{sale}</span>
                                                {rp > sale && <span className='rp'>&#2547;{rp}</span>}
                                            </div>
                                            <div className='wishlist_actions'>
                                                <button type='button' className='outline' onClick={() => navigate(`/product-details/${product?._id}`)}>
                                                    View
                                                </button>
                                                <button
                                                    type='button'
                                                    className='danger'
                                                    disabled={removingProductId === String(product?._id)}
                                                    onClick={() => handleRemoveWishlist(product)}
                                                >
                                                    {removingProductId === String(product?._id) ? 'Removing...' : 'Remove'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default WishlistPage
