import React from 'react'
import bKashIcon from '../../assets/images/icons/bKash.png'

const SavedAccounts = () => {
    return (<>
        <div className='pay_title'>Saved Account(s)</div>
        <div className='saved_accounts'>
            {/* {[1, 2, 3].map((item) => (
                <div className='item'>
                    <div className='saved_item'>
                        <img src={bKashIcon} />
                        <div >
                            <div className='pg_14'>Sellkon</div>
                            <div className='pg_18 mt12'>XXX XXX 3450</div>
                        </div>
                    </div>
                    <div className='radio'>
                        <input type='radio' />
                    </div>
                </div>
            ))} */}
            <div className='item pg_14'>
                No account(s) are saved.
            </div>
        </div>
    </>)
}

export default SavedAccounts