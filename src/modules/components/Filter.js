import React from 'react'
import categoryIcon from '../../assets/images/icons/category.png'
const Filter = () => {
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
                        <li>
                            <input type='radio' />
                            <span>Smartphone</span>
                        </li>
                        <li>
                            <input type='radio' />
                            <span>Smartphone</span>
                        </li>
                        <li>
                            <input type='radio' />
                            <span>Smartphone</span>
                        </li>
                        <li>
                            <input type='radio' />
                            <span>Smartphone</span>
                        </li>
                        <li>
                            <input type='radio' />
                            <span>Smartphone</span>
                        </li>
                    </ul>
                </div>
                <div className='category'>
                    <div className='txt'>
                        Shops
                    </div>
                    <ul>
                        <li>
                            <input type='radio' />
                            <span>Smartphone</span>
                        </li>
                        <li>
                            <input type='radio' />
                            <span>Smartphone</span>
                        </li>
                        <li>
                            <input type='radio' />
                            <span>Smartphone</span>
                        </li>
                        <li>
                            <input type='radio' />
                            <span>Smartphone</span>
                        </li>
                        <li>
                            <input type='radio' />
                            <span>Smartphone</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Filter