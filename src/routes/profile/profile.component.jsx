import './profile.styles.scss';
import { useState, useEffect, useContext } from 'react';

import avatar from '../../assets/avatars/avatar.png';
import { ReactComponent as Setting } from '../../assets/icons/setting.svg';
import { ReactComponent as Attach } from '../../assets/icons/attach.svg';
import { ReactComponent as Location } from '../../assets/icons/location.svg';
import { ReactComponent as Phone } from '../../assets/icons/phone.svg';
import { ReactComponent as Mail } from '../../assets/icons/mail.svg';

const Profile = () => {

    const [userData, setUserData] = useState({})

    useEffect(() => {
        fetchUserData();
    }, [])

    const fetchToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await fetch('https://paje.onrender.com/api/Account/RefreshToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    RefreshToken: refreshToken,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const res = await response.json();

            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);

            console.log('Token refreshed successfully', res.data.refreshToken);

        } catch (error) {
            console.error('Error fetching token:', error);
        }
    };

    const fetchUserData = async () => {

        try {
            await fetchToken();
            const token = localStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            const response = await fetch("https://paje.onrender.com/api/Account/userdetails", { headers });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setUserData(jsonData.data);
            console.log('fetch successul', jsonData.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className='profile-container'>
            <div className='top-container'>
                <div className='top-container-header'>
                    <h1>الملف الشخصي</h1>
                </div>
                <div className='top-container-body'>
                    <button className='setting-btn'>
                        <h1>تعديل</h1>
                        <Setting />
                    </button>
                </div>
            </div>
            <div className='profile-infos'>
                <div className='img'>
                    <img src={avatar} alt="" />
                    <div className='verification'>
                        <p>مفعل</p>
                    </div>
                    <h1 className='name'>ماجد حاجي</h1>
                </div>

                <div className='infos'>
                    <table>
                        <tr>
                            <td>
                                <h2>{userData.userId}</h2>
                            </td>
                            <td>
                                <div className='info-title'>
                                    <h1>المعرف</h1>
                                    <Attach />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h2>{userData.email}</h2>
                            </td>
                            <div className='info-title'>
                                <h1>البريد الإلكتروني</h1>
                                <Mail />
                            </div>
                        </tr>
                        <tr>
                            <td>
                                <h2>+216 00 000 000</h2>
                            </td>
                            <div className='info-title'>
                                <h1>رقم الهاتف</h1>
                                <Phone />
                            </div>
                        </tr>
                        <tr>
                            <td>
                                <h2>Beverly Hills, Los Angeles California</h2>
                            </td>
                            <div className='info-title'>
                                <h1>العنوان</h1>
                                <Location />
                            </div>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )

}

export default Profile;