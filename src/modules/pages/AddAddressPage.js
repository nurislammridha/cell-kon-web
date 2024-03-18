import React from 'react'
import Select from 'react-select'
import userLogo from "../../assets/images/icons/userIcon.png"
import userIcon from "../../assets/images/icons/user.png"
import orderIcon from "../../assets/images/icons/order.png"
import addressIcon from "../../assets/images/icons/address.png"
import wishIcon from "../../assets/images/icons/wishg.png"
function AddAddressPage() {
    return (
        <div className='user_info add_address'>
            <div className='right'>
                <p className='user_txt'>Add Delivery Address</p>
                <div className='user_input mt32'>
                    <div className='input_left'>
                        <div>
                            <p className='clr959595 fs16 fm'>Full Name</p>
                            <input
                                className='mt12'
                                type='text'
                                placeholder='enter full name'
                                name='full_name'
                                value={""}
                            />
                        </div>
                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>Phone Number</p>
                            <input
                                className='mt12'
                                type='text'
                                placeholder='enter phone number'
                                name='full_name'
                                value={""}
                            />
                        </div>
                        <div className='radio_btn mt24'>
                            <div>
                                <input className='radio' type='radio' />
                                <span>Metropolitan City</span>
                            </div>
                            <div>
                                <input className='radio' type='radio' />
                                <span>Metropolitan City</span>
                            </div>
                        </div>
                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>Division</p>
                            <div className='user_select mt12'>
                                <Select
                                    options={[{ label: "Male", value: 1 }, { label: "Female", value: 1 }]}
                                    name=''
                                    value={""}
                                />
                            </div>
                        </div>

                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>District</p>
                            <div className='user_select mt12'>
                                <Select
                                    options={[{ label: "Male", value: 1 }, { label: "Female", value: 1 }]}
                                    name=''
                                    value={""}
                                />
                            </div>
                        </div>
                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>Sub District (Upazila)</p>
                            <div className='user_select mt12'>
                                <Select
                                    options={[{ label: "Male", value: 1 }, { label: "Female", value: 1 }]}
                                    name=''
                                    value={""}
                                />
                            </div>
                        </div>

                    </div>
                    <div className='input_right'>
                        <div>
                            <p className='clr959595 fs16 fm'>Area (Nearest area)</p>
                            <div className='user_select mt12'>
                                <Select
                                    options={[{ label: "Male", value: 1 }, { label: "Female", value: 1 }]}
                                    name=''
                                    value={""}
                                />
                            </div>
                        </div>
                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>House/Holding?Plot, Road/Para, Block/Avenue</p>
                            <input
                                className='mt12'
                                type='text'
                                placeholder='enter new password'
                                name='full_name'
                                value={""}
                            />
                        </div>
                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>Postal Code</p>
                            <input
                                className='mt12'
                                type='text'
                                placeholder='enter confirm password'
                                name='full_name'
                                value={""}
                            />
                        </div>
                        <div className='mt40 save_changes cp'>
                            <a href>Submit</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAddressPage