import './register.styles.scss';
import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { ReactComponent as RegisterIcon } from '../../assets/icons/register.svg';
import { ReactComponent as MainLogo } from '../../assets/icons/logo.svg';
import { ReactComponent as Info } from '../../assets/icons/info.svg';

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [validation, setValidation] = useState(true);

    const handleChangeInput = (fn) => {
        return (event) => {
            fn(event.target.value);
            setValidation(true);
        };
    };

    const registerHandler = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const url = 'https://paje.onrender.com/api/Account/Register';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    address: address
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('registered succesfully');
            localStorage.setItem('accessToken', data.data.accessToken);
            localStorage.setItem('refreshToken', data.data.refreshToken);
            setValidation(true)
            return data;
        } catch (error) {
            console.error('Error occurred:', error);
            setValidation(false);
            return null;
        }
    };




    return (
        <div className='register-container'>
            <div className='register-section'>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        type: "tween",
                        duration: 0.4,
                    }}
                    className='left-register-section'>
                    <div className='infos'>
                        <motion.div
                            initial={{ translateY: 20, opacity: 0 }}
                            animate={{ translateY: 0, opacity: 1 }}
                            transition={{
                                type: "tween",
                                duration: 0.4,
                                delay: 0.3
                            }}
                            className='logo'>
                            <MainLogo />
                            <h1>حقيبة المنشط لرياض الاطفال</h1>
                            <h1>Pack Animateur Jardin d'Enfant</h1>
                        </motion.div>
                        <motion.div
                            initial={{ translateY: 20, opacity: 0 }}
                            animate={{ translateY: 0, opacity: 1 }}
                            transition={{
                                type: "tween",
                                duration: 0.4,
                                delay: 0.5
                            }}
                            className='text'>
                            <h1>مرحباً بك </h1>
                            <h2>ابدأ في إدارة وتخزين بياناتك بشكل أسرع وأفضل </h2>
                        </motion.div>

                    </div>
                </motion.div>
                <div className='right-register-section'>
                    <motion.div
                        initial={{ translateY: -20, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        transition={{
                            type: "tween",
                            duration: 0.4
                        }}
                        className='main-logo'>
                        <MainLogo />
                    </motion.div>
                    <motion.div
                        initial={{ translateY: 20, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        transition={{
                            type: "tween",
                            duration: 0.4,
                            delay: 0.3
                        }}
                        className='register-infos'>
                        <h1>إشترك الأن</h1>
                    </motion.div>
                    <motion.form
                        initial={{ translateY: 20, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        transition={{
                            type: "tween",
                            duration: 0.4,
                            delay: 0.5
                        }}
                        action="" className='register-form'>
                        <label htmlFor="">
                            <span>*</span> عنوان البريد الإلكتروني
                        </label>
                        <input id='email' placeholder='البريد الإلكتروني' type="email" value={email} onChange={handleChangeInput(setEmail)} />
                        <div className='double-section'>
                            <div className='double-div'>
                                <label htmlFor="">
                                    <span>*</span> كلمة المرور
                                </label>
                                <input id='password' placeholder='كلمة المرور' type="password" value={password} onChange={handleChangeInput(setPassword)} />
                            </div>
                            <div className='double-div'>
                                <label htmlFor="">
                                    <span>*</span> تأكيد كلمة المرور
                                </label>
                                <input id='confirmPassword' placeholder='تأكيد كلمة المرور' type="password" value={confirmPassword} onChange={handleChangeInput(setConfirmPassword)} />
                            </div>
                        </div>
                        <div className='double-section'>
                            <div className='double-div'>
                                <label htmlFor="">
                                    <span>*</span> الإسم
                                </label>
                                <input id='firstName' placeholder='الإسم' type="text" value={firstName} onChange={handleChangeInput(setFirstName)} />
                            </div>
                            <div className='double-div'>
                                <label htmlFor="">
                                    <span>*</span> اللقب
                                </label>
                                <input id='lastName' placeholder='اللقب' type="text" value={lastName} onChange={handleChangeInput(setLastName)} />
                            </div>
                        </div>
                        <label htmlFor="">
                            <span>*</span> رقم الهاتف
                        </label>
                        <input id='phone' placeholder='رقم الهاتف' type="text" value={phone} onChange={handleChangeInput(setPhone)} />
                        <label htmlFor="">
                            <span>*</span> العنوان
                        </label>
                        <input id='address' placeholder='العنوان' type="text" value={address} onChange={handleChangeInput(setAddress)} />
                        <button onClick={registerHandler}>
                            <h1>إشترك</h1>
                            <RegisterIcon />
                        </button>
                        <div className='signin-section'>
                            <Link to='/login'>
                                <h1>تسجيل الدخول</h1>
                            </Link>
                            <h1>لديك حساب؟</h1>
                        </div>
                    </motion.form>
                </div>
            </div>
        </div>
    )

}

export default Register;