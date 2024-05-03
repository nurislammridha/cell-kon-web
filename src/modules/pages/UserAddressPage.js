import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { GetBuyerDetailsByBuyerId } from '../_redux/CommonAction'
import MobileCommonHeader from '../components/MobileCommonHeader'

const UserAddressPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();
    const buyerDetails = useSelector((state) => state.homeInfo.buyerDetails);
    const { addressInfo } = buyerDetails || { addressInfo: [] }
    // console.log('buyerDetails', buyerDetails)
    useEffect(() => {
        dispatch(GetBuyerDetailsByBuyerId())
    }, [])


    return (<>
        {/* <div className='muser_inf0'>
            <MobileCommonHeader />
        </div> */}
        <div className='address_list_container'>
            <div className='address_list'>
                <div className='add'>
                    <p>Delivery Address</p>
                    <a href
                        className='cp'
                        onClick={() => navigate('/add-address', { state: { isFromCheckout: location?.state?.isFromChackout, selected: location?.state?.selected } })}
                    >Add Address</a>
                </div>
                {addressInfo?.length > 0 && addressInfo.map((item, index) => (
                    <div
                        key={index}
                        className={location?.state?.isFromChackout ? 'cp address_item' : 'address_item'}
                        onClick={() => location?.state?.isFromChackout ? navigate('/checkout', { state: { isFromAddress: true, data: item, selected: location?.state?.selected } }) : {}}
                    >
                        <div className='title'>
                            <p>{item?.buyerName}</p>
                            {!location?.state?.isFromChackout && <a onClick={() => navigate(`/edit-address/${item._id}`)}><i class="fas fa-edit"></i></a>}
                        </div>
                        <div className='phone mt8'>{item?.buyerPhone}</div>
                        <div className='phone mt16'>{item?.detailsAddress}</div>
                        <div className='phone mt3'>{`${item?.division}-${item?.district}-${item?.upazilla}-${item?.union}`}</div>
                    </div>
                ))}
            </div>
        </div>
    </>)
}

export default UserAddressPage