import './navigation.styles.scss'
import { useState, useRef, useEffect, useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import { ReactComponent as Dashboard } from '../../assets/icons/category.svg'
import { ReactComponent as Activities } from '../../assets/icons/activity.svg'
import { ReactComponent as Projects } from '../../assets/icons/chart.svg'
import { ReactComponent as Child } from '../../assets/icons/baby.svg'
import { ReactComponent as People } from '../../assets/icons/user.svg'
import { ReactComponent as Search } from '../../assets/icons/search.svg'
import { ReactComponent as Logout } from '../../assets/icons/logout.svg'
import { ReactComponent as Profile } from '../../assets/icons/profile.svg'
import { ReactComponent as Setting } from '../../assets/icons/setting.svg'
import { ReactComponent as DownA } from '../../assets/icons/down-arrow.svg'
import { ReactComponent as Notification } from '../../assets/icons/notification.svg'
import { ReactComponent as MainLogo } from '../../assets/icons/logo.svg'
import avatar from '../../assets/avatars/avatar.png';

import NotificationItem from '../../components/notification-item/notification-item.component';
import { AuthContext } from '../../contexts/auth.context';


const Navigation = () => {

    const { logout } = useContext(AuthContext)

    const [isOpen, setIsOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [hamBtn, setHamBtn] = useState(false);

    const hamMenuHandler = () => {
        setHamBtn(false);
    }

    const hamMenuToggle = () => {
        setHamBtn(!hamBtn);
    }

    const dropdownRef = useRef(null);
    const notifRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleNotification = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleNotifOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsNotificationOpen(false);
            }
        }

        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('click', handleNotifOutside);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
            document.removeEventListener('click', handleNotifOutside);
        };
    }, []);

    const location = useLocation();

    // Function to determine if the current link is active
    const isLinkActive = (to) => {
        return location.pathname === to;
    };


    return (
        <>
            <div className='navigation-container'>
                <motion.div
                    initial={{ right: -300 }}
                    animate={{ right: 0 }}
                    transition={{
                        type: "tween",
                        duration: 0.7
                    }}
                    className={hamBtn ? 'right-navigation active' : 'right-navigation'}>
                    <div className='top-section'>
                        <Link to='/' className='main-link' onClick={hamMenuHandler}>
                            <MainLogo />
                        </Link>
                        <Link to='/' className={`navigation-link ${isLinkActive('/') ? 'active' : ''}`} onClick={hamMenuHandler}>
                            <h1>لوحة القيادة</h1>
                            <Dashboard />
                        </Link>
                        <Link to='/children' className={`navigation-link ${isLinkActive('/children') ? 'active' : ''}`} onClick={hamMenuHandler}>
                            <h1>الأطفال</h1>
                            <Child />
                        </Link>
                        <Link to='/cadres' className={`navigation-link ${isLinkActive('/cadres') ? 'active' : ''}`} onClick={hamMenuHandler}>
                            <h1>الإطارات</h1>
                            <People />
                        </Link>
                        <Link to='/activities' className={`navigation-link ${isLinkActive('/activities') ? 'active' : ''}`} onClick={hamMenuHandler}>
                            <h1>الأنشطة اليومية</h1>
                            <Activities />
                        </Link>
                        <Link to='/projects' className={`navigation-link ${isLinkActive('/projects') ? 'active' : ''}`} onClick={hamMenuHandler}>
                            <h1>المشاريع التربوية</h1>
                            <Projects />
                        </Link>
                    </div>
                    <div className='bottom-section'>
                        <Link to='/login' className='navigation-link' onClick={logout}>
                            <h1>تسجيل الخروج</h1>
                            <Logout />
                        </Link>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ translateY: -200 }}
                    animate={{ translateY: 0 }}
                    transition={{
                        type: "tween",
                        duration: 0.7,
                        delay: 0.5
                    }}
                    className='top-navigation'>
                    <div className='left-section'>
                        <div className='user-links'>
                            <div className={`profile-dropdown ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
                                <div className='PButton' onClick={toggleMenu}>
                                    <div className='img'>
                                        <img src={avatar} alt="" />
                                    </div>
                                    <h1>ماجد حاجي</h1>
                                    <DownA />
                                </div>
                                {isOpen && (
                                    <motion.ul
                                        initial={{ translateY: 25, opacity: 0 }}
                                        animate={{ translateY: 0, opacity: 1 }}
                                        transition={{
                                            type: "tween",
                                            duration: 0.2
                                        }}
                                        className="dropdown-menu">
                                        <li>
                                            <Link to='/profile' className='dropdown-link' onClick={toggleMenu}>
                                                <h1>الملف الشخصي</h1>
                                                <Profile />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className='dropdown-link' onClick={toggleMenu}>
                                                <h1>تعديلات</h1>
                                                <Setting />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className='dropdown-link-last' onClick={() => { logout(); toggleMenu(); }}>
                                                <h1>تسجيل الخروج</h1>
                                                <Logout />
                                            </Link>
                                        </li>
                                    </motion.ul>
                                )}
                            </div>

                            <div className='notification' ref={notifRef}>
                                <Notification onClick={toggleNotification} />
                                <div className='count-circle'>
                                    <h1>5</h1>
                                </div>
                                {
                                    isNotificationOpen && (
                                        <motion.div
                                            initial={{ translateY: 25, opacity: 0 }}
                                            animate={{ translateY: 0, opacity: 1 }}
                                            transition={{
                                                type: "tween",
                                                duration: 0.2
                                            }}
                                            className="dropdown-menu">
                                            <h2>إشعارات</h2>
                                            <ul>
                                                <li>
                                                    <NotificationItem />
                                                </li>
                                                <li>
                                                    <NotificationItem />
                                                </li>
                                            </ul>
                                        </motion.div>
                                    )
                                }
                            </div>

                        </div>

                    </div>
                    <div className='right-section'>
                        <form className="search-bar">
                            <button className="search-bar__button">
                                <Search />
                            </button>
                            <input type="text" className="search-bar__input" placeholder="بحث" />
                        </form>
                        <Link to='/' className='main-link' onClick={hamMenuHandler}>
                            <MainLogo />
                        </Link>
                    </div>
                    <div className='ham-btn-section'>
                        <div className={hamBtn ? 'ham-button active' : 'ham-button'} onClick={hamMenuToggle}>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </motion.div>
            </div>
            {/* <div className={hamBtn ? 'ham-button active' : 'ham-button'} onClick={hamMenuToggle}>
                <div></div>
                <div></div>
                <div></div>
            </div> */}
            <Outlet />
        </>
    )

}

export default Navigation;