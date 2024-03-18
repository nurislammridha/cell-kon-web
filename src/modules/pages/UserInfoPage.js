import React from 'react'
import Select from 'react-select'
import userLogo from "../../assets/images/icons/userIcon.png"
import userIcon from "../../assets/images/icons/user.png"
import orderIcon from "../../assets/images/icons/order.png"
import addressIcon from "../../assets/images/icons/address.png"
import wishIcon from "../../assets/images/icons/wishg.png"
function UserInfoPage() {
    return (
        <div className='user_info'>
            <div className='left'>
                <div className='img_container'>
                    <div className='img'>
                        <img src={userLogo} alt='user' />
                        <a href><i class="fas fa-edit"></i></a>
                    </div>
                </div>
                <div className='menu_container'>
                    <div className='menu'>
                        <img src={userIcon} alt='user icon' />
                        <p>User Info</p>
                    </div>
                    <div className='menu mt32'>
                        <img src={orderIcon} alt='user icon' />
                        <p>Order</p>
                    </div>
                    <div className='menu mt32'>
                        <img src={addressIcon} alt='user icon' />
                        <p>Address</p>
                    </div>
                    <div className='menu mt32'>
                        <img src={wishIcon} alt='user icon' />
                        <p>Wishlist</p>
                    </div>
                </div>
                <div className='logout'>
                    <img src={userIcon} alt='user icon' />
                    <p>Logout</p>
                </div>
            </div>
            <div className='right'>
                <p className='user_txt'>User Info</p>
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
                            <p className='clr959595 fs16 fm'>Email</p>
                            <input
                                className='mt12'
                                type='text'
                                placeholder='enter email'
                                name='full_name'
                                value={""}
                            />
                        </div>
                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>Phone</p>
                            <input
                                className='mt12'
                                type='text'
                                placeholder='enter phone'
                                name='full_name'
                                value={""}
                            />
                        </div>
                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>Gender</p>
                            <div className='user_select mt12'>
                                <Select
                                    options={[{ label: "Male", value: 1 }, { label: "Female", value: 1 }]}
                                    name=''
                                    value={""}
                                />
                            </div>
                        </div>
                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>Birth day</p>
                            <div className='birth_select mt12'>
                                <Select
                                    options={[{ label: "Male", value: 1 }, { label: "Female", value: 1 }]}
                                    name=''
                                    value={""}
                                />
                                <Select
                                    options={[{ label: "Male", value: 1 }, { label: "Female", value: 1 }]}
                                    name=''
                                    value={""}
                                />
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
                            <p className='clr959595 fs16 fm'>Current Password</p>
                            <input
                                className='mt12'
                                type='text'
                                placeholder='enter mail or phone'
                                name='full_name'
                                value={""}
                            />
                        </div>
                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>New Password</p>
                            <input
                                className='mt12'
                                type='text'
                                placeholder='enter new password'
                                name='full_name'
                                value={""}
                            />
                        </div>
                        <div className='mt24'>
                            <p className='clr959595 fs16 fm'>Confirm Password</p>
                            <input
                                className='mt12'
                                type='text'
                                placeholder='enter confirm password'
                                name='full_name'
                                value={""}
                            />
                        </div>
                        <div className='mt40 save_changes cp'>
                            <a href>Save Changes</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfoPage