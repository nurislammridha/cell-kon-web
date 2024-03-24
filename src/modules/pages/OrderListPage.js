import React, { useEffect, useState } from 'react'
import upIcon from '../../assets/images/icons/up.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getBg, orderByStatus } from '../../assets/function/globalFunction'
import { GetOrderByBuyer } from '../_redux/CommonAction'
import moment from 'moment'
const OrderListPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [tab, setTab] = useState("All")
    const isOrderListLoading = useSelector((state) => state.homeInfo.isOrderListLoading);
    const orderList = useSelector((state) => state.homeInfo.orderList);
    useEffect(() => {
        dispatch(GetOrderByBuyer())
    }, [])
    // console.log('orderList', orderList)
    return (
        <div className='order_list_container'>
            <div className='container'>
                <div className='my_nav'>
                    <div className='nav_item cp' onClick={() => setTab("All")}>
                        <span>All</span>
                        <div className={tab === "All" ? 'up_icon active' : 'up_icon'}> <img src={upIcon} /></div>
                    </div>
                    <div className='nav_item cp' onClick={() => setTab("Created")}>
                        <span>Created</span>
                        <div className={tab === "Created" ? 'up_icon active' : 'up_icon'}> <img src={upIcon} /></div>
                    </div>
                    <div className='nav_item cp' onClick={() => setTab("Confirmed")}>
                        <span>Confirm</span>
                        <div className={tab === "Confirmed" ? 'up_icon active' : 'up_icon'}> <img src={upIcon} /></div>
                    </div>
                    <div className='nav_item cp' onClick={() => setTab("Processing")}>
                        <span>Processing</span>
                        <div className={tab === "Processing" ? 'up_icon active' : 'up_icon'}> <img src={upIcon} /></div>
                    </div>
                    <div className='nav_item cp' onClick={() => setTab("Picked")}>
                        <span>Picked</span>
                        <div className={tab === "Picked" ? 'up_icon active' : 'up_icon'}> <img src={upIcon} /></div>
                    </div>
                    <div className='nav_item cp' onClick={() => setTab("Shipped")}>
                        <span>Shipped</span>
                        <div className={tab === "Shipped" ? 'up_icon active' : 'up_icon'}> <img src={upIcon} /></div>
                    </div>
                    <div className='nav_item cp' onClick={() => setTab("Delivered")}>
                        <span>Delivered</span>
                        <div className={tab === "Delivered" ? 'up_icon active' : 'up_icon'}> <img src={upIcon} /></div>
                    </div>
                    <div className='nav_item cp' onClick={() => setTab("Cancelled")}>
                        <span>Cancelled</span>
                        <div className={tab === "Cancelled" ? 'up_icon active' : 'up_icon'}> <img src={upIcon} /></div>
                    </div>
                </div>
                <div className='products_list'>
                    {orderList?.length > 0 && orderByStatus(orderList, tab).length > 0 ? orderByStatus(orderList, tab).map((item, index) => (
                        <div key={index} className='cp products' onClick={() => navigate(`/order-details/${item._id}`)}>
                            <div className='order_id'>
                                <div>Order ID:<span>{item._id}</span></div>
                                <a className={getBg(item.orderStatus)}>{item.orderStatus}</a>
                            </div>
                            <div className='taka_section'>
                                <span className='taka'>&#2547;{item.shippingFee + item.subTotal}</span>
                                <span className='date'>{moment(item.createdAt).format('lll')}</span>
                            </div>
                        </div>
                    )) :
                        (<div className='mt10'>NO ORDER FOUND</div>)}
                </div>
            </div>
        </div>
    )
}

export default OrderListPage