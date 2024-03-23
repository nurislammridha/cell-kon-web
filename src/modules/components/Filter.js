import React from 'react'
import categoryIcon from '../../assets/images/icons/category.png'
const Filter = ({ categoriesList, sellersList, handleSelect, categoriesId, sellersId }) => {
    return (
        <div>
            <div className='filter_left'>
                <div className='filter'>
                    <img src={categoryIcon} />
                    <span>Filter</span>
                </div>
                <div className='category'>
                    <div className='txt'>
                        Category
                    </div>
                    <ul>
                        {categoriesList?.length > 0 && categoriesList.map((item, index) => (
                            <li>
                                <input
                                    type='radio'
                                    checked={categoriesId.find(v => v === item?._id)}
                                    onChange={() => handleSelect(true, item?._id)}
                                />
                                <span>{item?.categoryName}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='category'>
                    <div className='txt'>
                        Shops
                    </div>
                    <ul>
                        {sellersList?.length > 0 && sellersList.map((item, index) => (
                            <li>
                                <input
                                    type='radio'
                                    checked={sellersId.find(v => v === item?._id)}
                                    onChange={() => handleSelect(false, item?._id)}
                                />
                                <span>{item?.shopName}</span>
                            </li>
                        ))}

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Filter