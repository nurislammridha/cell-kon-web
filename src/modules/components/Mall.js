import React, { useEffect, useState } from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { initialVal, isLastPage } from '../../assets/function/globalFunction'
import { useNavigate } from 'react-router-dom'
// import { initialVal } from 'src/assets/function/globalFunction'
const Mall = ({ arr = [], loading }) => {
    const [page, setPage] = useState(1)
    const [newArr, setNewArr] = useState(arr.slice(initialVal(arr, page), arr?.length))
    const [width, setWidth] = useState(0)

    const navigate = useNavigate();
    // let arr = ["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9", "item10", "item11", "item12", "item13"]
    useEffect(() => {
        // if (width < 376) {
        //     setNewArr(arr)
        // } else {
        // setNewArr(arr.slice(initialVal(arr, page), arr?.length))
        // }
    }, [arr])
    useEffect(() => {
        // const { innerWidth, innerHeight: height } = window;
        // setWidth(window.innerWidth)
    }, [])

    console.log('arrarr', arr)
    console.log('see', arr.slice(initialVal(arr, page), arr?.length + 1))
    return (
        <div className='home_products'>
            <h2 className='title'>Sellkon Mall</h2>
            <div className='products'>
                {!loading ? arr?.length > 0 && arr.slice(initialVal(arr, page), arr?.length).map((item, index) => (
                    <div
                        key={index}
                        className="product_cart"
                        onClick={() => navigate(`/product-details/${item?._id}`)}
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
                )) :
                    [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                        <div
                            key={index}
                            className="product_cart"
                        >
                            <div>
                                <div className='product_img'>
                                    <span id="foo"></span>
                                </div>
                                <div className='product_name'>
                                    <span id="foo"></span>
                                </div>
                            </div>
                            <div>
                                <div className='del_price'>
                                    <span id="foo"></span>
                                </div>
                                <div className='product_price'>
                                    <span id="foo"></span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className='arrow'>
                <div
                    className={page == 1 ? 'left_arrow vih' : "left_arrow"}
                    onClick={() => setPage(page - 1)}
                >
                    <i class='fas fa-chevron-left'></i>
                </div>
                <div
                    className={isLastPage(arr, page, 5) ? "right_arrow" : "right_arrow vih"}
                    onClick={() => setPage(page + 1)}
                >
                    <i class='fas fa-chevron-right'></i>
                </div>
            </div>
        </div >
    )
}

export default Mall