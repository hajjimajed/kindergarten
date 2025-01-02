import './setting.styles.scss';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import config from '../../config';
import avatar from '../../assets/avatars/avatar.png';
import { ReactComponent as Profile } from '../../assets/icons/profile.svg';
import { ReactComponent as Location } from '../../assets/icons/location.svg';
import { ReactComponent as Phone } from '../../assets/icons/phone.svg';
import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as Tick } from '../../assets/icons/tick.svg';
import { ReactComponent as Key } from '../../assets/icons/key.svg';

import Loader from '../../components/loader/loader.component';

const SettingProfile = () => {

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


    const [email, setEmail] = useState(userData.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState(userData.firstName);
    const [lastName, setLastName] = useState(userData.lastName);
    const [phone, setPhone] = useState('+216 00 000 000');
    const [address, setAddress] = useState('Beverly Hills, Los Angeles California');

    const handleChangeInput = (fn) => {
        return (event) => {
            fn(event.target.value);
        };
    };

    return (
        <div className='setting-container'>
            <motion.div
                initial={{ translateY: 50, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{
                    type: "tween",
                    duration: 0.4
                }}
                className='top-container'>
                <div className='top-container-header'>
                    <h1>تعديل المعطيات الشخصية</h1>
                </div>
                <div className='top-container-body'>
                    <Link to='/profile' className='return-btn'>
                        <h1>إلغاء</h1>
                        <Close />
                    </Link>
                    <button className='save-btn'>
                        <h1>حفض</h1>
                        <Tick />
                    </button>
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
                className='setting-infos'>
                {
                    fetched ? (
                        <>
                            <div className='img'>
                                <img src={avatar} alt="" />
                                <div className='verification'>
                                    <p>مفعل</p>
                                </div>
                                <h1 className='name'>{userData.email}</h1>
                            </div>

                            <div className='infos'>
                                <table>
                                    <tr>
                                        <td>
                                            <input type="text" value={firstName} onChange={handleChangeInput(setFirstName)} />
                                        </td>
                                        <td>
                                            <div className='info-title'>
                                                <h1>الإسم</h1>
                                                <Profile />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="text" value={lastName} onChange={handleChangeInput(setLastName)} />
                                        </td>
                                        <div className='info-title'>
                                            <h1>اللقب</h1>
                                            <Profile />
                                        </div>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="text" value={phone} onChange={handleChangeInput(setPhone)} />
                                        </td>
                                        <div className='info-title'>
                                            <h1>رقم الهاتف</h1>
                                            <Phone />
                                        </div>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="text" value={address} onChange={handleChangeInput(setAddress)} />
                                        </td>
                                        <div className='info-title'>
                                            <h1>العنوان</h1>
                                            <Location />
                                        </div>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="password" onChange={handleChangeInput(setPassword)} />
                                        </td>
                                        <div className='info-title'>
                                            <h1>كلمة المرور</h1>
                                            <Key />
                                        </div>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="text" onChange={handleChangeInput(setConfirmPassword)} />
                                        </td>
                                        <div className='info-title'>
                                            <h1>تأكيد كلمة المرور</h1>
                                            <Key />
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

export default SettingProfile;