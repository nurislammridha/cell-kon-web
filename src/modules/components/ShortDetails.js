import React from 'react'

const ShortDetails = ({ data }) => {
    const descriptionText = typeof data === 'string'
        ? data
        : Array.isArray(data)
            ? data.filter(Boolean).join('\n')
            : data
                ? JSON.stringify(data, null, 2)
                : '';

    return (
        <div className='short_details'>
            <h2>Descriptions</h2>
            <div className='txt'>
                <pre>
                    {descriptionText}
                </pre>
            </div>
            {/* <a className='view_more'>View More</a> */}
        </div>
    )
}

export default ShortDetails