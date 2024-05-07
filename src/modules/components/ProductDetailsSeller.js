import React from 'react'
import starIcon from "../../assets/images/icons/star.png"
import shopIcon from "../../assets/images/icons/userIcon.png"
import locationIcon from "../../assets/images/icons/location.png"
import deliveryIcon from "../../assets/images/icons/delivery.png"
import periodIcon from "../../assets/images/icons/period.png"
import starFillIcon from "../../assets/images/icons/startFill.png"
const ProductDetailsSeller = () => {
    return (
        <>
            <div className='details_top_right'>
                <div className='sold_by'>
                    Sold By
                </div>
                <div className='top_info'>
                    <img className='top_info_img' src={shopIcon} />
                    <div>
                        <p>RS FASHION CLUB</p>
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
                    <p>South Keraniganj, Dhaka.</p>
                </div>
                <div className='seller_info'>
                    <img src={periodIcon} />
                    <p>Delivery in 1 to 3 Days</p>
                </div>
                <div className='seller_info'>
                    <img src={deliveryIcon} />
                    <p>Delivery in 1 to 3 Days</p>
                </div>
                <a>
                    Visit Store
                </a>
            </div>
        </>
    )
}

export default ProductDetailsSeller