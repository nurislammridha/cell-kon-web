import { Markup } from 'interweave'
import React from 'react'

const FullDetails = ({ data }) => {
    return (
        <div className='full_details'>
            <h2>Full Details</h2>
            <div className='txt'>
                <Markup content={data} />
            </div>
        </div>
    )
}

export default FullDetails