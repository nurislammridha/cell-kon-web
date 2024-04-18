import React, { useEffect, useState } from 'react'
import ProductsPagination from '../components/ProductsPagination'
import AllProducts from '../components/AllProducts'
import Filter from '../components/Filter'
import Order from '../components/Order'
import shopIcon from "../../assets/images/icons/userIcon.png"
import starIcon from "../../assets/images/icons/star.png"
import starFillIcon from "../../assets/images/icons/startFill.png"
import { useDispatch, useSelector } from 'react-redux'
import { GetCategories, GetFilterProduct, GetSellers } from '../_redux/CommonAction'
import { useParams } from 'react-router-dom'
import MobileCommonHeader from '../components/MobileCommonHeader'
const ShopProductsPage = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const productsList = useSelector((state) => state.homeInfo.productsList);
    const categoriesList = useSelector((state) => state.homeInfo.categoriesList);
    const sellersList = useSelector((state) => state.homeInfo.sellersList);
    const isProductLoading = useSelector((state) => state.homeInfo.isProductLoading);
    const [isShortBy, setShortBy] = useState(false)
    const [short, setShort] = useState(0)
    const [shortName, setShortName] = useState("Select")
    const [categoriesId, setCategoriesId] = useState([])
    const [sellersId, setSellersId] = useState([id])
    const handleSelect = (isCategory, id) => {
        if (isCategory) {
            //category
            let isExistCat = categoriesId.filter(el => el === id)
            if (isExistCat.length > 0) {
                setCategoriesId(l => l.filter(el => el !== id));
            } else {
                setCategoriesId(prevState => [...prevState, id]);
            }
        } else {
            console.log('isCategory', isCategory)
            //seller
            let isExistSeller = sellersId.filter(el => el === id)
            if (isExistSeller.length > 0) {
                setSellersId(l => l.filter(el => el !== id));
            } else {
                setSellersId(prevState => [...prevState, id]);
            }
        }
    }
    useEffect(() => {
        dispatch(GetFilterProduct({ categoriesId, sellersId, isShortBy, short }))
        dispatch(GetCategories())
        dispatch(GetSellers())
    }, [])
    useEffect(() => {
        dispatch(GetFilterProduct({ categoriesId, sellersId, isShortBy, short }))
    }, [categoriesId, sellersId, short])
    return (
        <div className='shop_mo'>
            <div className='muser_inf0'>
                <MobileCommonHeader />
            </div>
            <div className='shop_container'>
                <div className='product_page'>
                    {/* order section */}
                    {productsList?.length > 0 ? <div className='shop'>
                        <img src={shopIcon} alt='shop icon' />
                        <div className='shop_info'>
                            <h1>{productsList && productsList[0]?.sellerInfo?.shopName}</h1>
                            <h3 className='mt13'>Delivery in {productsList && productsList[0]?.sellerInfo?.deliveryPeriod}</h3>
                            <div className='star mt13'>
                                <img src={starFillIcon} />
                                <img src={starFillIcon} />
                                <img src={starFillIcon} />
                                <img src={starFillIcon} />
                                <img src={starIcon} />
                                <h3>(1.8K)</h3>
                            </div>
                            <h3 className='mt13'>{productsList && productsList[0]?.sellerInfo?.sellerAddress}</h3>
                        </div>
                    </div> : ""}

                    <div className='filter_product'>
                        {/* Shops  */}
                        <Filter
                            categoriesList={categoriesList}
                            sellersList={sellersList}
                            handleSelect={handleSelect}
                            categoriesId={categoriesId}
                            sellersId={sellersId}
                            hideShop={true}
                        />
                        <div className='filter_right'>
                            <div className='products'>
                                <div className='home_all_products product_form_page'>
                                    {/* All products */}
                                    <AllProducts list={productsList} />
                                    {/* //pagination */}
                                    {/* <ProductsPagination /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopProductsPage