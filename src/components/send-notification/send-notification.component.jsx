import './send-notification.styles.scss';
import { useContext, useState } from 'react';
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

    // Array of dummy message objects (each with both title and body)
    const dummyMessages = [
        { title: "تنبيه: موعد الحصة القادمة", body: "حان وقت الدرس! لا تنسى الاستعداد." },
        { title: "إشعار: واجب منزلي جديد", body: "لقد تم إضافة واجب منزلي جديد. هل أنجزت كل شيء؟" },
        { title: "تذكير: استراحة الغداء", body: "حان وقت استراحة الغداء! استمتع بوجبتك." },
        { title: "تنبيه: يوم مميز في المدرسة", body: "اليوم لدينا نشاط خاص في المدرسة. لا تفوت المتعة!" }
    ];
    

    const [selectedMessage, setSelectedMessage] = useState(dummyMessages[0]);

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
                title: selectedMessage.title,  // Use selected message's title
                body: selectedMessage.body,    // Use selected message's body
                uniqueCode: child.uniqueCode
            };
    
            const response = await fetch(config.BASE_URL + 'api/Account/send', {
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
                            <h1>ارسال إشعار للطفل</h1>
                            {
                                isLoading ? (
                                    <Loader />
                                ) : (
                                    <div className='confirmation-infos'>
                                        <h1>إختيار النشاط</h1>
                                        <div>
                                            <select className='dropdownMessage' value={selectedMessage.title} onChange={(e) => {
                                                const selected = dummyMessages.find(msg => msg.title === e.target.value);
                                                setSelectedMessage(selected);
                                            }}>
                                                {dummyMessages.map((message, index) => (
                                                    <option key={index} value={message.title}>
                                                        {message.title}
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
}

export default SentNotification;
