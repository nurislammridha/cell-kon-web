import React, { useEffect, useMemo, useState } from 'react'
import slide1 from '../../assets/images/other/slide1.png'
import slide2 from '../../assets/images/other/slide2.png'
import slide3 from '../../assets/images/other/slide3.png'
import slide4 from '../../assets/images/other/slide4.png'
import smallBanner from '../../assets/images/other/smallBanner.png'
import sideBannerAlt from '../../assets/images/other/TS.png'

const Hero = () => {
    const slides = useMemo(() => [slide1, slide2, slide3, slide4, slide1, slide2, slide3, slide4], [])
    const allSideBanners = useMemo(() => [smallBanner, sideBannerAlt, smallBanner, sideBannerAlt], [])
    const sideBanners = useMemo(() => {
        return allSideBanners.filter((_, index) => index === 0 || index === 2)
    }, [allSideBanners])
    const [activeSlide, setActiveSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % slides.length)
        }, 4000)

        return () => clearInterval(timer)
    }, [slides.length])

    const goToNextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % slides.length)
    }

    const goToPreviousSlide = () => {
        setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    return (
        <section className='home_hero_wrap'>
            <div className='home_hero'>
                <div className='home_hero_main'>
                    {slides.map((slide, index) => (
                        <div key={index} className={`home_hero_slide ${activeSlide === index ? 'active' : ''}`}>
                            <img src={slide} alt={`Hero slide ${index + 1}`} loading='lazy' decoding='async' />
                        </div>
                    ))}

                    <button type='button' className='home_hero_nav home_hero_prev' onClick={goToPreviousSlide} aria-label='Previous slide'>
                        <i className='fas fa-chevron-left'></i>
                    </button>
                    <button type='button' className='home_hero_nav home_hero_next' onClick={goToNextSlide} aria-label='Next slide'>
                        <i className='fas fa-chevron-right'></i>
                    </button>

                    <div className='home_hero_dots'>
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                type='button'
                                className={`home_hero_dot ${activeSlide === index ? 'active' : ''}`}
                                aria-label={`Go to slide ${index + 1}`}
                                onClick={() => setActiveSlide(index)}
                            />
                        ))}
                    </div>
                </div>

                <div className='home_hero_side'>
                    {sideBanners.map((banner, index) => (
                        <div className='home_hero_side_card' key={index}>
                            <img src={banner} alt={`Side banner ${index + 1}`} loading='lazy' decoding='async' />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Hero
