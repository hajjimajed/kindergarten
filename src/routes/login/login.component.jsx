import './login.styles.scss'
import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth.context';

import { ReactComponent as LoginIcon } from '../../assets/icons/login.svg';
import { ReactComponent as MainLogo } from '../../assets/icons/logo.svg';
import { ReactComponent as Info } from '../../assets/icons/info.svg';

const Login = () => {

    const { isAuth, setIsAuth } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [validation, setValidation] = useState(true);

    const handleChangeInput = (fn) => {
        return (event) => {
            fn(event.target.value);
            setValidation(true);
        };
    };

    const loginHandler = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const url = 'https://paje.onrender.com/api/Account/Login';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('logged succesfully');
            localStorage.setItem('accessToken', data.data.accessToken);
            localStorage.setItem('refreshToken', data.data.refreshToken);
            setIsAuth(true);
            setValidation(true)
            return data;
        } catch (error) {
            console.error('Error occurred:', error);
            setValidation(false);
            return null;
        }
    };




    return (
        <div className='login-container'>
            <div className='login-section'>
                <div className='left-login-section'>
                    <div className='infos'>
                        <div className='logo'>
                            <MainLogo />
                            <h1>حقيبة المنشط لرياض الاطفال</h1>
                            <h1>Pack Animateur Jardin d'Enfant</h1>
                        </div>
                        <div className='text'>
                            <h1>سجل الأن</h1>
                            <h2>ابدأ في إدارة وتخزين بياناتك بشكل أسرع وأفضل </h2>
                        </div>

                    </div>
                </div>
                <div className='right-login-section'>
                    <div className='main-logo'>
                        <MainLogo />
                    </div>
                    <div className='login-infos'>
                        <h1>مرحباً بك </h1>
                        <p>أدخل تفاصيل تسجيل الدخول الخاصة بك</p>
                    </div>
                    {
                        validation === false && (
                            <motion.div
                                initial={{ translateY: 10, opacity: 0 }}
                                animate={{ translateY: 0, opacity: 1 }}
                                transition={{
                                    type: "tween",
                                    duration: 0.2
                                }}
                                className='error-msg'>
                                <h1>البريد الإلكتروني أو كلمة المرور خاطئة</h1>
                                <Info />
                            </motion.div>
                        )
                    }
                    <form action="" className='login-form'>
                        <label htmlFor="">
                            <span>*</span> عنوان البريد الإلكتروني
                        </label>
                        <input id='email' placeholder='البريد الإلكتروني' type="text" value={email} onChange={handleChangeInput(setEmail)} />
                        <label htmlFor="">
                            <span>*</span> كلمة المرور
                        </label>
                        <input id='password' placeholder='كلمة المرور' type="password" value={password} onChange={handleChangeInput(setPassword)} />
                        <button onClick={loginHandler}>
                            <h1>تسجيل الدخول</h1>
                            <LoginIcon />
                        </button>
                        <div className='signup-section'>
                            <Link to='/register'>
                                <h1>إشترك الأن</h1>
                            </Link>
                            <h1>ليس لديك حساب؟</h1>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Login;