import React, { useState } from 'react'
import en from '../../assets/images/icons/English.png'
import bn from '../../assets/images/icons/Bangla.png'
import TermsEnglish from '../components/TermsEnglish'
import TermsBangla from '../components/TermsBangla'
const TermsAndConditions = () => {
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
                {lan === 'en' ? <TermsEnglish /> : <TermsBangla />}
            </div>
        </div>
    )
}

export default TermsAndConditions