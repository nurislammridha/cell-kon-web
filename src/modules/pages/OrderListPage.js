import React from 'react'
import upIcon from '../../assets/images/icons/up.png'
import { useNavigate } from 'react-router-dom'
const OrderListPage = () => {
    const navigate = useNavigate()
    const getBg = (item) => {
        let bg = ""
        if (item === "Created") {
            bg = "created_bg"
        } else if (item === "Confirm") {
            bg = "confirm_bg"
        } else if (item === "Cancelled") {
            bg = "cancelled_bg"
        } else if (item === "Picked") {
            bg = "picked_bg"
        } else if (item === "Shipped") {
            bg = "shipped_bg"
        } else if (item === "Delivered") {
            bg = "delivered_bg"
        } else if (item === "Processing") {
            bg = "processing_bg"
        }
        return bg
    }
    return (
        <div className='order_list_container'>
            <div className='container'>
                <div className='my_nav'>
                    <div className='nav_item'>
                        <span>All</span>
                        <div className='up_icon active'> <img src={upIcon} /></div>
                    </div>
                    <div className='nav_item'>
                        <span>Created</span>
                        <div className='up_icon'> <img src={upIcon} /></div>
                    </div>
                    <div className='nav_item'>
                        <span>Confirm</span>
                        <div className='up_icon'> <img src={upIcon} /></div>
                    </div>
                    <div className='nav_item'>
                        <span>Processing</span>
                        <div className='up_icon'> <img src={upIcon} /></div>
                    </div>
                    <div className='nav_item'>
                        <span>Picked</span>
                        <div className='up_icon'> <img src={upIcon} /></div>
                    </div>
                    <div className='nav_item'>
                        <span>Shipped</span>
                        <div className='up_icon'> <img src={upIcon} /></div>
                    </div>
                    <div className='nav_item'>
                        <span>Delivered</span>
                        <div className='up_icon'> <img src={upIcon} /></div>
                    </div>
                    <div className='nav_item'>
                        <span>Cancelled</span>
                        <div className='up_icon'> <img src={upIcon} /></div>
                    </div>
                </div>
                <div className='products_list'>
                    {["Created", "Confirm", "Cancelled", "Picked", "Shipped", "Delivered", "Processing"].map((item) => (
                        <div className='cp products' onClick={() => navigate('/order-details')}>
                            <div className='order_id'>
                                <div>Order ID:<span>GBO9712906</span></div>
                                <a className={getBg(item)}>{item}</a>
                            </div>
                            <div className='taka_section'>
                                <span className='taka'>&#2547;32,400</span>
                                <span className='date'>21 sep, 3:48pm</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OrderListPage