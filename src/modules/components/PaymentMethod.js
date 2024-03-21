import React from 'react'

import nexusIcon from '../../assets/images/icons/nexus.png'
import rocketIcon from '../../assets/images/icons/rocket.png'
import codIcon from '../../assets/images/icons/cod.png'
import { useNavigate } from 'react-router-dom'
const PaymentMethod = () => {
    const navigate = useNavigate()
    return (<>
        <div className='pay_title'>Payment Method(s)</div>
        <div className='saved_accounts'>
            <div className='item'>
                <div className='saved_item'>
                    <img src={rocketIcon} />
                    <div>
                        <span className='pb_txt'>Rocket</span>
                    </div>
                </div>
                <i class='fas fa-chevron-right'></i>
            </div>
            <div className='item'>
                <div className='saved_item'>
                    <img src={nexusIcon} />
                    <div>
                        <span className='pb_txt'>DBBL NEXUS CARD</span>
                    </div>
                </div>
                <i class='fas fa-chevron-right'></i>
            </div>
            <div className='cp item' onClick={() => navigate("/")}>
                <div className='saved_item'>
                    <img src={codIcon} />
                    <div>
                        <span className='pb_txt'>Cash On Delivery</span>
                    </div>
                </div>
                <div>
                    <i class='fas fa-chevron-right'></i>
                </div>
            </div>
        </div>
    </>)
}

export default PaymentMethod