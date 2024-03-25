import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select'
import { getDays, getMonth, getYear } from '../../assets/function/globalFunction';
import { GetUserInput, submitUserInput } from '../_redux/CommonAction';
const UserUpdate = ({ buyerDetails }) => {
    const dispatch = useDispatch()
    const userInput = useSelector((state) => state.homeInfo.userInput);
    const isBuyerUpdateLoading = useSelector((state) => state.homeInfo.isBuyerUpdateLoading);
    const userUpdted = useSelector((state) => state.homeInfo.userUpdted);
    const handleChange = (name, value) => {
        dispatch(GetUserInput(name, value))
    }
    const handleSubmit = () => {
        dispatch(submitUserInput(userInput, userUpdted))
    }
    // console.log('userInput', userInput)
    return (
        <>
            <div className='right ' style={{ paddingBottom: "70px" }}>
                <p className='user_txt'>User Info</p>
                <div className='user_input mt50'>
                    <div className='input_left'>
                        <div>
                            <p className='clr959595 fs16 fm'>Full Name</p>
                            <input
                                className='mt12'
                                type='text'
                                placeholder='enter full name'
                                name='buyerName'
                                value={userInput.buyerName}
                                onChange={(e) => handleChange("buyerName", e.target.value)}
                            />
                        </div>
                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>Email</p>
                            <input
                                className='mt12'
                                type='text'
                                placeholder='enter email'
                                name='buyerEmail'
                                value={userInput.buyerEmail}
                                onChange={(e) => handleChange("buyerEmail", e.target.value)}
                            />
                        </div>
                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>Phone</p>
                            <input
                                className='mt12'
                                type='text'
                                placeholder='enter phone'
                                name='buyerPhone'
                                value={userInput.buyerPhone}
                                onChange={(e) => handleChange("buyerPhone", e.target.value)}
                            />
                        </div>

                    </div>
                    <div className='input_right'>
                        <div className=''>
                            <p className='clr959595 fs16 fm'>Gender</p>
                            <div className='user_select mt12'>
                                <Select
                                    options={[{ label: "Male", value: 1 }, { label: "Female", value: 2 }]}
                                    name="buyerGender"
                                    value={{ label: userInput.buyerGender }}
                                    onChange={(e) => handleChange("buyerGender", e.label)}
                                />
                            </div>
                        </div>
                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>Birth day</p>
                            <div className='birth_select mt12'>
                                <Select
                                    options={getDays()}
                                    name='birthDays'
                                    value={{ label: userInput.birthDays }}
                                    onChange={(e) => handleChange("birthDays", e.label)}
                                />
                                <Select
                                    options={getMonth()}
                                    name='birthMonth'
                                    value={{ label: userInput.birthMonth }}
                                    onChange={(e) => handleChange("birthMonth", e.label)}
                                />
                                <Select
                                    options={getYear()}
                                    name='birthYear'
                                    value={{ label: userInput.birthYear }}
                                    onChange={(e) => handleChange("birthYear", e.label)}
                                />
                            </div>
                        </div>
                        <div
                            className='mt50 save_changes cp'
                            onClick={() => !isBuyerUpdateLoading && handleSubmit()}
                        >
                            <a href>{isBuyerUpdateLoading ? "Save Changing.." : "Save Changes"}</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserUpdate