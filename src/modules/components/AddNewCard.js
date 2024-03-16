import React from 'react'
import visa from '../../assets/images/icons/visa.png'
import aeIcon from '../../assets/images/icons/american_express.png'
import moneyIcon from '../../assets/images/icons/money.png'


const AddNewCard = () => {
    return (
        <div>
            <div className='pay_title'>Add a New Card</div>
            <div className='card_section'>
                <div className='bank_icon card_icon'>
                    <img src={aeIcon} />
                    <img src={moneyIcon} />
                    <img src={visa} />
                </div>
                <input
                    className='card_field card_name'
                    type='text'
                    name=''
                    placeholder='enter card name'
                />
                <input
                    className='card_field card_number'
                    type='text'
                    placeholder='enter card number'
                    name=''
                />
                <div className='mm_cvv'>
                    <input
                        className='card_field mm'
                        type='text'
                        name=''
                        placeholder='MM/DD'
                    />
                    <input
                        className='card_field cvv'
                        type='text'
                        name=''
                        placeholder='enter cvv'
                    />
                </div>
            </div>

        </div>
    )
}

export default AddNewCard