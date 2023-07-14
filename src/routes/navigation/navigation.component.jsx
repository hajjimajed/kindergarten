import './navigation.styles.scss'
import { useState } from 'react';
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

    const toggleMenu = () => {
        if (isNotificationOpen) {
            setIsNotificationOpen(false);
        }
        setIsOpen(!isOpen);
    };

    const toggleNotification = () => {
        if (isOpen) {
            setIsOpen(false);
        }
        setIsNotificationOpen(!isNotificationOpen);
    };


    return (
        <>
            <div className='navigation-container'>
                <div className='right-navigation'>
                    <div className='top-section'>
                        <Link to='/' className='main-link'>
                            <h1>horizon</h1>
                            <img className='main-logo' src={mainLogo} alt="" />
                        </Link>
                        <Link to='/' className='navigation-link'>
                            <h1>لوحة القيادة</h1>
                            <Dashboard />
                        </Link>
                        <Link to='/children' className='navigation-link'>
                            <h1>الأطفال</h1>
                            <Child />
                        </Link>
                        <Link to='/cadres' className='navigation-link'>
                            <h1>الإطارات</h1>
                            <People />
                        </Link>
                        <Link to='/activities' className='navigation-link'>
                            <h1>الأنشطة اليومية</h1>
                            <Activities />
                        </Link>
                        <Link to='/projects' className='navigation-link'>
                            <h1>المشاريع التربوية</h1>
                            <Projects />
                        </Link>
                    </div>
                    <div className='bottom-section'>
                        <Link className='navigation-link'>
                            <h1>تسجيل الخروج</h1>
                            <Logout />
                        </Link>
                    </div>
                </div>
                <div className='top-navigation'>
                    <div className='left-section'>
                        <div className='user-links'>
                            <div className={`profile-dropdown ${isOpen ? 'open' : ''}`}>
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
                                            <Link className='dropdown-link'>
                                                <h1>الملف الشخصي</h1>
                                                <Profile />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className='dropdown-link'>
                                                <h1>تعديلات</h1>
                                                <Setting />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className='dropdown-link-last'>
                                                <h1>تسجيل الخروج</h1>
                                                <Logout />
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </div>

                            <div className='notification'>
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
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )

}

export default Navigation;