import React, { useEffect, useState } from 'react'
import ProductsPagination from '../components/ProductsPagination'
import AllProducts from '../components/AllProducts'
import Filter from '../components/Filter'
import Order from '../components/Order'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllProduct, GetCategories, GetFilterProduct, GetSellers } from '../_redux/CommonAction'

const AllProductsPage = () => {
    const dispatch = useDispatch()
    const productsList = useSelector((state) => state.homeInfo.productsList);
    const categoriesList = useSelector((state) => state.homeInfo.categoriesList);
    const sellersList = useSelector((state) => state.homeInfo.sellersList);
    const isProductLoading = useSelector((state) => state.homeInfo.isProductLoading);
    const [isShortBy, setShortBy] = useState(false)
    const [short, setShort] = useState(0)
    const [shortName, setShortName] = useState("Select")
    const [categoriesId, setCategoriesId] = useState([])
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
        dispatch(GetFilterProduct({ categoriesId, sellersId, isShortBy, short }))
    }, [categoriesId, sellersId, short])
    console.log('categoriesId sellersId', categoriesId, sellersId)
    return (
        <>
            <div className='product_page'>
                {/* order section */}
                <Order
                    count={productsList?.length}
                    setShortBy={setShortBy}
                    setShort={setShort}
                    shortName={shortName}
                    setShortName={setShortName}
                />
                <div className='filter_product'>
                    {/* Filter  */}
                    <Filter
                        categoriesList={categoriesList}
                        sellersList={sellersList}
                        handleSelect={handleSelect}
                        categoriesId={categoriesId}
                        sellersId={sellersId}
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