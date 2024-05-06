import React, { useState } from 'react'
import demo from '../../assets/images/icons/home11.png' //1176 443
import slide1 from '../../assets/images/other/slide1.png' //1176 443
import slide2 from '../../assets/images/other/slide2.png' //1176 443
import ts from '../../assets/images/other/TS.png' //1176 443
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
import OwlCarousel from "react-owl-carousel";
import { flatToNestedArr } from 'src/services/GlobalFunction'
import { useNavigate } from 'react-router-dom'
const Hero = ({ arr, loading }) => {
    const navigate = useNavigate()
    const list = flatToNestedArr(arr) || []
    const [subList, setSubList] = useState([])
    const [hover, setHover] = useState(-1)
    console.log('listtttt', list)
    console.log('subList', subList)
    return (<div className='hero_parent'>
        <div className='hero_category'>
            {!loading && list?.length > 0 && (
                <ul >
                    {list.map((item, index) => (
                        <li
                            key={index}
                            onMouseEnter={() => {
                                setSubList(item.children)
                                setHover(index)
                            }}
                            onMouseLeave={() => setHover(-1)}
                        // onClick={() => navigate(`/all-products`, { state: { isFromCategory: true, categoryId: item.categoryId, categoryName: item.categoryName } })}
                        >
                            <div className='cat_nam'>
                                <img src={require(`../../assets/images/icons/cat/${hover === index ? item.iconName + "Hover" : item.iconName}.png`)} />
                                <div>{item?.categoryName}</div>
                            </div>
                            <img className='right_arrow' src={rightArrow} />
                        </li>
                    ))}
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
                <div className='subcategory_hover'>
                    <ul >
                        {subList.length > 0 && subList.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => navigate(`/all-products`, { state: { isFromSubCategory: true, subCategoryId: item._id, categoryName: item.categoryName, subCategoryName: item.subCategoryName } })}
                            >
                                <div>{item.subCategoryName}</div>
                                <img className='right_arrow' src={rightArrow} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
        <div className='hero_main_banner'>
            <div className='hero_main'>
                <OwlCarousel
                    className="owl-theme"
                    loop
                    margin={10}
                    items={1}
                    autoplay={true}
                    nav
                    autoplayHoverPause={true}
                >
                    {
                        [slide1, slide2, slide1, slide2, slide1, slide2].map((item) => {
                            return (
                                <>

                                    <div class="item hero_carousel">
                                        <img src={item} className="img-fluid" alt="" />
                                    </div>

                                </>

                            )
                        })
                    }

                </OwlCarousel>
            </div>
            <div className='hero_sub_banner'>
                <div className='left'><img src={ts} /></div>
                <div className='right'><img src={ts} /></div>
            </div>
        </div>
    </div>)
}

export default Hero