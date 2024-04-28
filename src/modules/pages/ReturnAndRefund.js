import React, { useState } from 'react'
import en from '../../assets/images/icons/English.png'
import bn from '../../assets/images/icons/Bangla.png'
import TermsEnglish from '../components/TermsEnglish'
import TermsBangla from '../components/TermsBangla'
import ReturnRefundEnglish from '../components/ReturnRefundEnglish'
import ReturnRefundBangla from '../components/ReturnRefundBangla'
import { useNavigate } from 'react-router-dom'
const ReturnAndRefund = () => {
    const navigate = useNavigate()
    const [lan, setLan] = useState('en')
    return (<>
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
    </>)
}

export default ReturnAndRefund