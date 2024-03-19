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

const HomePage = () => {
    const dispatch = useDispatch();
    const homeDataList = useSelector((state) => state.homeInfo.homeData);
    const { categoriesList, data, popularProducts,
        sellKonMallProducts, shopsList, trendingProducts } = homeDataList || {}
    console.log('homeDataList', homeDataList)
    useEffect(() => {
        dispatch(GetHomePageData());
    }, [])
    return (
        <>
            {/* hero */}
            <Hero />
            {/* Mall Products */}
            <Mall arr={sellKonMallProducts} />
            {/* Trending */}
            <Trending arr={trendingProducts} />
            {/* Popular */}
            <Popular arr={popularProducts} />
            {/* Shops */}
            <Shops arr={shopsList} />
            {/* Categories */}
            <Categories arr={categoriesList} />
            {/* Home All Products */}
            <HomeAllProducts arr={data} />
        </>
    )
}

export default HomePage