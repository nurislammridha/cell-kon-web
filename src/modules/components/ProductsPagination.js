import React from 'react'

const ProductsPagination = () => {
    return (
        <div className='pagination'>
            <div className='item active'>1</div>
            <div className='item'>2</div>
            <div className='item'>3</div>
            <div className='item'>4</div>
            <div className='item dots'>.......</div>
            <div className='item'>25</div>
            <div className='item next'>Next</div>
        </div>
    )
}

export default ProductsPagination