import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import Mall from '../components/Mall'
import Trending from '../components/Trending'
import Popular from '../components/Popular'
import Shops from '../components/Shops'
import Categories from '../components/Categories'
import HomeAllProducts from '../components/HomeAllProducts'
import { GetHomePageData, GetHomePageData1 } from '../_redux/CommonAction'
import { useDispatch, useSelector } from 'react-redux'

const HomePage = () => {
    const dispatch = useDispatch();
    const homeDataList = useSelector((state) => state.homeInfo.homeData);
    console.log('homeDataList', homeDataList)
    useEffect(() => {
        dispatch(GetHomePageData());
        // let x = GetHomePageData1()vv
        //  // console.log('GetHomePageData()', x)
    }, [])

    return (
        <>
            {/* hero */}
            <Hero />
            {/* Mall Products */}
            <Mall />
            {/* Trending */}
            <Trending />
            {/* Popular */}
            <Popular />
            {/* Shops */}
            <Shops />
            {/* Categories */}
            <Categories />
            {/* Home All Products */}
            <HomeAllProducts />
        </>
    )
}

export default HomePage