import React from 'react'
import AddNewCard from '../components/AddNewCard'
import AddCardOrderSummery from '../components/AddCardOrderSummery'

const AddCardPage = () => {
    return (
        <>
            <div className='cart_page add_card'>
                <AddNewCard />
                <AddCardOrderSummery />
            </div>
        </>
    )
}

export default AddCardPage