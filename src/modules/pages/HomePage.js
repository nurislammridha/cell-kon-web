import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import Mall from '../components/Mall'
import Trending from '../components/Trending'
import Popular from '../components/Popular'
import Shops from '../components/Shops'
import Categories from '../components/Categories'
import HomeAllProducts from '../components/HomeAllProducts'
import { GetHomePageData } from '../_redux/CommonAction'
import { useDispatch, useSelector } from 'react-redux'
import MobileFooter from '../components/MobileFooter'
import MobileHeader from '../components/MobileHeader'
import MobileMenu from '../components/MobileMenu'
import Campaign from '../components/Campaign'
import { isCampaign } from 'src/assets/function/globalFunction'

const HomePage = ({ isLogin, search, setSearch }) => {
    const dispatch = useDispatch();
    const isHomePageLoading = useSelector((state) => state.homeInfo.isHomePageLoading);
    const homeDataList = useSelector((state) => state.homeInfo.homeData);
    const { categoriesList, data, popularProducts,
        sellKonMallProducts, shopsList, trendingProducts, subCategoriesList, campaign } = homeDataList || {}
    // console.log('homeDataList', homeDataList)
    useEffect(() => {
        dispatch(GetHomePageData());
    }, [])
    return (
        <>
            {/* <MobileHeader search={search} setSearch={setSearch} /> */}
            {/* hero */}
            <Hero arr={subCategoriesList} loading={isHomePageLoading} />
            <MobileMenu />
            {/* Campaign Products */}
            {campaign && campaign.length > 0 && (<Campaign arr={campaign} loading={isHomePageLoading} />)}
            {/* Mall Products */}
            <Mall arr={sellKonMallProducts} loading={isHomePageLoading} />
            {/* Trending */}
            <Trending arr={trendingProducts} loading={isHomePageLoading} />
            {/* Popular */}
            <Popular arr={popularProducts} loading={isHomePageLoading} />
            {/* Shops */}
            {!isHomePageLoading && <Shops arr={shopsList} />}
            {/* Categories */}
            {!isHomePageLoading && <Categories arr={categoriesList} loading={isHomePageLoading} />}
            {/* Home All Products */}
            {!isHomePageLoading && <HomeAllProducts arr={data} loading={isHomePageLoading} />}
            <MobileFooter isLogin={isLogin} />
        </>
    )
}

export default HomePage