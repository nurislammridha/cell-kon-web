import React, { useEffect, useMemo, useState } from 'react'
import demo from '../../assets/images/icons/home11.png' //1176 443
import slide1 from '../../assets/images/other/slide1.png' //1176 443
import slide2 from '../../assets/images/other/slide2.png' //1176 443
import slide3 from '../../assets/images/other/slide3.png' //1176 443
import slide4 from '../../assets/images/other/slide4.png' //1176 443
// import ts from '../../assets/images/other/smallBanner.png' //1176 443
import ts from '../../assets/images/other/smallBanner.png' //1176 443
import rightArrow from '../../assets/images/icons/right_arrow.png'
// import WomensGirlsFashion from '../../assets/images/icons/cat/WomensGirlsFashion.png'
// import WatchesBagsJewellery from '../../assets/images/icons/cat/WatchesBagsJewellery.png'
// import MensBoysFashion from '../../assets/images/icons/cat/MensBoysFashion.png'
// import HealthBeauty from '../../assets/images/icons/cat/HealthBeauty.png'
// import HomeLifestyle from '../../assets/images/icons/cat/HomeLifestyle.png'
// import MotherBaby from '../../assets/images/icons/cat/MotherBaby.png'
// import ElectronicsDevice from '../../assets/images/icons/cat/Electronics Device.png'
// import TVHomeAppliances from '../../assets/images/icons/cat/HomeAppliancesTV.png'
// import ElectronicAccessories from '../../assets/images/icons/cat/Electronic Accessories.png'
// import SportsOutdoors from '../../assets/images/icons/cat/SportsOutdoors.png'
import { flatToNestedArr } from 'src/services/GlobalFunction'
import { useNavigate } from 'react-router-dom'
const Hero = ({ arr, categories = [], subSubCategories = [], loading }) => {
    const navigate = useNavigate()
    const slides = useMemo(() => [slide1, slide2, slide3, slide4, slide1, slide2, slide3, slide4], [])
    const list = flatToNestedArr(arr, categories) || []
    const [subList, setSubList] = useState([])
    const [subSubList, setSubSubList] = useState([])
    const [hover, setHover] = useState(-1)
    const [activeSlide, setActiveSlide] = useState(0)
    const subSubMap = useMemo(() => {
        const map = new Map()
        if (Array.isArray(subSubCategories)) {
            subSubCategories.forEach((item) => {
                if (!item?.subCategoryId) return
                if (!map.has(item.subCategoryId)) {
                    map.set(item.subCategoryId, [])
                }
                map.get(item.subCategoryId).push(item)
            })
        }
        return map
    }, [subSubCategories])
    const getIconUrl = (icon) => {
        if (!icon) return ""
        if (typeof icon === "string") {
            return icon.startsWith("http") || icon.startsWith("/") ? icon : ""
        }
        if (typeof icon === "object") {
            return icon.url || ""
        }
        return ""
    }
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % slides.length)
        }, 3500)

        return () => clearInterval(timer)
    }, [slides.length])

    const goToNextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % slides.length)
    }

    const goToPreviousSlide = () => {
        setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }
    // console.log('listtttt', list)
    // console.log('subList', subList)
    return (<div className='hero_parent'>
        <div className='hero_category'>
            {!loading && list?.length > 0 && (
                <ul >
                    {list.map((item, index) => {
                        const hasChildren = Array.isArray(item.children) && item.children.length > 0
                        return (
                            <li
                                key={index}
                                onMouseEnter={() => {
                                    setSubList(item.children)
                                    setSubSubList([])
                                    setHover(index)
                                }}
                                onMouseLeave={() => setHover(-1)}
                            // onClick={() => navigate(`/all-products`, { state: { isFromCategory: true, categoryId: item.categoryId, categoryName: item.categoryName } })}
                            >
                                <div className='cat_nam'>
                                    <img
                                        src={getIconUrl(hover === index ? item.categoryHoverIcon : item.categoryIcon) || getIconUrl(item.categoryIcon) || demo}
                                        alt={item?.categoryName || "Category"}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div>{item?.categoryName}</div>
                                </div>
                                {hasChildren && <img className='right_arrow' src={rightArrow} />}
                            </li>
                        )
                    })}
                </ul>
            )}
            {loading && list?.length == 0 && (
                <ul className='home_category_loader'>
                    {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,].map((item, index) => (<li key={index}>
                        <div id="foo"></div>
                        <div id="foo"></div>
                    </li>))}
                </ul>)}
            <div className='subcategory_hover_parent subcategory__block'>
                <div className={`subcategory_hover ${subList.length === 0 ? "is-empty" : ""}`}>
                    <ul >
                        {subList.length > 0 && subList.map((item, index) => {
                            const nextList = subSubMap.get(item._id) || []
                            const hasSubSub = nextList.length > 0
                            return (
                                <li
                                    key={index}
                                    onMouseEnter={() => {
                                        setSubSubList(nextList)
                                    }}
                                    onClick={() => navigate(`/category/${item._id}`, { state: { isFromSubCategory: true, subCategoryId: item._id, categoryName: item.categoryName, subCategoryName: item.subCategoryName } })}
                                >
                                    <div>{item.subCategoryName}</div>
                                    {hasSubSub && <img className='right_arrow' src={rightArrow} />}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className={`subsubcategory_hover ${subSubList.length === 0 ? "is-empty" : ""}`}>
                    <ul>
                        {subSubList.length > 0 && subSubList.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => navigate(`/category/${item.subCategoryId}`, { state: { isFromSubSubCategory: true, subSubCategoryId: item._id, categoryName: item.categoryName, subCategoryName: item.subCategoryName, subSubCategoryName: item.subSubCategoryName } })}
                            >
                                <div>{item.subSubCategoryName}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
        <div className='hero_main_banner'>
            <div className='hero_main'>
                <div className="hero_slider">
                    <div className="item hero_carousel">
                        <img src={slides[activeSlide]} className="img-fluid" alt="Promotional banner" />
                    </div>
                    <button type="button" className="hero_slider_nav hero_slider_prev" onClick={goToPreviousSlide} aria-label="Previous slide">
                        <i className='fas fa-chevron-left'></i>
                    </button>
                    <button type="button" className="hero_slider_nav hero_slider_next" onClick={goToNextSlide} aria-label="Next slide">
                        <i className='fas fa-chevron-right'></i>
                    </button>
                </div>
            </div>
            <div className='hero_sub_banner'>
                <div className='left'><img src={ts} loading="lazy" decoding="async" /></div>
                <div className='right'><img src={ts} loading="lazy" decoding="async" /></div>
            </div>
        </div>
    </div>)
}

export default Hero
