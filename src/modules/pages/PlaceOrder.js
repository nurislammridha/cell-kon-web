import React from 'react'
import ordered from '../../assets/images/other/ordered.gif'
import { useNavigate } from 'react-router-dom'
const PlaceOrder = () => {
    const navigate = useNavigate()
    return (<>
        <div className='place'>
            <div className='place-inner'>
                <img src={ordered} />
                <div className='txt'>Ordered Placed successfully!</div>
                <p className='fst'>You'll get a response within a</p>
                <p>few minutes</p>
                <div className='btn' onClick={() => navigate("/")}>
                    Browse Home
                </div>
            </div>

        </div>
    </>)
}

export default PlaceOrder