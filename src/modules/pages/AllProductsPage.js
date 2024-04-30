import React, { useEffect, useState } from 'react'
import ProductsPagination from '../components/ProductsPagination'
import AllProducts from '../components/AllProducts'
import Filter from '../components/Filter'
import Order from '../components/Order'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllProduct, GetBrands, GetCategories, GetFilterProduct, GetSellers } from '../_redux/CommonAction'
import { useLocation, useNavigate } from 'react-router-dom'
import filterIcon from '../../assets/images/icons/filter.png'
const AllProductsPage = ({ search }) => {
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
    const [brandsId, setBrandsId] = useState([])
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
        dispatch(GetFilterProduct({ categoriesId, brandsId, isShortBy, short, search, page, limit: 20 }));
    };
    useEffect(() => {
        dispatch(GetFilterProduct({ categoriesId, brandsId, isShortBy, short, search, page: 1, limit: 20 }))
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
        dispatch(GetFilterProduct({ categoriesId, brandsId, isShortBy, short, search, page: 1, limit: 20 }))
    }, [categoriesId, brandsId, short, location, search])
    // console.log('categoriesId sellersId', categoriesId, sellersId)
    return (
        <>
            <div className='muser_inf0 mpro_info'>
                <div className='details_top'>
                    <div
                        className='l_arrow'
                        onClick={() => navigate(-1)}
                    >
                        <i class="fas fa-arrow-left"></i>
                    </div>
                    <div className='title'>
                        Showing 250 Product
                    </div>
                    <div className='filter'>
                        <img src={filterIcon} />
                    </div>
                </div>
            </div>
            <div className='ms_product_page product_page'>
                {/* order section */}
                <Order
                    count={products?.length}
                    setShortBy={setShortBy}
                    setShort={setShort}
                    shortName={shortName}
                    setShortName={setShortName}
                    categoryName={location?.state?.categoryName || ""}
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

export default AllProductsPage