import React from 'react'
import { useNavigate } from 'react-router-dom'

const MobileCommonHeader = () => {
    const navigate = useNavigate()
    return (
        <div className='details_top'>
            <div
                className='l_arrow'
                onClick={() => navigate(-1)}
            >
                <i class="fas fa-arrow-left"></i>
            </div>
            <div className='share2'>
                <i class="fa fa-share-alt" aria-hidden="true"></i>
            </div>
        </div>
    )
}

export default MobileCommonHeader