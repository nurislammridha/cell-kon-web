import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import userLogo from "../../assets/images/icons/userIcon.png"
import userIcon from "../../assets/images/icons/user.png"
import orderIcon from "../../assets/images/icons/order.png"
import addressIcon from "../../assets/images/icons/address.png"
import wishIcon from "../../assets/images/icons/wishg.png"
import { useNavigate } from 'react-router-dom'
import { district, division, union, upazilla } from '../../assets/function/locationService'
import { locationOption } from '../../assets/function/globalFunction'
import { useDispatch, useSelector } from 'react-redux'
import { GetAddressInput, SubmitBuyerAddress } from '../_redux/CommonAction'
function AddAddressPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const addressInput = useSelector((state) => state.homeInfo.addressInput);
    const isAddressLoading = useSelector((state) => state.homeInfo.isAddressLoading);
    const [districts, setDistricts] = useState([])
    const [upazillas, setUpazillas] = useState([])
    const [unions, setUnions] = useState([])
    const handleChange = (name, value) => {
        dispatch(GetAddressInput(name, value))
    }
    const handleSubmit = () => {
        dispatch(SubmitBuyerAddress(addressInput))
    }
    useEffect(() => {
        if (addressInput.division.length > 0) {
            setDistricts(locationOption(district(addressInput.divisionId)))
        }
        if (addressInput.district.length > 0) {
            setUpazillas(locationOption(upazilla(addressInput.districtId)))
        }
        if (addressInput.upazilla.length > 0) {
            setUnions(locationOption(union(addressInput.upazillaId)))
        }

    }, [addressInput])

    return (
        <div className='user_info add_address'>
            <div className='right'>
                <p className='user_txt'>Add Delivery Address</p>
                <div className='user_input mt32'>
                    <div className='input_left'>
                        <div>
                            <p className='clr959595 fs16 fm'>Full Name<span>*</span></p>
                            <input
                                className='mt12'
                                type='text'
                                placeholder='enter full name'
                                name='full_name'
                                value={addressInput.buyerName}
                                onChange={(e) => handleChange("buyerName", e.target.value)}
                            />
                        </div>
                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>Phone Number<span>*</span></p>
                            <input
                                className='mt12'
                                type='text'
                                placeholder='enter phone number'
                                name='phone_number'
                                value={addressInput.buyerPhone}
                                onChange={(e) => handleChange("buyerPhone", e.target.value)}
                            />
                        </div>
                        <div className='radio_btn mt24'>
                            <div>
                                <input
                                    className='radio'
                                    type='radio'
                                    name='radio_btn'
                                    checked={addressInput.isMetropolitan}
                                    onChange={() => handleChange("isMetropolitan", true)}
                                />
                                <span>Metropolitan City</span>
                            </div>
                            <div>
                                <input
                                    className='radio'
                                    type='radio'
                                    name='radio_btn'
                                    checked={!addressInput.isMetropolitan}
                                    onChange={() => handleChange("isMetropolitan", false)}
                                />
                                <span>Outside City</span>
                            </div>
                        </div>
                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>Division<span>*</span></p>
                            <div className='user_select mt12'>
                                <Select
                                    options={locationOption(division())}
                                    name='division'
                                    value={{ label: addressInput.division }}
                                    onChange={(e) => {
                                        handleChange("division", e.label)
                                        handleChange("divisionId", e.value)
                                        handleChange("district", "")
                                        handleChange("upazilla", "")
                                        handleChange("union", "")
                                    }}
                                />
                            </div>
                        </div>

                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>District<span>*</span></p>
                            <div className='user_select mt12'>
                                <Select
                                    options={districts}
                                    // options={[]}
                                    name='district'
                                    value={{ label: addressInput.district }}
                                    onChange={(e) => {
                                        handleChange("district", e.label)
                                        handleChange("districtId", e.value)
                                        handleChange("upazilla", "")
                                        handleChange("union", "")
                                    }}
                                />
                            </div>
                        </div>


                    </div>
                    <div className='input_right'>
                        <div className=''>
                            <p className='clr959595 fs16 fm'>Sub District (Upazila)<span>*</span></p>
                            <div className='user_select mt12'>
                                <Select
                                    options={upazillas}
                                    name='upazilla'
                                    value={{ label: addressInput.upazilla }}
                                    onChange={(e) => {
                                        handleChange("upazilla", e.label)
                                        handleChange("upazillaId", e.value)
                                        handleChange("union", "")
                                    }}
                                />
                            </div>
                        </div>
                        {!addressInput.isMetropolitan && (
                            <div className='mt24'>
                                <p className='clr959595 fs16 fm'>Union<span>*</span></p>
                                <div className='user_select mt12'>
                                    <Select
                                        options={unions}
                                        name='union'
                                        value={{ label: addressInput.union }}
                                        onChange={(e) => {
                                            handleChange("union", e.label)
                                            handleChange("unionId", e.value)
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                        {/* <div className='mt24'>
                            <p className='clr959595 fs16 fm'>Area (Nearest area)</p>
                            <div className='user_select mt12'>
                                <Select
                                    options={[{ label: "Male", value: 1 }, { label: "Female", value: 1 }]}
                                    name='nearest_area'
                                    value={{ label: addressInput.nearestArea }}
                                    onChange={(e) => {
                                        handleChange("nearestArea", e.label)
                                        handleChange("nearestAreaId", e.value)
                                    }}
                                />
                            </div>
                        </div> */}
                        {/* <div>
                            <p className='clr959595 fs16 fm'>Nearest Area<span>*</span></p>
                            <input
                                className='mt12'
                                type='text'
                                placeholder='enter nearest area'
                                name='enter nearest area'
                                value={addressInput.nearestArea}
                                onChange={(e) => {
                                    handleChange("nearestArea", e.target.value)
                                }}
                            />
                        </div> */}
                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>House/Holding?Plot, Road/Para, Block/Avenue<span>*</span></p>
                            <input
                                className='mt12'
                                type='text'
                                placeholder='house/holding, plot, road/para, block/Avenue'
                                name='details_address'
                                value={addressInput.detailsAddress}
                                onChange={(e) => {
                                    handleChange("detailsAddress", e.target.value)
                                }}
                            />
                        </div>
                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>Postal Code</p>
                            <input
                                className='mt12'
                                type='text'
                                placeholder='enter postal code'
                                name='postal_code'
                                value={addressInput.postalCode}
                                onChange={(e) => handleChange("postalCode", e.target.value)}
                            />
                        </div>
                        <div
                            className='mt40 save_changes cp'
                            onClick={() => isAddressLoading ? {} : handleSubmit()}
                        // onClick={() => navigate('/user-address')}
                        >
                            <a href>{isAddressLoading ? "Adding" : "Submit"}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAddressPage