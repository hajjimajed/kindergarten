import './send-multi-notification.styles.scss';
import { useContext, useEffect, useState } from 'react';
import config from '../../config';

import { TogglesContext } from '../../contexts/toggles.context';
import { IsDoneContext } from '../../contexts/isDone.context';

import { ReactComponent as Delete } from '../../assets/icons/send.svg';
import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as Tick } from '../../assets/icons/tick.svg';
import Loader from '../loader/loader.component';

const SentNotification = ({ notif, allKids }) => {
    console.log('notif, allKids',notif, allKids)
    const { isSendNotif, setIsSendNotif } = useContext(TogglesContext);
    const { isDone, setIsDone } = useContext(IsDoneContext);
    const [isLoading, setIsLoading] = useState(false);
    
    const openHandler = () => {
        setIsSendNotif(!isSendNotif);
        setIsDone(false);
    }

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

    const sendNotification = async () => {
        try {
            setIsLoading(true);
            await fetchToken();

            const token = localStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
    
            const notificationPayload = {
                title: notif.activityTitle,  // Use selected message's title
                description: notif.activityDescription,    // Use selected message's body
                uniqueCode: "00",
                codeLists: allKids,
                creationDate: new Date().toISOString()
            };
    
            const response = await fetch(config.BASE_URL + 'api/Account/ActivitySend', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(notificationPayload)
            });
    
            if (response.status === 200) {
                console.log('sent successfully.');
                setIsLoading(false);
                setIsDone(true);
            } else if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                const res = await response.json();
                setIsLoading(false);
                setIsDone(true);
                console.log('sent successfully', res);
            }
    
            const jsonData = await response.json();
            console.log('Notification sent successfully', jsonData);
        } catch (error) {
            console.error('Error sending notification:', error);
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
                         <h1>إرسال الإشعار لكل الأطفال</h1>
                         {
                                isLoading ? (
                                    <Loader />
                                ) : (
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
  )
                            }
                           
                           
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default SentNotification;
