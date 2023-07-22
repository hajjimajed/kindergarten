import './navigation.styles.scss'
import { useState, useRef, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
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
import mainLogo from '../../assets/icons/app-logo.png';
import avatar from '../../assets/avatars/7294743.png';

import NotificationItem from '../../components/notification-item/notification-item.component';


const Navigation = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [hamBtn, setHamBtn] = useState(false);

    const hamMenuHandler = () => {
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


    return (
        <>
            <div className='navigation-container'>
                <div className={hamBtn ? 'right-navigation active' : 'right-navigation'}>
                    <div className='top-section'>
                        <Link to='/' className='main-link' onClick={hamMenuHandler}>
                            <h1>horizon</h1>
                            <img className='main-logo' src={mainLogo} alt="" />
                        </Link>
                        <Link to='/' className='navigation-link' onClick={hamMenuHandler}>
                            <h1>لوحة القيادة</h1>
                            <Dashboard />
                        </Link>
                        <Link to='/children' className='navigation-link' onClick={hamMenuHandler}>
                            <h1>الأطفال</h1>
                            <Child />
                        </Link>
                        <Link to='/cadres' className='navigation-link' onClick={hamMenuHandler}>
                            <h1>الإطارات</h1>
                            <People />
                        </Link>
                        <Link to='/activities' className='navigation-link' onClick={hamMenuHandler}>
                            <h1>الأنشطة اليومية</h1>
                            <Activities />
                        </Link>
                        <Link to='/projects' className='navigation-link' onClick={hamMenuHandler}>
                            <h1>المشاريع التربوية</h1>
                            <Projects />
                        </Link>
                    </div>
                    <div className='bottom-section'>
                        <Link className='navigation-link' onClick={hamMenuHandler}>
                            <h1>تسجيل الخروج</h1>
                            <Logout />
                        </Link>
                    </div>
                </div>
                <div className='top-navigation'>
                    <div className='left-section'>
                        <div className='user-links'>
                            <div className={`profile-dropdown ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
                                <div className='PButton' onClick={toggleMenu}>
                                    <div className='img'>
                                        <img src={avatar} alt="" />
                                    </div>
                                    <h1>Majed Hajji</h1>
                                    <DownA />
                                </div>
                                {isOpen && (
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className='dropdown-link' onClick={toggleMenu}>
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
                                            <Link className='dropdown-link-last' onClick={toggleMenu}>
                                                <h1>تسجيل الخروج</h1>
                                                <Logout />
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </div>

                            <div className='notification' ref={notifRef}>
                                <Notification onClick={toggleNotification} />
                                <div className='count-circle'>
                                    <h1>5</h1>
                                </div>
                                {
                                    isNotificationOpen && (
                                        <div className="dropdown-menu">
                                            <h2>إشعارات</h2>
                                            <ul>
                                                <li>
                                                    <NotificationItem />
                                                </li>
                                                <li>
                                                    <NotificationItem />
                                                </li>
                                            </ul>
                                        </div>
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
                            <h1>horizon</h1>
                            <img className='main-logo' src={mainLogo} alt="" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className={hamBtn ? 'ham-button active' : 'ham-button'} onClick={hamMenuHandler}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <Outlet />
        </>
    )

}

export default Navigation;