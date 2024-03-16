import React from 'react'
import visa from '../../assets/images/icons/visa.png'
import aeIcon from '../../assets/images/icons/american_express.png'
import cardIcon from '../../assets/images/icons/card.png'
import moneyIcon from '../../assets/images/icons/money.png'
const RecomendedMethods = () => {
    return (
        <>
            <div className='pay_title'>Recommended Method(s)</div>
            <div className='payment_section'>
                <div className='cr_de'>
                    <img src={cardIcon} />
                    <span className='pb_txt'>Credit/Debit Card</span>
                </div>
                <div className='bank_icon'>
                    <img src={aeIcon} />
                    <img src={moneyIcon} />
                    <img src={visa} />
                </div>
                <i class='fas fa-chevron-right'></i>
            </div>
        </>
    )
}

export default RecomendedMethods