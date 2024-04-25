import React, { useState } from 'react'
import en from '../../assets/images/icons/English.png'
import bn from '../../assets/images/icons/Bangla.png'
import TermsEnglish from '../components/TermsEnglish'
import TermsBangla from '../components/TermsBangla'
import ReturnRefundEnglish from '../components/ReturnRefundEnglish'
import ReturnRefundBangla from '../components/ReturnRefundBangla'
const ReturnAndRefund = () => {
    const [lan, setLan] = useState('en')
    return (
        <div className='terms_conditions'>
            <div className='container'>
                <div className='lan_btn cp'>
                    <a onClick={() => setLan(lan === "en" ? "bn" : "en")}>
                        <img src={lan === 'en' ? bn : en} />
                        <span>{lan === 'en' ? "বাংলা" : 'English'}</span>
                    </a>
                </div>
                {lan === "en" ? <ReturnRefundEnglish /> : <ReturnRefundBangla />}
            </div>
        </div>
    )
}

export default ReturnAndRefund