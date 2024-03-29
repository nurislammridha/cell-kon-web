import React from 'react'
import Select from 'react-select'
const Order = ({ count, setShortBy, setShort, shortName, setShortName, categoryName = "" }) => {
    return (
        <div className='order_section'>
            <div className='showing'>Showing {count} Product</div>
            {categoryName?.length > 0 && <div className='showing' >{categoryName}</div>}
            <div className='select'>
                <div className='sort'>Short By</div>
                <div className='price'>
                    <Select
                        options={[{ label: "LOW TO HIGH", value: 1 }, { label: "HIGH TO LOW", value: -1 }]}
                        name="price_sort"
                        value={{ label: shortName }}
                        onChange={(e) => {
                            setShortBy(true)
                            setShortName(e.label)
                            setShort(e.value)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Order