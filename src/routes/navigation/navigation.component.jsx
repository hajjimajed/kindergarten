import './navigation.styles.scss'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Dashboard } from '../../assets/icons/category.svg'
import { ReactComponent as Activities } from '../../assets/icons/activity.svg'
import { ReactComponent as Projects } from '../../assets/icons/chart.svg'
import { ReactComponent as Child } from '../../assets/icons/baby.svg'
import { ReactComponent as People } from '../../assets/icons/user.svg'
import { ReactComponent as Search } from '../../assets/icons/search.svg'
import { ReactComponent as Close } from '../../assets/icons/close.svg'
import mainLogo from '../../assets/icons/app-logo.png';
import avatar from '../../assets/avatars/7294743.png';


const Navigation = () => {



    return (
        <div className='navigation-container'>
            <div className='right-navigation'>
                <Link className='main-link'>
                    <h1>horizon</h1>
                    <img className='main-logo' src={mainLogo} alt="" />
                </Link>
                <Link className='navigation-link'>
                    <h1>لوحة القيادة</h1>
                    <Dashboard />
                </Link>
                <Link className='navigation-link'>
                    <h1>الأطفال</h1>
                    <Child />
                </Link>
                <Link className='navigation-link'>
                    <h1>الإطارات</h1>
                    <People />
                </Link>
                <Link className='navigation-link'>
                    <h1>الأنشطة اليومية</h1>
                    <Activities />
                </Link>
                <Link className='navigation-link'>
                    <h1>المشاريع التربوية</h1>
                    <Projects />
                </Link>
            </div>
            <div className='top-navigation'>
                <div className='left-section'>
                    <div className='user-links'>
                        df
                    </div>
                    <div className='search'>

                    </div>
                </div>
                <div className='right-section'>
                    <div className='welcoming'>
                        <h1>
                            ! مرحباً بك من جديد
                        </h1>
                        <p>
                            إلقي نظرة متعمقة على جميع المقاييس في لوحة القيادة
                        </p>
                    </div>
                    <div className='profile-circle'>
                        <div className='avatar'>
                            <img src={avatar} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Navigation;