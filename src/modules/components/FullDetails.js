import { Markup } from 'interweave'
import React, { useEffect, useState } from 'react'

const FullDetails = ({ data, videoUrl = [] }) => {
    const showVideo = (x = "") => {
        const txt = x

        let video = false
        if (txt.includes("<iframe")) {
            let start = txt.indexOf(`height="auto" src="`) + 19
            let end = txt.indexOf(`.mp4"`) + 4
            video = txt.substring(start, end)
        }
        return video
    }
    console.log('videoUrl', videoUrl)
    return (
        <div className='full_details'>
            <h2>Details</h2>
            <div className='txt'>
                <div className='video_container'>
                    {videoUrl?.length > 0 && videoUrl.map((item, index) => (

                        <div key={index} className='video_item'> <iframe src={item}></iframe></div>

                    )

                    )}
                </div>
                <Markup content={data} />
            </div>
        </div>
    )
}

export default FullDetails