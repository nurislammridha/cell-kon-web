import React from 'react'
import { useNavigate } from 'react-router-dom'
import searchIcon from '../../assets/images/icons/search.png'
const MobileCommonHeader = ({ isShare = true, isSearch = false, search, setSearch }) => {
    const navigate = useNavigate()
    return (
        <div className='details_top products_search'>
            <div
                className='l_arrow'
                onClick={() => navigate(-1)}
            >
                <i class="fas fa-arrow-left"></i>
            </div>
            {isSearch && (
                <div className='mobile_search'>
                    <img className='mSearch_icon' src={searchIcon} alt='icon' />
                    <input
                        name='search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type='text'
                        placeholder='Search In Sellkon'
                    />
                </div>
            )}

            {isShare ? <div className='share2'>
                <i class="fa fa-share-alt" aria-hidden="true"></i>
            </div> : <div className='share2' style={{ visibility: "hidden" }}></div>}

        </div>
    )
}

export default MobileCommonHeader