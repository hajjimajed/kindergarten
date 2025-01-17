import './send-notification.styles.scss';
import { useContext, useState, useEffect } from 'react';
import config from '../../config';

import { TogglesContext } from '../../contexts/toggles.context';
import { IsDoneContext } from '../../contexts/isDone.context';

import { ReactComponent as Delete } from '../../assets/icons/send.svg';
import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as Tick } from '../../assets/icons/tick.svg';
import Loader from '../loader/loader.component';

const SentNotification = ({ child }) => {

    const { isSendNotif, setIsSendNotif } = useContext(TogglesContext);
    const { isDone, setIsDone } = useContext(IsDoneContext);
    const [isLoading, setIsLoading] = useState(false);
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const openHandler = () => {
        setIsSendNotif(!isSendNotif);
        setIsDone(false);
    };

    const fetchToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await fetch(config.BASE_URL + 'api/Account/RefreshToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ RefreshToken: refreshToken }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const res = await response.json();
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
        } catch (error) {
            console.error('Error fetching token:', error);
        }
    };

    const fetchActivities = async (page = 1) => {
        try {
            await fetchToken();
            const token = localStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const response = await fetch(`${config.BASE_URL}api/activities/getPaginatedActivities?pageNumber=${page}`, { headers });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const jsonData = await response.json();
            setActivities(jsonData.items);
            setSelectedActivity(jsonData.items[0]); // Set the first activity as default
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };

    useEffect(() => {
        fetchActivities(); // Fetch activities on component mount
    }, []);

    const sendNotification = async () => {
        try {
            setIsLoading(true);
            await fetchToken();

            const token = localStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const notificationPayload = {
                title: selectedActivity.activityTitle,  // Use selected activity's title
                description: selectedActivity.activityDescription,  // Use selected activity's description
                uniqueCode: child.uniqueCode,
                codeLists: [],
                creationDate: new Date().toISOString(),
            };

            const response = await fetch(`${config.BASE_URL}api/Account/send`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(notificationPayload),
            });

            if (response.status === 200) {
                console.log('Notification sent successfully.');
                setIsLoading(false);
                setIsDone(true);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error sending notification:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className='delete-container'>
            <div className='delete-bg' onClick={openHandler}></div>
            <div className='confirmation'>
                <button className='close-btn' onClick={openHandler}>
                    <Close />
                </button>
                {
                    isDone ? (
                        <div className='confirmed'>
                            <Tick />
                            <h1>تم ارسال الإشعار بنجاح</h1>
                        </div>
                    ) : (
                        <>
                            <h1>ارسال إشعار للطفل</h1>
                            {
                                isLoading ? (
                                    <Loader />
                                ) : (
                                    <div className='confirmation-infos'>
                                        <h1>إختيار النشاط</h1>
                                        <div>
                                            <select className='dropdownMessage' value={selectedActivity?.activityTitle || ''} onChange={(e) => {
                                                const selected = activities.find(act => act.activityTitle === e.target.value);
                                                setSelectedActivity(selected);
                                            }}>
                                                {activities.map((activity, index) => (
                                                    <option key={index} value={activity.activityTitle}>
                                                        {activity.activityTitle}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )
                            }
                            <div className='confirmation-actions'>
                                <button onClick={openHandler}>
                                    <h1>إلغاء</h1>
                                    <Close />
                                </button>
                                <button onClick={sendNotification}>
                                    <h1>إرسال</h1>
                                    <Delete />
                                </button>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default SentNotification;
