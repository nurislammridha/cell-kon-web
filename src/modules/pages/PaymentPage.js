import React from 'react'
import PaymentOrderSummery from '../components/PaymentOrderSummery'
import PaymentMethod from '../components/PaymentMethod'
import SavedAccounts from '../components/SavedAccounts'
import RecomendedMethods from '../components/RecomendedMethods'

const PaymentPage = () => {
    return (
        <>
            <div className='cart_page payment_page'>
                <div>
                    recommended method
                    <RecomendedMethods />
                    {/* saved account */}
                    <SavedAccounts />
                    {/* payment method */}
                    <PaymentMethod />
                </div>
                {/* //payment order summery */}
                <PaymentOrderSummery />
            </div>
        </>
    )
}

export default PaymentPage