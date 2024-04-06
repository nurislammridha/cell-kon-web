import React, { useEffect, useState } from 'react'
import pro3 from '../../assets/images/other/pro3.jpg'
import { initialVal } from '../../assets/function/globalFunction'
import { useNavigate, useParams } from 'react-router-dom'
const Shops = ({ arr = [] }) => {
    const [page, setPage] = useState(1)
    const [newArr, setNewArr] = useState(arr.slice(initialVal(arr, page), arr?.length))
    // const { innerWidth: width, innerHeight: height } = window;
    const navigate = useNavigate();
    // useEffect(() => {
    //     if (width < 376) {
    //         setNewArr(arr)
    //     } else {
    //         setNewArr(arr.slice(initialVal(arr, page), arr?.length))
    //     }
    // }, [arr])
    return (
        <div className='home_products'>
            <h2 className='title'>Our Shops</h2>
            <div className='products shops'>
                {arr?.length > 0 && arr.slice(initialVal(arr, page), arr?.length).map((item, index) => (
                    <div
                        key={index}
                        className="product_cart"
                        onClick={() => navigate(`/shop/${item?._id}`)}
                    >
                        <div>
                            <div className='product_img'>
                                <img
                                    src={item?.shopLogo?.url}
                                    alt="product"
                                />
                            </div>
                            <div className='product_name'>
                                {item?.shopName}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='arrow shop_arrow'>
                <div
                    className={page == 1 ? 'left_arrow vih' : "left_arrow"}
                    onClick={() => setPage(page - 1)}
                >
                    <i class='fas fa-chevron-left'></i>
                </div>
                <div
                    className={arr?.length / 5 >= page ? "right_arrow" : "right_arrow vih"}
                    onClick={() => setPage(page + 1)}
                >
                    <i class='fas fa-chevron-right'></i>
                </div>
            </div>
        </div>
    )
}

export default Shops