import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../CSS/Shop.css';

const Profile = () => {
    const [userData, setUserData] = useState({
        Name: '',
        email: '',
        profilePic: '',
        phone: ''
    });
    const [error, setError] = useState(null);
    const [image, setimage] = useState(null);

    useEffect(() => {
        callProfilePage();
    }, []);

    const callProfilePage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id: localStorage.getItem("user") }),
            });

            const data = await res.json();
            console.log(data);

            if (res.status !== 200) {
                setError(data.error);
            } else {
                setUserData(data.user);
            }
        } catch (err) {
            console.log(err);
            setError("Error fetching profile data");
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevUserData => ({
            ...prevUserData,
            [name]: value
        }));
    };

    const handleUpdateProfile = async () => {
        // add /Profileupdate call to update user data
        try {
            const res = await fetch('/Profileupdate', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    _id: localStorage.getItem("user"),
                    Name: userData.Name,
                    email: userData.email,
                    profilePic: image?image: userData.profilePic,
                    phone: userData.phone
                })
            });

            const data = await res.json();

            if (res.status === 400 || !data) {
                setError(data.error);
            } else {
                alert("Profile updated successfully");
            }
        } catch (err) {
            console.log(err);
            setError("Error updating profile data");
        }
    };

    return (
        <div className="main">
            <Sidebar />
            <div className="pagedata">
                <div className="title">
                    <h2>Profile</h2>
                </div>
                <div className="content-container">
                    <div className="content">
                        <div className={"active1"}>
                        <div className="profile-pic" style={{
                            display
    : 'flex',

      width: '100%',
      height: '100px',
      overflow: 'hidden',
      alignItems:'center',
      justifyContent:'center'
    }}>
      <img
        src={userData.profilePic?userData.profilePic:"https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" }
        alt="profile-pic"
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          alignItems:'center',
        }}
        />
    </div>
                            <div className="input-container">
                                <label htmlFor="profilePic" className='label'>
                                    Profile Image<span>*</span>
                                </label>
                                <input
                                    type="text"
                                    id='profilePic'
                                    name='profilePic'
                                    autoComplete='off'
                                    required
                                    placeholder='Enter image link'
                                    className='text-input'
                                    value={userData.profilePic}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="name" className='label'>
                                    User Name<span>*</span>
                                </label>
                                <input
                                    type="text"
                                    id='name'
                                    name='Name'
                                    autoComplete='off'
                                    required
                                    placeholder='Enter user name'
                                    className='text-input'
                                    value={userData.Name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="email" className='label'>
                                    Email<span>*</span>
                                </label>
                                <input
                                    type="text"
                                    id='email'
                                    name='email'
                                    autoComplete='off'
                                    required
                                    placeholder='Enter Email'
                                    className='text-input'
                                    value={userData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="phone" className='label'>
                                    Phone<span>*</span>
                                </label>
                                <input
                                    type="text"
                                    id='Phone'
                                    name='phone'
                                    autoComplete='off'
                                    required
                                    placeholder='Enter phone no'
                                    className='text-input'
                                    value={userData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className='submit-btn'
                                onClick={handleUpdateProfile}
                            >
                                Update Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
