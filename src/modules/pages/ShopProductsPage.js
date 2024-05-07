import React, { useEffect, useState } from 'react'
import ProductsPagination from '../components/ProductsPagination'
import AllProducts from '../components/AllProducts'
import Filter from '../components/Filter'
import Order from '../components/Order'
import shopIcon from "../../assets/images/icons/userIcon.png"
import starIcon from "../../assets/images/icons/star.png"
import starFillIcon from "../../assets/images/icons/startFill.png"
import banner from "../../assets/images/other/shop_banner.png"
import { useDispatch, useSelector } from 'react-redux'
import { GetBrands, GetCategories, GetFilterProduct, GetSellerById, GetSellers } from '../_redux/CommonAction'
import { useLocation, useParams } from 'react-router-dom'
import MobileCommonHeader from '../components/MobileCommonHeader'
import ShopProducts from '../components/ShopProducts'


import MobileFilter from '../components/MobileFilter'
const ShopProductsPage = ({ search, isLogin }) => {
    const location = useLocation();
    const dispatch = useDispatch()
    const { id } = useParams();
    const { pathname } = useLocation();
    const proInfo = useSelector((state) => state.homeInfo.productsList);
    const { products, pagination } = proInfo || {}
    const categoriesList = useSelector((state) => state.homeInfo.categoriesList);
    const brandsList = useSelector((state) => state.homeInfo.brandsList);
    const sellerDetails = useSelector((state) => state.homeInfo.sellerDetails);
    const isProductLoading = useSelector((state) => state.homeInfo.isProductLoading);
    const [isShortBy, setShortBy] = useState(false)
    const [short, setShort] = useState(0)
    const [shortName, setShortName] = useState("Select")
    const [categoriesId, setCategoriesId] = useState([])
    const [brandsId, setBrandsId] = useState([])
    const [isClose, setClose] = useState(false)
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
            // console.log('isCategory', isCategory)
            //brand
            let isExistBrand = brandsId.filter(el => el === id)
            if (isExistBrand.length > 0) {
                setBrandsId(l => l.filter(el => el !== id));
            } else {
                setBrandsId(prevState => [...prevState, id]);
            }
        }
    }
    const handlePagination = (page) => {
        dispatch(GetFilterProduct({ categoriesId, brandsId, sellersId: [id], isShortBy, short, search, page, limit: 20 }));
    };
    useEffect(() => {
        // dispatch(GetFilterProduct({ categoriesId, brandsId, isShortBy, short }))
        dispatch(GetCategories())
        dispatch(GetBrands())
        dispatch(GetSellerById(id))
    }, [])
    useEffect(() => {
        dispatch(GetFilterProduct({ categoriesId, brandsId, sellersId: [id], isShortBy, short, search, page: 1, limit: 20 }))
    }, [categoriesId, brandsId, short, id, search])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return (
        <div className='shop_mo shop_new_banner'>
            {/* <div className='muser_inf0'>
                <MobileCommonHeader isSearch={true} />
            </div> */}

            <div className='shop_container'>
                <div className='product_page'>
                    {/* order section */}
                    {sellerDetails !== null && <div className='shop'>
                        <img src={banner} className='banner_img' />
                        <div className='shop_info_parent'>
                            <img src={sellerDetails.shopLogo.url} className='seller_icon' alt='shop icon' />
                            <div className='shop_info'>
                                <h2>{sellerDetails.shopName}</h2>
                                <div className='star mt5'>
                                    <img src={starFillIcon} />
                                    <img src={starFillIcon} />
                                    <img src={starFillIcon} />
                                    <img src={starFillIcon} />
                                    <img src={starIcon} />
                                    <h5>(1.8K)</h5>
                                </div>
                                <p className='mt5 delivery_in'>Delivery in {products?.length > 0 ? products[0]?.sellerInfo?.deliveryPeriod : "0 Days"}</p>
                                <p className='mt5 delivery_in'>{sellerDetails.sellerAddress}</p>
                            </div>
                        </div>
                    </div>}
                    <Order
                        count={pagination?.count || 0}
                        setShortBy={setShortBy}
                        setShort={setShort}
                        shortName={shortName}
                        setShortName={setShortName}
                        categoryName={location?.state?.categoryName || ""}
                        subCategoryName={location?.state?.subCategoryName || ""}
                    />
                    <MobileFilter
                        number={products?.length}
                        setShortBy={setShortBy}
                        setShort={setShort}
                        isShortBy={isShortBy}
                        short={short}
                        setClose={setClose}
                    />
                    <div className='filter_product'>
                        {/* Shops  */}
                        <Filter
                            categoriesList={categoriesList}
                            brandsList={brandsList}
                            handleSelect={handleSelect}
                            categoriesId={categoriesId}
                            brandsId={brandsId}
                            hideShop={false}
                            isClose={isClose}
                            setClose={setClose}
                        />
                        <div className='filter_right'>
                            <div className='products'>
                                <div className='home_all_products product_form_page'>
                                    {/* All products */}
                                    <ShopProducts list={products} isLogin={isLogin} shopId={id} />
                                    {/* //pagination */}
                                    {pagination?.totalPage > 1 && <ProductsPagination pagination={pagination} handlePagination={handlePagination} />}
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