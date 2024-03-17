import React from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
const OrderDetailsPage = () => {
    return (
        <div className='cart_page checkout_page order_details'>
            <div>
                <div className='checkout_address_section '>
                    <div className='order_id'>
                        <div className='title'>
                            <div>Order ID: <span>GBO923344565</span></div>
                            <a className='item'>Copy</a>
                        </div>
                        <div className='item'>21 sep, 3:48</div>
                    </div>
                    <div className='checkout_title'>
                        <span>Amanullah</span>
                    </div>
                    <div className='item checkout_phone'>01784528799</div>
                    <div className='item checkout_address'>
                        House -237/1, Road, W4, Eastern housing,
                        Pollobi, dhaka-1216
                    </div>
                </div>
                <div className='status'>
                    <div className='order_timeline'>Order Timeline</div>
                    <div className='status_grow'>
                        <div className='left'>
                            <div className='active circle created_bg'><i class="fa fa-check" aria-hidden="true"></i></div>
                            {/* <div className='line '></div> */}
                            <div className='active circle confirm_bg '><i class="fa fa-check" aria-hidden="true"></i></div>
                            {/* <div className='line'></div> */}
                            <div className='active circle processing_bg'><i class="fa fa-check" aria-hidden="true"></i></div>
                            {/* <div className='line'></div> */}
                            <div className='circle picked_bg'><i class="fa fa-check" aria-hidden="true"></i></div>
                            {/* <div className='line'></div> */}
                            <div className='circle shipped_bg'><i class="fa fa-check" aria-hidden="true"></i></div>
                            <div className='line'></div>
                            <div className='circle delivered_bg'><i class="fa fa-check" aria-hidden="true"></i></div>
                            <div className='circle cancelled_bg'><i class="fa fa-check" aria-hidden="true"></i></div>
                            {/* <div className='line'></div> */}
                        </div>
                        <div className='right'>
                            <div className='status_item'>
                                <p>Created</p>
                                <span className='item'>26 May 2021 2:50PM</span>
                            </div>
                            <div className='status_item'>
                                <p>Confirm</p>
                                <span className='item'>26 May 2021 2:50PM</span>
                            </div>
                            <div className='status_item'>
                                <p>Processing</p>
                                <span className='item'>26 May 2021 2:50PM</span>
                            </div>
                            <div className='status_item'>
                                <p>Picked</p>
                                <span className='item'>26 May 2021 2:50PM</span>
                            </div>
                            <div className='status_item'>
                                <p>Shipped</p>
                                <span className='item'>26 May 2021 2:50PM</span>
                            </div>
                            <div className='status_item'>
                                <p>Delivered</p>
                                <span className='item'>26 May 2021 2:50PM</span>
                            </div>
                            <div className='status_item'>
                                <p>Canceled</p>
                                <span className='item'>26 May 2021 2:50PM</span>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='cart_products mt16'>
                    <div className='cart_top'>
                        <span>5 Products</span>
                        <span>Variation</span>
                    </div>
                    <div className='cart_bottom'>
                        {[1, 4].map((item) => (
                            <div className='cart_item'>
                                <div className='cart_img'>
                                    <img src={pro3} alt='product' />
                                </div>
                                <div className='cart_right'>
                                    <div className='cart_title'>
                                        Origine Starde Revolutio red
                                        we we we qw  we er we r er er erwe 123
                                    </div>
                                    <div className='cart_taka_3 taka_q'>
                                        <span>&#2547;3,24,000X1</span>
                                        <span>Color: Blue</span>
                                    </div>
                                    <div className='cart_taka_3 taka_r'>
                                        <span>&#2547;3,24,000X1</span>
                                        <span>Size: 0</span>
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
                        <span className='clrF54C54'>&#2547;324000</span>
                    </div>
                    <div className='cart_subtotal'>
                        <span>Paid Amount</span>
                        <span className='clr3598DA'>&#2547;500</span>
                    </div>
                    <div className='cart_subtotal'>
                        <span>Due Amount</span>
                        <span className='clrE9BA00'>&#2547;500</span>
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
                        <span>bKash</span>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default OrderDetailsPage