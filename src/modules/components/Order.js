import React from 'react'
import Select from 'react-select'
const Order = () => {
    return (
        <div className='order_section'>
            <div className='showing'>Showing 250 Product</div>
            <div className='select'>
                <div className='sort'>Short By</div>
                <div className='price'>
                    <Select
                        options={[{ label: "hi", value: 1 }, { label: "hqw", value: 2 }]}
                        name="price"
                        value={{ label: "hi" }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Order