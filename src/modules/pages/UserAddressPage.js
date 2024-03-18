import React from 'react'

const UserAddressPage = () => {
    return (
        <div className='address_list_container'>
            <div className='address_list'>
                <div className='add'>
                    <p>Delivery Address</p>
                    <a href>Add Address</a>
                </div>
                {[1, 2, 3].map((item) => (
                    <div className='address_item'>
                        <div className='title'>
                            <p>SellKon.com</p>
                            <a><i class="fas fa-edit"></i></a>
                        </div>
                        <div className='phone mt8'>01785434344</div>
                        <div className='phone mt16'>Plot 1757, Road 3, BLog A</div>
                        <div className='phone mt3'>Dhaka- Dhaka- Kerniganj - Bashundhara</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserAddressPage