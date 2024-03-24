import React, { useEffect } from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetOrderById } from '../_redux/CommonAction';
import moment from 'moment';
const OrderDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const orderDetailsLoading = useSelector((state) => state.homeInfo.orderDetailsLoading);
    const orderDetails = useSelector((state) => state.homeInfo.orderDetails);
    const { _id, deliveryAddressInfo, createdAt, confirmedAt, deliveredAt, pickedAt,
        processedAt, shippedAt, cancelAt, productInfo, isCancel, isConfirm, isCreated, isDelivered, isFullPaid, isPicked,
        isProcessing, isShipped, subTotal, shippingFee } = orderDetails || {}
    const { buyerName, buyerPhone, detailsAddress, district, division, upazilla, union } = deliveryAddressInfo || {}
    useEffect(() => {
        dispatch(GetOrderById(id))
    }, [id])
    console.log('orderDetails', orderDetails)
    return (
        <div className='cart_page checkout_page order_details'>
            <div>
                <div className='checkout_address_section '>
                    <div className='order_id'>
                        <div className='title'>
                            <div>Order ID: <span>{_id}</span></div>
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
                                <p>Picked</p>
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

    )
}

export default OrderDetailsPage