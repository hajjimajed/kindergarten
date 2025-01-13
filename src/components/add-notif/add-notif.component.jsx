import './add-notif.styles.scss';
import { useState, useContext, useEffect, useRef } from 'react';
import config from '../../config';

import { TogglesContext } from '../../contexts/toggles.context';
import { IsDoneContext } from '../../contexts/isDone.context';

import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as Tick } from '../../assets/icons/tick.svg';
import Loader from '../loader/loader.component';

const AddNotif = () => {

    const { isAddChild, setIsAddChild } = useContext(TogglesContext);
    const { isDone, setIsDone } = useContext(IsDoneContext);
    const [isLoading, setIsLoading] = useState(false);

    const addChildRef = useRef(null);

    const openAddChildHandler = () => {
        setIsAddChild(!isAddChild);
        setIsDone(false);
    }


    const [activityTitle, setActivityTitle] = useState('');
    const [activityDescription, setActivityDescription] = useState('');

    const handleChangeInput = (fn) => {
        return (event) => {
            fn(event.target.value);
        };
    };

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

    const addChild = async () => {
        setIsLoading(true);
        await fetchToken();
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(config.BASE_URL + 'api/activities/createactivity', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "activityTitle": activityTitle,
                    "activityDescription": activityDescription
                }),
            });

            if (response.status === 200) {
                console.log('Child added successfully.');
                setIsLoading(false);
                setIsDone(true);
            } else if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                const res = await response.json();
                setIsLoading(false);
                setIsDone(true);
                console.log('Child added successfully', res);
            }

        } catch (error) {
            console.error('Error adding child:', error);
        }
    };


    return (
        <div className='add-child-container'>
            <div className='add-bg' onClick={openAddChildHandler}></div>
            <div className='add-child' ref={addChildRef}>
                <div className='add-child-header'>
                    <button className='close-btn' onClick={openAddChildHandler}>
                        <Close />
                    </button>
                    <h1>إضافة إشعار</h1>
                </div>
                {
                    isDone ? (
                        <div className='confirmed'>
                            <Tick />
                            <h1>لقد تم إضافة الإشعار بنجاح</h1>
                        </div>
                    ) : (
                        <div className='add-child-body'>
                            {
                                isLoading ? (
                                    <Loader />
                                ) : (
                                    <form className='add-child-form'>
                                        <label htmlFor="">
                                        عنوان الإشعار
                                        </label>
                                        <input id='first-name' type="text" value={activityTitle} onChange={handleChangeInput(setActivityTitle)} />
                                        <label htmlFor="">
                                        محتوى الإشعار
                                        </label>
                                        <textarea id="activity-description"value={activityDescription}onChange={handleChangeInput(setActivityDescription)}rows="5" />
                                        
                                    </form>
                                )
                            }

                            <div className='buttons-container'>
                                <button onClick={openAddChildHandler}>
                                    <h1>إلغاء</h1>
                                    <Close />
                                </button>
                                <button onClick={addChild}>
                                    <h1>أضف</h1>
                                    <Tick />
                                </button>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )

}

export default AddNotif;