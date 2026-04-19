import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useNavigate, useParams } from 'react-router-dom'
import { locationOption, nearestAreaOption } from '../../assets/function/globalFunction'
import { useDispatch, useSelector } from 'react-redux'
import { FalseUpdateAddress, GetUpdateAddressInput, SetAddressUpdateInput, UpdateBuyerAddress } from '../_redux/CommonAction'
import { getDistricts, getDivisions, getNearestAreas, getUpazillas } from '../../services/locationService'

const hideSelectKeyboard = () => {
    if (typeof document === 'undefined') {
        return;
    }

    const activeElement = document.activeElement;
    if (activeElement && typeof activeElement.blur === 'function') {
        activeElement.blur();
    }
}

const addressSelectCommonProps = {
    isSearchable: false,
    classNamePrefix: 'address-select',
    openMenuOnFocus: false,
    blurInputOnSelect: true,
    onMenuOpen: hideSelectKeyboard,
    onMenuClose: hideSelectKeyboard,
    components: {
        IndicatorSeparator: () => null,
    },
}

function EditAddressPage() {
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const addressInput = useSelector((state) => state.homeInfo.updateAddressInput);
    const isAddressLoading = useSelector((state) => state.homeInfo.isUpdateAddressLoading);
    const isAddressUpdated = useSelector((state) => state.homeInfo.isAddressUpdated);
    const [divisions, setDivisions] = useState([])
    const [districts, setDistricts] = useState([])
    const [upazillas, setUpazillas] = useState([])
    const [nearest, setNearest] = useState([])
    const handleChange = (name, value) => {
        dispatch(GetUpdateAddressInput(name, value))
    }
    const handleSubmit = () => {
        dispatch(UpdateBuyerAddress(addressInput, id))
    }
    useEffect(() => {
        let isMounted = true
        getDivisions()
            .then((result) => {
                if (isMounted) {
                    setDivisions(locationOption(result))
                }
            })
            .catch(() => {
                if (isMounted) {
                    setDivisions([])
                }
            })

        return () => {
            isMounted = false
        }
    }, [])

    useEffect(() => {
        if (!(addressInput.division?.length > 0 && addressInput.divisionId)) {
            setDistricts([])
            return
        }

        let isMounted = true
        getDistricts(addressInput.divisionId)
            .then((result) => {
                if (isMounted) {
                    setDistricts(locationOption(result))
                }
            })
            .catch(() => {
                if (isMounted) {
                    setDistricts([])
                }
            })

        return () => {
            isMounted = false
        }
    }, [addressInput.division, addressInput.divisionId])

    useEffect(() => {
        if (!(addressInput.district?.length > 0 && addressInput.districtId)) {
            setUpazillas([])
            return
        }

        let isMounted = true
        getUpazillas(addressInput.districtId)
            .then((result) => {
                if (isMounted) {
                    setUpazillas(locationOption(result))
                }
            })
            .catch(() => {
                if (isMounted) {
                    setUpazillas([])
                }
            })

        return () => {
            isMounted = false
        }
    }, [addressInput.district, addressInput.districtId])

    useEffect(() => {
        if (!(addressInput.upazilla?.length > 0 && addressInput.upazillaId)) {
            setNearest([])
            return
        }

        let isMounted = true
        getNearestAreas(addressInput.upazillaId)
            .then((result) => {
                if (isMounted) {
                    setNearest(nearestAreaOption(result))
                }
            })
            .catch(() => {
                if (isMounted) {
                    setNearest([])
                }
            })

        return () => {
            isMounted = false
        }
    }, [addressInput.upazilla, addressInput.upazillaId])
    useEffect(() => {
        dispatch(SetAddressUpdateInput(id))
    }, [id])
    useEffect(() => {
        if (isAddressUpdated) {
            navigate('/user-address')
            dispatch(FalseUpdateAddress())
        }

    }, [isAddressUpdated])

    return (<div className='madd_address'>
        {/* <div className='muser_inf0'>
            <MobileCommonHeader />
        </div> */}
        <div className='user_info add_address'>
            <div className='right'>
                <p className='user_txt'>Edit Delivery Address</p>
                <div className='user_input mt32'>
                    <div className='input_left'>
                        <div>
                            <p className='clr959595 fs16 fm'>Full Name<span>*</span></p>
                            <input
                                className='mt6'
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
                                className='mt6'
                                type='text'
                                placeholder='enter phone number'
                                name='phone_number'
                                value={addressInput.buyerPhone}
                                onChange={(e) => handleChange("buyerPhone", e.target.value)}
                            />
                        </div>
                        {/* <div className='radio_btn mt24'>
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
                        </div> */}
                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>Division<span>*</span></p>
                            <div className='user_select mt6'>
                                <Select
                                    {...addressSelectCommonProps}
                                    options={divisions}
                                    name='division'
                                    value={{ label: addressInput.division }}
                                    onChange={(e) => {
                                        handleChange("division", e.label)
                                        handleChange("divisionId", e.value)
                                        handleChange("district", "")
                                        handleChange("upazilla", "")
                                        handleChange("nearestArea", "")
                                        handleChange("nearestAreaId", "")
                                        handleChange("union", "")
                                        handleChange("unionId", "")
                                    }}
                                />
                            </div>
                        </div>

                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>District<span>*</span></p>
                            <div className='user_select mt6'>
                                <Select
                                    {...addressSelectCommonProps}
                                    options={districts}
                                    // options={[]}
                                    name='district'
                                    value={{ label: addressInput.district }}
                                    onChange={(e) => {
                                        handleChange("district", e.label)
                                        handleChange("districtId", e.value)
                                        handleChange("upazilla", "")
                                        handleChange("nearestArea", "")
                                        handleChange("nearestAreaId", "")
                                        handleChange("union", "")
                                        handleChange("unionId", "")
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                    <div className='input_right'>
                        <div className='mmt24'>
                            <p className='clr959595 fs16 fm'>Sub District (Upazila)<span>*</span></p>
                            <div className='user_select mt6'>
                                <Select
                                    {...addressSelectCommonProps}
                                    options={upazillas}
                                    name='upazilla'
                                    value={{ label: addressInput.upazilla }}
                                    onChange={(e) => {
                                        handleChange("upazilla", e.label)
                                        handleChange("upazillaId", e.value)
                                        handleChange("nearestArea", "")
                                        handleChange("nearestAreaId", "")
                                        handleChange("union", "")
                                        handleChange("unionId", "")
                                    }}
                                />
                            </div>
                        </div>

                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>Area (Nearest area)</p>
                            <div className='user_select mt6'>
                                <Select
                                    {...addressSelectCommonProps}
                                    options={nearest}
                                    name='nearest_area'
                                    value={{ label: addressInput.nearestArea }}
                                    onChange={(e) => {
                                        handleChange("nearestArea", e.label)
                                        handleChange("nearestAreaId", e.value)
                                    }}
                                />
                            </div>
                        </div>

                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>House/Holding, Plot, Road/Para, Block/Avenue<span>*</span></p>
                            <textarea
                                className='mt6'
                                placeholder='house/holding, plot, road/para, block/Avenue'
                                name='details_address'
                                value={addressInput.detailsAddress}
                                onChange={(e) => {
                                    handleChange("detailsAddress", e.target.value)
                                }}
                            />
                        </div>
                        <div
                            className='mt50 save_changes cp'
                            onClick={() => isAddressLoading ? {} : handleSubmit()}
                        // onClick={() => navigate('/user-address')}
                        >
                            <a href>{isAddressLoading ? "Updating" : "Update"}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default EditAddressPage