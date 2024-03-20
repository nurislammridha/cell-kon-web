import React from 'react'

const ShortDetails = ({ data }) => {
    return (
        <div className='short_details'>
            <h2>Short Details</h2>
            <div className='txt'>
                {data}
            </div>
            {/* <a className='view_more'>View More</a> */}
        </div>
    )
}

export default ShortDetails