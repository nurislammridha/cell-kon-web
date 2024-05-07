import React, { useEffect, useState } from 'react'
import ProductsPagination from '../components/ProductsPagination'
import AllProducts from '../components/AllProducts'
import Filter from '../components/Filter'
import Order from '../components/Order'
import Ts from '../../assets/images/other/Heatwave_logo_design.gif'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllProduct, GetBrands, GetCategories, GetFilterProduct, GetSellers } from '../_redux/CommonAction'
import { useLocation, useNavigate } from 'react-router-dom'
import filterIcon from '../../assets/images/icons/filter.png'
import searchIcon from '../../assets/images/icons/search.png'
import MobileCommonHeader from '../components/MobileCommonHeader'
import MobileFilter from '../components/MobileFilter'
const CampaignProductsPage = ({ search, setSearch }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();
    const { pathname } = useLocation();
    const proInfo = useSelector((state) => state.homeInfo.productsList);
    const { products, pagination } = proInfo || {}
    const categoriesList = useSelector((state) => state.homeInfo.categoriesList);
    const brandsList = useSelector((state) => state.homeInfo.brandsList);
    const isProductLoading = useSelector((state) => state.homeInfo.isProductLoading);
    const [isShortBy, setShortBy] = useState(false)
    const [short, setShort] = useState(0)
    const [shortName, setShortName] = useState("Select")
    const [categoriesId, setCategoriesId] = useState(location?.state?.isFromCategory ? [location?.state?.categoryId] : [])
    const [subCategoryId, setSubCategoryId] = useState(location?.state?.isFromSubCategory ? location?.state?.subCategoryId : "")
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
            console.log('isCategory', isCategory)
            //seller
            let isExistBrand = brandsId.filter(el => el === id)
            if (isExistBrand.length > 0) {
                setBrandsId(l => l.filter(el => el !== id));
            } else {
                setBrandsId(prevState => [...prevState, id]);
            }
        }
    }
    const handlePagination = (page) => {
        dispatch(GetFilterProduct({ categoriesId, subCategoryId, brandsId, isShortBy, short, search, page, limit: 20 }));
    };
    useEffect(() => {
        dispatch(GetFilterProduct({ categoriesId, subCategoryId, brandsId, isShortBy, short, search, page: 1, limit: 20 }))
        dispatch(GetCategories())
        dispatch(GetBrands())
    }, [])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    // useEffect(() => {
    //     if (search.length > 0) {
    //         dispatch(GetFilterProduct({ categoriesId, sellersId, isShortBy, short, search }))
    //     }
    // }, [search])
    useEffect(() => {
        // if (location?.state?.isFromCategory) {
        //     setCategoriesId(location?.state?.categoryId)
        // }
        dispatch(GetFilterProduct({ categoriesId, subCategoryId, brandsId, isShortBy, short, search, page: 1, limit: 20 }))
    }, [categoriesId, brandsId, short, location, search])
    // console.log('categoriesId sellersId', categoriesId, sellersId)
    return (
        <>
            <div className='campaign_gif'>
                <img src={Ts} />
            </div>
            <div className='all_product_filter_container'>
                <MobileFilter
                    number={products?.length}
                    setShortBy={setShortBy}
                    setShort={setShort}
                    isShortBy={isShortBy}
                    short={short}
                    setClose={setClose}
                />
            </div>
            <div className='ms_product_page product_page'>
                {/* order section */}
                <Order
                    count={pagination?.count || 0}
                    setShortBy={setShortBy}
                    setShort={setShort}
                    shortName={shortName}
                    setShortName={setShortName}
                    categoryName={location?.state?.categoryName || ""}
                    subCategoryName={location?.state?.subCategoryName || ""}
                />
                <div className='filter_product'>
                    {/* Filter  */}
                    <Filter
                        categoriesList={categoriesList}
                        brandsList={brandsList}
                        handleSelect={handleSelect}
                        categoriesId={categoriesId}
                        brandsId={brandsId}
                        hideShop={false}
                        hideCategory={location?.state?.isFromCategory || false}
                        isClose={isClose}
                        setClose={setClose}
                    />
                    <div className='filter_right'>
                        <div className='products'>
                            <div className='home_all_products product_form_page'>
                                {/* All products */}
                                <AllProducts list={products} />
                                {/* //pagination */}
                                {pagination?.totalPage > 1 && <ProductsPagination pagination={pagination} handlePagination={handlePagination} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CampaignProductsPage