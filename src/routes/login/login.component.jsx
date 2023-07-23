import './login.styles.scss'
import { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../contexts/auth.context';

import { ReactComponent as LoginIcon } from '../../assets/icons/login.svg';
import mainLogo from '../../assets/icons/app-logo.png';


const Login = () => {

    const { isAuth, setIsAuth } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeInput = (fn) => {
        return (event) => {
            fn(event.target.value);
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
            return data; // This will contain the response data from the server
        } catch (error) {
            console.error('Error occurred:', error);
            return null;
        }
    };




    return (
        <div className='login-container'>
            <div className='top-menu-section'>
                <div className='main-link'>
                    <h1>horizon</h1>
                    <img className='main-logo' src={mainLogo} alt="" />
                </div>
            </div>
            <div className='login-section'>
                <div className='left-login-section'>
                    <div className='infos'>

                    </div>
                </div>
                <div className='right-login-section'>
                    <div className='login-infos'>
                        <h1>مرحباً بك </h1>
                        <p>أدخل تفاصيل تسجيل الدخول الخاصة بك</p>
                    </div>
                    <form action="" className='login-form'>
                        <label htmlFor="">
                            <span>*</span> عنوان البريد الإلكتروني
                        </label>
                        <input id='email' type="text" value={email} onChange={handleChangeInput(setEmail)} />
                        <label htmlFor="">
                            <span>*</span> كلمة المرور
                        </label>
                        <input id='password' type="password" value={password} onChange={handleChangeInput(setPassword)} />
                        <button onClick={loginHandler}>
                            <h1>تسجيل الدخول</h1>
                            <LoginIcon />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Login;