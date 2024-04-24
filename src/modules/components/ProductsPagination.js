import React from 'react'

const ProductsPagination = ({ pagination, handlePagination }) => {
    const { currentPage, nextPage, previousPage, totalPage } = pagination || {}
    return (
        <div className='pagination'>
            {previousPage !== null && (<div onClick={() => handlePagination(previousPage)} className='item next'>Pre</div>)}
            {(currentPage - 2) > 0 && (<div
                onClick={() => handlePagination(currentPage - 2)}
                class="item">{currentPage - 2}
            </div>)}
            {(currentPage - 1) > 0 && (<div
                onClick={() => handlePagination(currentPage - 1)}
                class="item">{currentPage - 1}
            </div>)}
            {totalPage !== currentPage && (<div
                //  onClick={() => handlePagination(currentPage)}
                class={totalPage !== currentPage ? "item active" : "item"}>{currentPage}
            </div>)}
            {(currentPage + 1) <= 3 && totalPage > 2 && (<div
                onClick={() => handlePagination(currentPage + 1)}
                class="item">{currentPage + 1}
            </div>)}
            {(currentPage + 2) == 3 && totalPage > 2 && (<div
                onClick={() => handlePagination(currentPage + 1)}
                class="item">{currentPage + 2}
            </div>)}
            {(totalPage - currentPage) > 1 && (<div className='item dots'>.......</div>)}
            <div
                onClick={() => handlePagination(totalPage)}
                class={totalPage === currentPage ? "item active" : "item"}>{totalPage}</div>
            {nextPage !== null && (<div
                onClick={() => handlePagination(nextPage)}
                class="item next">Next
            </div>)}
        </div>
    )
}

export default ProductsPagination