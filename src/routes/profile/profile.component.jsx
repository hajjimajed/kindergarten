import './profile.styles.scss';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import config from '../../config';
import avatar from '../../assets/avatars/avatar.png';
import { ReactComponent as Setting } from '../../assets/icons/setting.svg';
import { ReactComponent as Attach } from '../../assets/icons/attach.svg';
import { ReactComponent as Location } from '../../assets/icons/location.svg';
import { ReactComponent as Phone } from '../../assets/icons/phone.svg';
import { ReactComponent as Mail } from '../../assets/icons/mail.svg';

import Loader from '../../components/loader/loader.component';

const Profile = () => {

    const [userData, setUserData] = useState({})
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, [])

    const fetchToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await fetch(config.BASE_URL + 'api/Account/RefreshToken', {
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

            const response = await fetch(config.BASE_URL + "api/Account/userdetails", { headers });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setUserData(jsonData.data);
            setFetched(true);
            console.log('fetch successul', jsonData.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className='profile-container'>
            <motion.div
                initial={{ translateY: 50, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{
                    type: "tween",
                    duration: 0.4
                }}
                className='top-container'>
                <div className='top-container-header'>
                    <h1>الملف الشخصي</h1>
                </div>
                <div className='top-container-body'>
                    <Link to='/setting' className='setting-btn'>
                        <h1>تعديل</h1>
                        <Setting />
                    </Link>
                </div>
            </motion.div>
            <motion.div
                initial={{ translateY: 50, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{
                    type: "tween",
                    duration: 0.4,
                    delay: 0.2
                }}
                className='profile-infos'>
                {
                    fetched ? (
                        <>
                            <div className='img'>
                                <img src={avatar} alt="" />
                                <div className='verification'>
                                    <p>مفعل</p>
                                </div>
                                <h1 className='name'>الإسم اللقب</h1>
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
                        </>
                    ) : (
                        <Loader />
                    )
                }
            </motion.div>
        </div>
    )

}

export default Profile;