import React, { useEffect, useState } from 'react'
import en from '../../assets/images/icons/English.png'
import bn from '../../assets/images/icons/Bangla.png'
import TermsEnglish from '../components/TermsEnglish'
import TermsBangla from '../components/TermsBangla'
import { useLocation, useNavigate } from 'react-router-dom'
const TermsAndConditions = () => {
    const { pathname } = useLocation();
    const [lan, setLan] = useState('en')
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
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
                {lan === 'en' ? <TermsEnglish /> : <TermsBangla />}
            </div>
        </div>
    </>)
}

export default TermsAndConditions