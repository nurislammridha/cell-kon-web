import { Markup } from 'interweave'
import React from 'react'

const FullDetails = ({ data, videoUrl = [] }) => {
    const videoList = Array.isArray(videoUrl)
        ? videoUrl
            .map((item) => {
                if (typeof item === 'string') {
                    return item.trim();
                }
                if (item && typeof item === 'object') {
                    return typeof item.url === 'string' ? item.url.trim() : '';
                }
                return '';
            })
            .filter(Boolean)
        : (typeof videoUrl === 'string' && videoUrl.trim().length > 0 ? [videoUrl] : []);

    return (
        <div className='full_details'>
            <h2>Product Details</h2>
            <div className='txt'>
                {videoList.length > 0 &&
                    <div className='video_container'>
                        {videoList.map((item, index) => (

                            <div key={index} className='video_item'> <iframe src={item} title={`product-video-${index + 1}`}></iframe></div>

                        )

                        )}
                    </div>}
                <Markup content={typeof data === 'string' ? data : ''} />
            </div>
        </div>
    )
}

export default FullDetails