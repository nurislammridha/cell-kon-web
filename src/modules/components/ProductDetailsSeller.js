import React from 'react'
import starIcon from "../../assets/images/icons/star.png"
import shopIcon from "../../assets/images/icons/userIcon.png"
import locationIcon from "../../assets/images/icons/location.png"
import deliveryIcon from "../../assets/images/icons/delivery.png"
import periodIcon from "../../assets/images/icons/period.png"
import starFillIcon from "../../assets/images/icons/startFill.png"
import { useNavigate } from 'react-router-dom'
const ProductDetailsSeller = ({ data, sellerId = "" }) => {
    const navigate = useNavigate()
    const { deliveryPeriod, sellerAddress, shopName, shopLogo, } = data || {}
    return (
        <>
            <div className='details_top_right'>
                <div className='sold_by'>
                    Sold By
                </div>
                <div className='top_info'>
                    <img className='top_info_img' src={shopLogo?.url} />
                    <div>
                        <p>{shopName}</p>
                        <div className='star'>
                            <img src={starFillIcon} />
                            <img src={starFillIcon} />
                            <img src={starFillIcon} />
                            <img src={starFillIcon} />
                            <img src={starIcon} />
                            <p>(1.8K)</p>
                        </div>
                    </div>
                </div>
                <div className='seller_info'>
                    <img src={locationIcon} />
                    <p>{sellerAddress}</p>
                </div>
                <div className='seller_info'>
                    <img src={periodIcon} />
                    <p>Delivery in {deliveryPeriod}</p>
                </div>
                <div className='seller_info'>
                    <img src={deliveryIcon} />
                    <p>&#2547; 50 (100 Outside Area)</p>
                </div>
                <a onClick={() => navigate(`/shop/${sellerId}`)}>
                    Visit Store
                </a>
            </div>
        </>
    )
}

export default ProductDetailsSeller