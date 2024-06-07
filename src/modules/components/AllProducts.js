import React from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
const AllProducts = ({ list = [] }) => {
    const location = useLocation();
    const navigate = useNavigate()
    return (
        <div className='products ms_products'>
            {list?.length > 0 ? list.map((item, index) => (
                <div
                    key={index}
                    className="product_cart cp"
                    onClick={() => location.pathname.substring(0, 17) === "/campaign-product" ? navigate(`/product-details/${item?._id}`, { state: { isFromCampaign: true, campaignId: item.campaignId, campaignEndDate: item.campaign.campaignEndDate, campaignEndTime: item.campaign.campaignEndTime, campaignPrice: item.campaignDiscount } }) : navigate(`/product-details/${item?._id}`)}
                >
                    <div>
                        <div className='product_img'>
                            <img
                                src={item?.productIcon?.url}
                                alt="product"
                            />
                        </div>
                        <div className='product_name'>
                            {item?.productName}
                        </div>
                    </div>
                    <div>
                        <div className='del_price'>
                            &#2547;{item?.mrp}
                        </div>
                        <div className='product_price'>
                            &#2547;{item?.isCampaign ? item?.campaignDiscount : item?.regularDiscount}
                        </div>
                    </div>
                </div>
            )) : (
                <div><h2 className='tac'>No products found</h2></div>
            )}

        </div>
    )
}

export default AllProducts