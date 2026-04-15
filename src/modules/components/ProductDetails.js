import React, { useEffect, useMemo, useState } from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AddToCart, FalseCartAdded } from '../_redux/CommonAction'
import Axios from 'axios'
import { showToast } from '../../utils/ToastHelper'
import cartIcon from '../../assets/images/icons/cartDetails.png'
import OwlCarousel from "react-owl-carousel";
import shareIcon from '../../assets/images/icons/share_icon.png'
import wishIcon from '../../assets/images/icons/wishg.png'
import wishedIcon from '../../assets/images/icons/wished.png'
import starFillIcon from '../../assets/images/icons/startFill.png'
import messengerIcon from '../../assets/images/icons/messenger.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'
import imoIcon from '../../assets/images/icons/imo.png'
import ProductDetailsSeller from './ProductDetailsSeller'

const THUMBNAILS_PER_PAGE = 4;
const MAX_SELECTABLE_QUANTITY = 5;
const ORDER_WHATSAPP_NUMBER = '01775299702';
const ORDER_IMO_NUMBER = '01775299702';
const ORDER_MESSENGER_THREAD_ID = '248809078314633';
const ORDER_MESSENGER_LINK = 'https://www.messenger.com/t/248809078314633';
const ORDER_MESSENGER_MOBILE_LINK = `https://m.me/${ORDER_MESSENGER_THREAD_ID}`;

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

const toBoolean = (value, fallback = false) => {
    if (typeof value === 'boolean') {
        return value;
    }
    if (typeof value === 'number') {
        return value === 1;
    }
    if (typeof value === 'string') {
        const normalized = value.trim().toLowerCase();
        if (['true', '1', 'yes', 'on'].includes(normalized)) {
            return true;
        }
        if (['false', '0', 'no', 'off'].includes(normalized)) {
            return false;
        }
    }
    return fallback;
};

const uniqueList = (list = []) => [...new Set(asArray(list).filter(Boolean))];

const isMobileDevice = () => /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent || '');

const copyTextToClipboard = async (text) => {
    if (!text) {
        return false;
    }

    if (navigator?.clipboard?.writeText) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            // Fall back to a manual copy approach below.
        }
    }

    try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'fixed';
        textArea.style.top = '-9999px';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        textArea.setSelectionRange(0, text.length);
        const isCopied = document.execCommand('copy');
        document.body.removeChild(textArea);
        return isCopied;
    } catch (error) {
        return false;
    }
};

const getColorKey = (colorVariant = {}, index = 0) => {
    const colorId = String(colorVariant?.color_id || colorVariant?.colorId || '').trim();
    const colorName = String(colorVariant?.color_name || colorVariant?.colorName || '').trim();

    if (colorId) {
        return `id-${colorId}`;
    }
    if (colorName) {
        return `name-${colorName.toLowerCase()}`;
    }

    return `index-${index}`;
};

const getSizeKey = (sizeVariant = {}, index = 0) => {
    const variantId = sizeVariant?.variant_id;
    if (variantId !== undefined && variantId !== null && String(variantId).trim() !== '') {
        return `variant-${variantId}`;
    }

    const sizeId = String(sizeVariant?.size_id || sizeVariant?.sizeId || '').trim();
    const sizeName = String(sizeVariant?.size_name || sizeVariant?.sizeName || sizeVariant?.label || '').trim();

    if (sizeId) {
        return `id-${sizeId}`;
    }
    if (sizeName) {
        return `name-${sizeName.toLowerCase()}`;
    }

    return `index-${index}`;
};

const getDefaultColorVariant = (colorVariants = []) => {
    if (!Array.isArray(colorVariants) || colorVariants.length === 0) {
        return null;
    }
    return colorVariants.find((item) => item?.is_default) || colorVariants[0];
};

const getDefaultSizeVariant = (sizeVariants = []) => {
    if (!Array.isArray(sizeVariants) || sizeVariants.length === 0) {
        return null;
    }
    return sizeVariants.find((item) => item?.is_default) || sizeVariants[0];
};

const hasVisibleSizeLabel = (sizeVariant = {}) =>
    String(sizeVariant?.size_name || sizeVariant?.sizeName || sizeVariant?.label || '').trim().length > 0;

const getPreferredSizeVariant = (sizeVariants = []) => {
    const normalizedSizes = asArray(sizeVariants);
    const visibleSizes = normalizedSizes.filter(hasVisibleSizeLabel);

    if (visibleSizes.length > 0) {
        return getDefaultSizeVariant(visibleSizes) || visibleSizes[0];
    }

    return getDefaultSizeVariant(normalizedSizes);
};

const getLegacyColorVariants = (data = {}) => {
    const fallbackPrice = Math.max(0, toNumber(data?.mrp, 0));
    const fallbackSalePrice = Math.max(0, toNumber(data?.regularDiscount, fallbackPrice));
    const fallbackDiscount = Math.max(0, fallbackPrice - fallbackSalePrice);
    const fallbackStock = Math.max(0, toNumber(data?.availableQuantity, 0));

    let fallbackSizes = asArray(data?.size).map((item, index) => ({
        variant_id: index + 1,
        size_id: String(item?.value || '').trim(),
        size_name: String(item?.label || '').trim(),
        price: fallbackPrice,
        discount: fallbackDiscount,
        stock: fallbackStock,
        is_default: index === 0,
        is_active: true,
    }));

    if (fallbackSizes.length === 0) {
        fallbackSizes = [{
            variant_id: 1,
            size_id: '',
            size_name: '',
            price: fallbackPrice,
            discount: fallbackDiscount,
            stock: fallbackStock,
            is_default: true,
            is_active: true,
        }];
    }

    const legacyColors = asArray(data?.productImgColor);
    if (legacyColors.length === 0) {
        return [{
            color_id: '',
            color_name: '',
            color_hex_code: '',
            color_images: uniqueList([data?.productIcon?.url, data?.thumbnail]),
            is_default: true,
            size_variants: fallbackSizes,
        }];
    }

    const groupedColor = legacyColors.reduce((accumulator, item, index) => {
        const colorId = String(item?.colorId || '').trim();
        const colorName = String(item?.colorName || '').trim();
        const key = colorId || colorName ? `${colorId}::${colorName}` : `index-${index}`;
        if (!accumulator[key]) {
            accumulator[key] = {
                color_id: colorId,
                color_name: colorName,
                color_hex_code: String(item?.colorHexCode || '').trim(),
                color_images: [],
                is_default: Object.keys(accumulator).length === 0,
                size_variants: fallbackSizes,
            };
        }

        const imageUrl = String(item?.url || '').trim();
        if (imageUrl) {
            accumulator[key].color_images.push(imageUrl);
        }

        return accumulator;
    }, {});

    return Object.values(groupedColor).map((item) => ({
        ...item,
        color_images: uniqueList(item.color_images),
    }));
};

const normalizeColorVariants = (data = {}) => {
    const colorVariants = asArray(data?.color_variants);
    if (colorVariants.length === 0) {
        return getLegacyColorVariants(data);
    }

    const fallbackSizes = getLegacyColorVariants(data)[0]?.size_variants || [];

    return colorVariants.map((colorVariant, colorIndex) => {
        const imageAssets = asArray(colorVariant?.color_image_assets)
            .map((item) => item?.url)
            .filter(Boolean);
        const normalizedImages = uniqueList([...asArray(colorVariant?.color_images), ...imageAssets]);

        const rawSizeVariants = asArray(colorVariant?.size_variants)
            .map((sizeVariant, sizeIndex) => ({
                ...sizeVariant,
                variant_id: sizeVariant?.variant_id !== undefined ? sizeVariant.variant_id : sizeIndex + 1,
                size_id: String(sizeVariant?.size_id || sizeVariant?.sizeId || '').trim(),
                size_name: String(sizeVariant?.size_name || sizeVariant?.sizeName || '').trim(),
                price: Math.max(0, toNumber(sizeVariant?.price, toNumber(data?.mrp, 0))),
                discount: Math.max(0, toNumber(sizeVariant?.discount, 0)),
                stock: Math.max(0, parseInt(sizeVariant?.stock, 10) || 0),
                is_default: toBoolean(sizeVariant?.is_default, false),
                is_active: toBoolean(sizeVariant?.is_active, true),
            }))
            .filter((sizeVariant) => sizeVariant.is_active !== false);

        const sizeVariants = rawSizeVariants.length > 0 ? rawSizeVariants : fallbackSizes;

        return {
            color_id: String(colorVariant?.color_id || colorVariant?.colorId || '').trim(),
            color_name: String(colorVariant?.color_name || colorVariant?.colorName || '').trim(),
            color_hex_code: String(colorVariant?.color_hex_code || colorVariant?.colorHexCode || '').trim(),
            color_images: normalizedImages,
            is_default: colorVariant?.is_default !== undefined ? toBoolean(colorVariant?.is_default, false) : colorIndex === 0,
            size_variants: sizeVariants,
        };
    });
};

const ProductDetails = ({ data, isLogin }) => {
    const location = useLocation()
    const { isFromCampaign, campaignId, campaignEndDate, campaignEndTime, campaignPrice } = location?.state || {}
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isCartAdded = useSelector((state) => state.homeInfo.isCartAdded);
    const isCartLoading = useSelector((state) => state.homeInfo.isCartLoading);
    const [buyerData, setBuyerData] = useState({})
    const [fullImg, setFullImg] = useState('')
    const [selectedColorKey, setSelectedColorKey] = useState('')
    const [selectedSizeKey, setSelectedSizeKey] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [page, setPage] = useState(1)
    const [isShareMenuOpen, setIsShareMenuOpen] = useState(false)
    const [isWished, setIsWished] = useState(false)
    const [isWishLoading, setIsWishLoading] = useState(false)
    const [isMobileOrderFabOpen, setIsMobileOrderFabOpen] = useState(true)
    const [isMainImageLoading, setIsMainImageLoading] = useState(true)

    const colorVariants = useMemo(() => normalizeColorVariants(data), [data]);

    const selectedColorVariant = useMemo(() => {
        if (colorVariants.length === 0) {
            return null;
        }

        const selected = colorVariants.find((item, index) => getColorKey(item, index) === selectedColorKey);
        return selected || getDefaultColorVariant(colorVariants);
    }, [colorVariants, selectedColorKey]);

    const colorImages = useMemo(() => {
        const selectedImages = uniqueList(selectedColorVariant?.color_images);
        if (selectedImages.length > 0) {
            return selectedImages;
        }

        return uniqueList([data?.productIcon?.url, data?.thumbnail]);
    }, [selectedColorVariant, data]);

    const sizeVariants = useMemo(() => asArray(selectedColorVariant?.size_variants), [selectedColorVariant]);
    const visibleSizeVariants = useMemo(() => sizeVariants.filter(hasVisibleSizeLabel), [sizeVariants]);

    const selectedSizeVariant = useMemo(() => {
        if (sizeVariants.length === 0) {
            return null;
        }

        const selected = sizeVariants.find((item, index) => getSizeKey(item, index) === selectedSizeKey);
        return selected || getPreferredSizeVariant(sizeVariants);
    }, [sizeVariants, selectedSizeKey]);

    const colorName = selectedColorVariant?.color_name || '';
    const colorHexCode = selectedColorVariant?.color_hex_code || '';
    const sizeName = selectedSizeVariant?.size_name || '';

    const variantPrice = Math.max(0, toNumber(selectedSizeVariant?.price, toNumber(data?.mrp, 0)));
    const variantDiscount = Math.max(
        0,
        toNumber(selectedSizeVariant?.discount, Math.max(0, variantPrice - toNumber(data?.regularDiscount, variantPrice)))
    );
    const discountedPrice = Math.max(0, variantPrice - variantDiscount);
    const salePrice = isFromCampaign ? Math.max(0, toNumber(campaignPrice, discountedPrice)) : discountedPrice;

    const availableQuantity = Math.max(0, parseInt(selectedSizeVariant?.stock ?? data?.availableQuantity, 10) || 0);
    const isInStock = availableQuantity > 0;
    const maxQuantity = isInStock ? Math.min(MAX_SELECTABLE_QUANTITY, availableQuantity) : 0;
    const discountPercent = variantPrice > 0 ? Math.max(0, Math.round(((variantPrice - salePrice) / variantPrice) * 100)) : 0;
    const hasDiscount = variantPrice > salePrice && discountPercent > 0;
    const selectedMainImage = fullImg || colorImages[0] || data?.productIcon?.url || '';

    const totalGalleryPages = Math.max(1, Math.ceil(colorImages.length / THUMBNAILS_PER_PAGE));
    const thumbnailStart = (page - 1) * THUMBNAILS_PER_PAGE;
    const visibleImages = colorImages.slice(thumbnailStart, thumbnailStart + THUMBNAILS_PER_PAGE);
    const brandName = (data?.brand?.name || data?.brandName || '').trim();
    const hasBrand = brandName.length > 0;
    const isFreeDelivery = toBoolean(data?.is_free_delivery !== undefined ? data?.is_free_delivery : data?.isFreeDelivery, false);
    const reviewCount = asArray(data?.commentsInfo).length;
    const averageRating = Math.max(0, toNumber(data?.sellerRatings, 0));

    const requireLoginForAction = () => {
        localStorage.setItem('redirect_details', data?._id || '')
        localStorage.setItem('redirect_url', "product_details")
        navigate('/login')
    }

    const getProductDetailsUrl = () => data?._id
        ? `${window.location.origin}${window.location.pathname}#/product-details/${data._id}`
        : window.location.href;

    const getOrderMessage = () => {
        const productTitle = (data?.product_name || data?.productName || 'Product').trim();
        const productDetailsUrl = getProductDetailsUrl();

        return `Hi, I want to order this product: ${productTitle} and here is the link of the product: ${productDetailsUrl}`;
    }

    const openOrderOnWhatsapp = () => {
        const normalizedNumber = ORDER_WHATSAPP_NUMBER.replace(/\D/g, '');
        const whatsappNumber = normalizedNumber.startsWith('0') ? `88${normalizedNumber}` : normalizedNumber;
        const orderMessage = encodeURIComponent(getOrderMessage());

        window.open(`https://wa.me/${whatsappNumber}?text=${orderMessage}`, '_blank', 'noopener,noreferrer');
    }

    const openOrderOnImo = async () => {
        const normalizedNumber = ORDER_IMO_NUMBER.replace(/\D/g, '');
        const imoNumber = normalizedNumber.startsWith('0') ? `+88${normalizedNumber}` : `+${normalizedNumber}`;
        const orderMessageRaw = getOrderMessage();
        const orderMessage = encodeURIComponent(orderMessageRaw);
        const copied = await copyTextToClipboard(orderMessageRaw);

        if (copied) {
            showToast('success', 'Order message copied. Paste it in imo.')
        } else if (isMobileDevice()) {
            showToast('success', 'imo opened. If the message is not filled, paste it manually.')
        }

        window.open(`https://imo.im/${imoNumber}?text=${orderMessage}`, '_blank', 'noopener,noreferrer');
    }

    const openOrderOnMessenger = async () => {
        const orderMessageRaw = getOrderMessage();
        const orderMessage = encodeURIComponent(orderMessageRaw);
        const separator = ORDER_MESSENGER_LINK.includes('?') ? '&' : '?';
        const copied = await copyTextToClipboard(orderMessageRaw);
        const mobileMessengerUrl = `${ORDER_MESSENGER_MOBILE_LINK}?ref=${orderMessage}`;

        if (isMobileDevice()) {
            if (copied) {
                showToast('success', 'Order message copied. Paste it in Messenger.')
            } else {
                showToast('success', 'Messenger opened. If the message is not filled, paste it manually.')
            }

            window.open(
                mobileMessengerUrl,
                '_blank',
                'noopener,noreferrer'
            );
            return;
        }

        if (copied) {
            showToast('success', 'Order message copied. Paste it in Messenger.')
        }

        window.open(
            `${ORDER_MESSENGER_LINK}${separator}text=${orderMessage}`,
            '_blank',
            'noopener,noreferrer'
        );
    }

    const openShareLink = (platform) => {
        const productDetailsUrl = getProductDetailsUrl();

        const productTitleRaw = (data?.product_name || data?.productName || 'Sellkon product').trim();
        const shareMessageRaw = `${productTitleRaw} ${productDetailsUrl}`;

        const productUrl = encodeURIComponent(productDetailsUrl);
        const shareMessage = encodeURIComponent(shareMessageRaw);

        if (platform === 'messenger') {
            const messengerAppId = process.env.REACT_APP_FACEBOOK_APP_ID || '291494419107518';
            const redirectUrl = encodeURIComponent(productDetailsUrl);

            window.open(
                `https://www.facebook.com/dialog/send?app_id=${messengerAppId}&link=${productUrl}&redirect_uri=${redirectUrl}`,
                '_blank',
                'noopener,noreferrer'
            );
            return;
        }

        if (platform === 'whatsapp') {
            window.open(
                `https://wa.me/?text=${shareMessage}`,
                '_blank',
                'noopener,noreferrer'
            );
            return;
        }

        if (platform === 'facebook') {
            window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${productUrl}&quote=${shareMessage}`,
                '_blank',
                'noopener,noreferrer'
            );
            return;
        }

        if (platform === 'linkedin') {
            window.open(
                `https://www.linkedin.com/feed/?shareActive=true&text=${shareMessage}`,
                '_blank',
                'noopener,noreferrer'
            );
            return;
        }

        if (platform === 'instagram') {
            if (navigator?.clipboard?.writeText) {
                navigator.clipboard.writeText(shareMessageRaw)
                    .then(() => showToast('success', 'Product details link copied. Paste it in Instagram.'))
                    .catch(() => null);
            }
            window.open(`https://www.instagram.com/`, '_blank', 'noopener,noreferrer');
        }
    }

    const fetchWishStatus = () => {
        const buyerInfo = JSON.parse(localStorage.getItem('buyerData') || '{}');
        const buyerId = buyerInfo?._id;

        if (!isLogin || !buyerId || !data?._id) {
            setIsWished(false)
            return;
        }

        Axios.get(`${process.env.REACT_APP_API_URL}love/status/${buyerId}/${data._id}`)
            .then((res) => {
                if (res?.data?.status) {
                    setIsWished(!!res?.data?.result?.isWished)
                }
            })
            .catch(() => {
                setIsWished(false)
            })
    }

    const handleWishToggle = () => {
        const buyerInfo = JSON.parse(localStorage.getItem('buyerData') || '{}');
        const buyerId = buyerInfo?._id;

        if (!isLogin || !buyerId) {
            requireLoginForAction()
            return;
        }

        if (!data?._id || isWishLoading) {
            return;
        }

        setIsWishLoading(true)

        Axios.post(`${process.env.REACT_APP_API_URL}love/toggle`, {
            buyerId,
            buyerName: buyerInfo?.buyerName || '',
            productId: data?._id,
        }).then((res) => {
            if (res?.data?.status) {
                setIsWished(!!res?.data?.result?.isWished)
            }
        }).catch(() => {
            showToast('error', 'Failed to update wishlist')
        }).finally(() => {
            setIsWishLoading(false)
        })
    }

    const handleAddCart = () => {
        if (!isInStock) {
            return;
        }

        let camData = {}
        isFromCampaign ? camData = { campaignId, campaignEndTime, campaignEndDate, campaignPrice } : camData = {}
        const postData = {
            ...camData,
            buyerId: buyerData?._id,
            productId: data?._id,
            quantity,
            colorName,
            colorHexCode,
            sizeName,
            fullImg: fullImg || colorImages[0] || data?.productIcon?.url || '',
        }
        isLogin ? dispatch(AddToCart(postData)) : requireLoginForAction()
    }

    const handleBuyNow = () => {
        if (!isInStock) {
            return;
        }

        const selectedImg = fullImg || colorImages[0] || data?.productIcon?.url || '';
        const postData = {
            buyerId: buyerData?._id,
            productId: data?._id,
            quantity,
            colorName,
            colorHexCode,
            sizeName,
            fullImg: selectedImg,
            productImgUrl: selectedImg,
        }
        const obj = { productDetails: { ...data, quantity } }
        const newData = { ...obj, ...postData }
        isLogin ? navigate('/checkout', { state: { selected: [newData], isFromDetails: true } }) : navigate('/phone', { state: { selected: [newData], isFromDetails: true } })
        !isLogin && localStorage.setItem('redirect_details', data._id)
        !isLogin && localStorage.setItem('redirect_url', "product_details")
    }

    const handleColor = (item, index) => {
        setSelectedColorKey(getColorKey(item, index))
        const nextColorImages = uniqueList(item?.color_images)
        setFullImg(nextColorImages[0] || data?.productIcon?.url || '')

        const nextSizes = asArray(item?.size_variants)
        const defaultSize = getPreferredSizeVariant(nextSizes)
        if (defaultSize) {
            const sizeIndex = nextSizes.findIndex((sizeItem) => sizeItem === defaultSize)
            setSelectedSizeKey(getSizeKey(defaultSize, sizeIndex >= 0 ? sizeIndex : 0))
        } else {
            setSelectedSizeKey('')
        }

        setPage(1)
        setQuantity(1)
    }

    const handleSizeChange = (item, index) => {
        setSelectedSizeKey(getSizeKey(item, index))
    }

    useEffect(() => {
        setBuyerData(JSON.parse(localStorage.getItem('buyerData')) || {})
        dispatch(FalseCartAdded())
    }, [dispatch, isLogin])

    useEffect(() => {
        if (colorVariants.length === 0) {
            setSelectedColorKey('')
            setSelectedSizeKey('')
            setFullImg(data?.productIcon?.url || '')
            setPage(1)
            setQuantity(1)
            return
        }

        const defaultColor = getDefaultColorVariant(colorVariants)
        const colorIndex = colorVariants.findIndex((item) => item === defaultColor)
        setSelectedColorKey(getColorKey(defaultColor, colorIndex >= 0 ? colorIndex : 0))

        const defaultSize = getPreferredSizeVariant(asArray(defaultColor?.size_variants))
        if (defaultSize) {
            const sizeIndex = asArray(defaultColor?.size_variants).findIndex((item) => item === defaultSize)
            setSelectedSizeKey(getSizeKey(defaultSize, sizeIndex >= 0 ? sizeIndex : 0))
        } else {
            setSelectedSizeKey('')
        }

        setFullImg(uniqueList(defaultColor?.color_images)[0] || data?.productIcon?.url || '')
        setPage(1)
        setQuantity(1)
    }, [colorVariants, data])

    useEffect(() => {
        if (colorImages.length === 0) {
            setPage(1)
            return
        }

        if (!fullImg || !colorImages.includes(fullImg)) {
            setFullImg(colorImages[0])
        }

        if (page > totalGalleryPages) {
            setPage(totalGalleryPages)
        }
    }, [colorImages, fullImg, page, totalGalleryPages])

    useEffect(() => {
        setIsMainImageLoading(Boolean(selectedMainImage))
    }, [selectedMainImage])

    useEffect(() => {
        fetchWishStatus()
    }, [isLogin, data?._id])

    useEffect(() => {
        if (!isInStock) {
            if (quantity !== 1) {
                setQuantity(1)
            }
            return
        }

        if (quantity > maxQuantity) {
            setQuantity(maxQuantity)
        }
    }, [isInStock, maxQuantity, quantity])

    return (<>
        <div className='details_hero'>
            <div className='hero_main'>
                <OwlCarousel
                    className="owl-theme"
                    loop
                    margin={10}
                    items={1}
                    autoplay={false}
                    nav
                    autoplayHoverPause={true}
                >
                    {
                        colorImages?.length > 0 && colorImages.map((item, index) => {
                            return (
                                <>

                                    <div className="item hero_carousel" key={`carousel-${index}`}>
                                        <img
                                            src={item || pro3}
                                            className="img-fluid"
                                            alt=""
                                            onClick={() => {
                                                setFullImg(item)
                                            }}
                                        />
                                    </div>

                                </>

                            )
                        })
                    }

                </OwlCarousel>
            </div>
        </div>
        <div className='rel_top'>
            <div className='main details_top_left'>
                <div className='left'>
                    <div className='image'>
                        {isMainImageLoading && <div className='main_image_loader' aria-hidden='true'></div>}
                        {selectedMainImage && <img
                            src={selectedMainImage}
                            alt='product img'
                            className={isMainImageLoading ? 'main_image_loading' : ''}
                            onLoad={() => setIsMainImageLoading(false)}
                            onError={() => setIsMainImageLoading(false)}
                        />}
                    </div>
                    <div className='parent_img'>
                        <div className='img'>
                            <div className='images'>
                                {visibleImages?.length > 0 && visibleImages.map((item, index) => (
                                    <img
                                        key={index}
                                        src={item || pro3}
                                        className={fullImg === item ? 'cp active_border' : 'cp c_border'}
                                        alt='product'
                                        onClick={() => {
                                            setFullImg(item)
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        {colorImages?.length > THUMBNAILS_PER_PAGE && (<div className='arrow'>
                            <div
                                className={page === 1 ? 'left_arrow vih' : "left_arrow"}
                                onClick={() => page > 1 ? setPage(page - 1) : {}}
                            ><i className='fas fa-chevron-left'></i></div>
                            <div
                                className={page < totalGalleryPages ? "right_arrow" : "right_arrow vih"}
                                onClick={() => page < totalGalleryPages ? setPage(page + 1) : {}}
                            >
                                <i className='fas fa-chevron-right'></i>
                            </div>
                        </div>)}
                    </div>
                </div>

                <div className='right'>
                    <div className='title_section'>
                        <div className='txt'>{data?.product_name || data?.productName}</div>

                    </div>
                    <div className='product_meta_row'>
                        <div className='rating_review_meta'>
                            <img src={starFillIcon} alt='rating' />
                            <span>Ratings {averageRating.toFixed(1)}/5.0 ({reviewCount} reviews)</span>
                        </div>
                        <div className='share_wish_wrap'>
                            <div
                                className='share_dropdown_wrap'
                                onMouseEnter={() => setIsShareMenuOpen(true)}
                                onMouseLeave={() => setIsShareMenuOpen(false)}
                            >
                                <button
                                    type='button'
                                    className='action_icon_btn'
                                    onClick={() => setIsShareMenuOpen((prev) => !prev)}
                                >
                                    <img src={shareIcon} alt='share' />
                                </button>
                                {isShareMenuOpen && <div className='share_hover_modal'>
                                    <div className='share_modal_title'>Share Via:</div>
                                    <div className='share_modal_actions'>
                                        <button type='button' className='social_action messenger' onClick={() => openShareLink('messenger')}>
                                            <img src={messengerIcon} alt='messenger' />
                                        </button>
                                        <button type='button' className='social_action whatsapp' onClick={() => openShareLink('whatsapp')}>
                                            <img src={whatsappIcon} alt='whatsapp' />
                                        </button>
                                        <button type='button' className='social_action facebook' onClick={() => openShareLink('facebook')}>
                                            <i className='fa fa-facebook'></i>
                                        </button>
                                        <button type='button' className='social_action linkedin' onClick={() => openShareLink('linkedin')}>
                                            <i className='fa fa-linkedin'></i>
                                        </button>
                                        <button type='button' className='social_action instagram' onClick={() => openShareLink('instagram')}>
                                            <i className='fa fa-instagram'></i>
                                        </button>
                                    </div>
                                </div>}
                            </div>
                            <button
                                type='button'
                                className='action_icon_btn wish_btn'
                                onClick={handleWishToggle}
                                disabled={isWishLoading}
                            >
                                <img src={isWished ? wishedIcon : wishIcon} alt='wishlist' />
                            </button>
                        </div>
                    </div>

                    {(hasBrand || isFreeDelivery) && <div className={`brand_top ${!hasBrand && isFreeDelivery ? 'brand_top_free_only' : ''}`}>
                        <div className='brand'>
                            {hasBrand && <>
                                <span>Brand: {brandName}</span>
                                <a
                                    href='#!'
                                    className='more_brand_products'
                                    onClick={(event) => {
                                        event.preventDefault();
                                        navigate('/all-products')
                                    }}
                                >
                                    More Products from {brandName}
                                </a>
                            </>}
                            {!hasBrand && isFreeDelivery && <span className='free_delivery_text'>Free delivery</span>}
                        </div>
                        {hasBrand && isFreeDelivery && <div className='free_delivery_text'>Free delivery</div>}
                    </div>}
                    {/* <div className='sold_by'>
                        <span>Sold By: {data?.sellerInfo?.shopName}</span>
                        <a href
                            onClick={() => navigate(`/shop/${data?.sellerId}`)}>
                            Visit Store
                        </a>
                    </div> */}
                    <div className='price_hide_pn'>
                        <div className='price_inline_row'>
                            <div className='product_price'>&#2547;{salePrice}</div>
                            {hasDiscount && <div className='del_price'>&#2547;{variantPrice}</div>}
                            {hasDiscount && <div className='discount_percent'>{discountPercent}%</div>}
                        </div>
                        <div className={isInStock ? 'stock_status in_stock' : 'stock_status out_stock'}>
                            {isInStock ? `In Stock (${availableQuantity})` : 'STOCK OUT'}
                        </div>
                    </div>
                    {/* for mobile sections */}
                    <div className='mobile_price'>
                        <div>
                            <div className='price_inline_row'>
                                <div className='product_price'>&#2547;{salePrice}</div>
                                {hasDiscount && <div className='del_price'>&#2547;{variantPrice}</div>}
                                {hasDiscount && <div className='discount_percent'>{discountPercent}%</div>}
                            </div>
                            <div className={isInStock ? 'stock_status in_stock' : 'stock_status out_stock'}>
                                {isInStock ? `In Stock (${availableQuantity})` : 'STOCK OUT'}
                            </div>

                        </div>
                        <div className='quantity_button'>
                            {!isInStock && <p>STOCK OUT</p>}
                            {isInStock && <> <div
                                className='btn minus'
                                onClick={() => quantity > 1 ? setQuantity(quantity - 1) : {}}

                            >
                                <i className="fa fa-minus"></i>
                            </div>
                                <div className='btn number'>{quantity}</div>
                                <div
                                    className='btn plus'
                                    onClick={() => quantity < maxQuantity ? setQuantity(quantity + 1) : {}}
                                >
                                    <i className="fa fa-plus"></i>
                                </div></>}
                        </div>
                    </div>

                    <div className='flex mobile_color'>
                        <div>
                            <div className='txt_cq'>Color</div>
                            <div className='mobile_colors'>
                                <div className='colors'>
                                    {colorVariants?.length > 0 && colorVariants?.map((item, index) => (
                                        <a
                                            key={getColorKey(item, index)}
                                            href='#!'
                                            className={selectedColorKey === getColorKey(item, index) ? 'active_border' : 'c_border'}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                handleColor(item, index);
                                            }}
                                        >
                                            {item?.color_name || `Color ${index + 1}`}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {visibleSizeVariants?.length > 0 && <div className='ml30'>
                            <div className='txt_cq'>Size</div>
                            <div className='colors'>
                                {visibleSizeVariants?.map((item, index) => (
                                    <a
                                        key={getSizeKey(item, index)}
                                        href='#!'
                                        className={selectedSizeKey === getSizeKey(item, index) ? 'active_border' : 'c_border'}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            handleSizeChange(item, index);
                                        }}
                                    >
                                        {item?.size_name || item?.label || `Size ${index + 1}`}
                                    </a>
                                ))}
                            </div>
                        </div>}
                    </div>
                    <div className='m_quantity'>
                        <div className='txt_cq'>Quantity</div>
                        {isInStock && <div className='quantity_button'>
                            <div
                                className='btn minus'
                                onClick={() => quantity > 1 ? setQuantity(quantity - 1) : {}}

                            >
                                <i className="fa fa-minus"></i>
                            </div>

                            <div className='btn number'>{quantity}</div>
                            <div
                                className='btn plus'
                                onClick={() => quantity < maxQuantity ? setQuantity(quantity + 1) : {}}
                            >
                                <i className="fa fa-plus"></i>
                            </div>
                        </div>}
                        {!isInStock && <div className='quantity_button'>
                            <p>STOCK OUT</p>
                        </div>}
                    </div>
                    {isInStock && <div className='btn_buy'>
                        <a
                            href='#!'
                            className='btn cart cp'
                            onClick={(event) => {
                                event.preventDefault();
                                if (!isCartAdded && !isCartLoading) {
                                    handleAddCart();
                                }
                            }}
                        >
                            {isCartAdded ? "Already Added" : isCartLoading ? "Adding to Cart" : "Add to Cart"}

                        </a>
                        <a href='#!'
                            className='btn buy cp'
                            onClick={(event) => {
                                event.preventDefault();
                                handleBuyNow();
                            }}
                        >
                            Buy Now
                        </a>
                    </div>}
                    {isInStock && <div className='btn_order_social'>
                        <a
                            href='#!'
                            className='btn order_whatsapp cp'
                            onClick={(event) => {
                                event.preventDefault();
                                openOrderOnWhatsapp();
                            }}
                        >
                            <img src={whatsappIcon} alt='whatsapp' />
                            <span>Order on WhatsApp</span>
                        </a>
                        <a
                            href='#!'
                            className='btn order_messenger cp'
                            onClick={(event) => {
                                event.preventDefault();
                                openOrderOnMessenger();
                            }}
                        >
                            <img src={messengerIcon} alt='messenger' />
                            <span>Order on Messenger</span>
                        </a>
                    </div>}
                    {!isInStock && <div className='btn_stock_out'>
                        <a href='#!'
                            className='btn cp'
                            onClick={(event) => event.preventDefault()}
                        >
                            Add to wishlist
                        </a>
                    </div>}
                    {isInStock && <div className='mobile_buy'>
                        <a
                            href='#!'
                            className='btn cart cp'
                            style={!isCartAdded && !isCartLoading ? { opacity: "1" } : { opacity: "1" }}
                            onClick={(event) => {
                                event.preventDefault();
                                !isCartAdded && !isCartLoading ? handleAddCart() : navigate('/cart');
                            }}
                        >
                            {isCartAdded ? <small>Added</small> : isCartLoading ? <i className="fa fa-refresh fa-spin"></i> : <img src={cartIcon} alt='cart' />}
                        </a>
                        <a href='#!'
                            className='btn buy cp'
                            onClick={(event) => {
                                event.preventDefault();
                                handleBuyNow();
                            }}
                        >
                            Buy Now
                        </a>

                    </div>}
                    {!isInStock && <div className='mobile_buy_checkout'>
                        <a href='#!'
                            className='btn cart cp'
                            onClick={(event) => event.preventDefault()}
                        >
                            Add to wishlist
                        </a>
                    </div>}
                    {isInStock && <div className='mobile_order_fab'>
                        <div className={`mobile_order_fab_actions ${isMobileOrderFabOpen ? 'open' : ''}`}>
                            <button
                                type='button'
                                className='mobile_fab_action messenger'
                                onClick={openOrderOnMessenger}
                            >
                                <img src={messengerIcon} alt='messenger' />
                            </button>
                            <button
                                type='button'
                                className='mobile_fab_action imo'
                                onClick={openOrderOnImo}
                            >
                                <img src={imoIcon} alt='imo' />
                            </button>
                            <button
                                type='button'
                                className='mobile_fab_action whatsapp'
                                onClick={openOrderOnWhatsapp}
                            >
                                <img src={whatsappIcon} alt='whatsapp' />
                            </button>
                        </div>
                        <button
                            type='button'
                            className='mobile_order_fab_toggle'
                            onClick={() => setIsMobileOrderFabOpen((prev) => !prev)}
                        >
                            <i className={`fa ${isMobileOrderFabOpen ? 'fa-times' : 'fa-commenting'}`}></i>
                        </button>
                    </div>}
                    <div className='have_question'>Have any question? Please contact us 01775299702</div>
                    {/* <div className='call'>
                        <i class="fa fa-phone" aria-hidden="true"></i>
                        <span>+8801784528799</span>
                    </div> */}
                </div>
            </div>
            <ProductDetailsSeller data={data?.sellerInfo || {}} sellerId={data?.sellerId} />
        </div>
    </>)
}

export default ProductDetails