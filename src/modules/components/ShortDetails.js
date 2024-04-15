import React from 'react'

const ShortDetails = ({ data }) => {
    return (
        <div className='short_details'>
            <h2>Descriptions</h2>
            <div className='txt'>
                <pre>
                    {data}
                </pre>
            </div>
            {/* <a className='view_more'>View More</a> */}
        </div>
    )
}

export default ShortDetails