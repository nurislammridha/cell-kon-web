import React, { useEffect, useState } from 'react'
import ProductsPagination from '../components/ProductsPagination'
import AllProducts from '../components/AllProducts'
import Filter from '../components/Filter'
import Order from '../components/Order'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllProduct, GetCategories, GetFilterProduct, GetSellers } from '../_redux/CommonAction'
import { useLocation, useNavigate } from 'react-router-dom'
import filterIcon from '../../assets/images/icons/filter.png'
const AllProductsPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();
    const productsList = useSelector((state) => state.homeInfo.productsList);
    const categoriesList = useSelector((state) => state.homeInfo.categoriesList);
    const sellersList = useSelector((state) => state.homeInfo.sellersList);
    const isProductLoading = useSelector((state) => state.homeInfo.isProductLoading);
    const [isShortBy, setShortBy] = useState(false)
    const [short, setShort] = useState(0)
    const [shortName, setShortName] = useState("Select")
    const [categoriesId, setCategoriesId] = useState(location?.state?.isFromCategory ? [location?.state?.categoryId] : [])
    const [sellersId, setSellersId] = useState([])
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
        // if (location?.state?.isFromCategory) {
        //     setCategoriesId(location?.state?.categoryId)
        // }
        dispatch(GetFilterProduct({ categoriesId, sellersId, isShortBy, short }))
    }, [categoriesId, sellersId, short, location])
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
                    count={productsList?.length}
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
                        sellersList={sellersList}
                        handleSelect={handleSelect}
                        categoriesId={categoriesId}
                        sellersId={sellersId}
                        hideShop={false}
                        hideCategory={location?.state?.isFromCategory || false}
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
        </>
    )
}

export default AllProductsPage