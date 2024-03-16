import React from 'react'
import Hero from '../components/Hero'
import Mall from '../components/Mall'
import Trending from '../components/Trending'
import Popular from '../components/Popular'
import Shops from '../components/Shops'
import Categories from '../components/Categories'
import HomeAllProducts from '../components/HomeAllProducts'

const HomePage = () => {
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