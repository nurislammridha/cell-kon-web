import React from 'react'
import categoryIcon from '../../assets/images/icons/filter.png'
const Filter = ({ categoriesList, brandsList, handleSelect, categoriesId, brandsId, hideShop = false, hideCategory = false, isClose, setClose }) => {
    return (
        <div>
            <div className={isClose ? 'filter_left filter_visible' : 'filter_left'}>
                <div className='filter'>
                    <div className='filter_in'>
                        <img src={categoryIcon} />
                        <div>Filter</div>
                    </div>
                    <a
                        className='filter_close'
                        onClick={() => setClose(false)}
                    >
                        Close
                    </a>
                </div>
                {!hideCategory && (
                    <div className='category'>
                        <div className='txt'>
                            Categories
                        </div>
                        <ul>
                            {categoriesList?.length > 0 && categoriesList.map((item, index) => (
                                <li>
                                    <input
                                        type='radio'
                                        checked={categoriesId.find(v => v === item?._id)}
                                        onChange={() => handleSelect(true, item?._id)}
                                    />
                                    <span>{item?.categoryName.trim()}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {!hideShop && (
                    <div className='category category_line'>
                        <div className='txt'>
                            Brands
                        </div>
                        <ul>
                            {brandsList?.length > 0 && brandsList.map((item, index) => (
                                <li>
                                    <input
                                        type='radio'
                                        checked={brandsId.find(v => v === item?._id)}
                                        onChange={() => handleSelect(false, item?._id)}
                                    />
                                    <span>{item?.brandName}</span>
                                </li>
                            ))}

                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Filter