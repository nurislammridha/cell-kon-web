import React from 'react'
import demo from '../../assets/images/icons/home11.png' //1176 443
import slide1 from '../../assets/images/other/slide1.png' //1176 443
import slide2 from '../../assets/images/other/slide2.png' //1176 443
import ts from '../../assets/images/other/TS.png' //1176 443
// import slide3 from '../../assets/images/other/slide3.jpg' //1176 443
// import slide4 from '../../assets/images/other/slide4.jpg' //1176 443
// import slide5 from '../../assets/images/other/slide5.jpg' //1176 443
import OwlCarousel from "react-owl-carousel";
const Hero = () => {
    return (<div className='hero_parent'>
        <div className='hero_category'>
            <ul>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 2].map((item) => (<li>
                    <img src={demo} />
                    <div>Women's & Girls Fasihion</div>
                </li>))}
            </ul>
            {/* <div className='subcategory_hover'>
                <ul >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 2].map((item) => (<li>

                        <div>Women's & Girls Fasihion</div>
                    </li>))}
                </ul>
            </div> */}

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