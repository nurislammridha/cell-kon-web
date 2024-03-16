import React from 'react'
import slide1 from '../../assets/images/other/slide1.jpg' //1176 443
import slide2 from '../../assets/images/other/slide2.jpg' //1176 443
import slide3 from '../../assets/images/other/slide3.jpg' //1176 443
import slide4 from '../../assets/images/other/slide4.jpg' //1176 443
import slide5 from '../../assets/images/other/slide5.jpg' //1176 443
import OwlCarousel from "react-owl-carousel";
const Hero = () => {
    return (
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
                    [slide3, slide4, slide5, slide3, slide4].map((item) => {
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
    )
}

export default Hero