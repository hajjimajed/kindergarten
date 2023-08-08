import './reset-password.styles.scss';
import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { ReactComponent as SendIcon } from '../../assets/icons/send.svg';
import { ReactComponent as MainLogo } from '../../assets/icons/logo.svg';
import { ReactComponent as Info } from '../../assets/icons/info.svg';

const ResetPassword = () => {

    const [email, setEmail] = useState('');

    const [emailSent, setEmailSent] = useState(false);
    const [CodeSent, setCodeSent] = useState(false);

    const handleChangeInput = (fn) => {
        return (event) => {
            fn(event.target.value);
        };
    };


    return (
        <div className='reset-password-container'>
            <div className='reset-password-section'>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        type: "tween",
                        duration: 0.4,
                    }}
                    className='left-reset-password-section'>
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
                            <h1>مرحباً بك</h1>
                            <h2>ابدأ في إدارة وتخزين بياناتك بشكل أسرع وأفضل </h2>
                        </motion.div>

                    </div>
                </motion.div>
                <div className='right-reset-password-section'>
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
                        className='reset-password-infos'>
                        <h1>تحيين كلمة المرور</h1>
                    </motion.div>
                    <motion.form
                        initial={{ translateY: 20, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        transition={{
                            type: "tween",
                            duration: 0.4,
                            delay: 0.5
                        }}
                        action="" className='reset-password-form'>
                        <div className='reset-level'>
                            <label htmlFor="">
                                <span>*</span> عنوان البريد الإلكتروني
                            </label>
                            <input id='email' placeholder='البريد الإلكتروني' type="email" value={email} onChange={handleChangeInput(setEmail)} />
                            <button>
                                <h1>إرسال البريد الإلكتروني</h1>
                                <SendIcon />
                            </button>
                        </div>
                        <div className='signin-section'>
                            <Link to='/login'>
                                <h1>تسجيل الدخول</h1>
                            </Link>
                            <h1>هل تذكر كلمة مرورك؟</h1>
                        </div>
                    </motion.form>
                </div>
            </div>
        </div>
    )

}

export default ResetPassword;