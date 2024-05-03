import React from 'react'
import lowToHigh from '../../assets/images/icons/low_to_high.png'
import highToLow from '../../assets/images/icons/high_to_low.png'
import filterIcon from '../../assets/images/icons/filter.png'
const MobileFilter = ({ number, setShortBy, setShort, isShortBy, short, setClose }) => {
    return (
        <>
            <div className='m_filter_container m_filter shop_page_filter'>
                <div className='title'>
                    Showing {number} Product
                </div>
                <div className='filter'>
                    <div>
                        <p>Sort By</p>
                        <a
                            onClick={() => {
                                setShortBy(true)
                                short === 1 ? setShort(-1) : setShort(1)
                            }}
                        >
                            Price
                            {isShortBy ? <img src={short === 1 ? lowToHigh : highToLow} /> : ""}
                        </a>
                    </div>
                    <img onClick={() => setClose(true)} src={filterIcon} />
                </div>
            </div>
        </>
    )
}

export default MobileFilter