import React, { useEffect, useState } from 'react'
import en from '../../assets/images/icons/English.png'
import bn from '../../assets/images/icons/Bangla.png'
import { useLocation, useNavigate } from 'react-router-dom'
import PrivacyPolicyEnglish from '../components/PrivacyPolicyEnglish'
import PrivacyPolicyBangla from '../components/PrivacyPolicyBangla'
const PrivacyPolicyPage = () => {
    const { pathname } = useLocation();
    const [lan, setLan] = useState('bn')
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
                {lan === 'en' ? <PrivacyPolicyEnglish /> : <PrivacyPolicyBangla />}
            </div>
        </div>
    </>)
}

export default PrivacyPolicyPage