import './delete-confirm-activity.styles.scss'
import { useContext, useState } from 'react';
import { TogglesContext } from '../../contexts/toggles.context';
import { IsDoneContext } from '../../contexts/isDone.context';

import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as Tick } from '../../assets/icons/tick.svg';
import Loader from '../loader/loader.component';

const DeleteConfirmActivity = ({ activity }) => {

    const { dConfirmationActivity, setDConfirmationActivity } = useContext(TogglesContext);
    const { isDoneActivity, setIsDoneActivity } = useContext(IsDoneContext);
    const [isLoading, setIsLoading] = useState(false);

    const openHandler = () => {
        setDConfirmationActivity(!dConfirmationActivity);
        setIsDoneActivity(false);
    }

    const fetchToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await fetch('https://paje.onrender.com/api/Account/RefreshToken', {
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

    const deleteActivity = async () => {
        setIsLoading(true);
        await fetchToken();
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`https://paje.onrender.com/api/dailytasks/deletetask?id=${activity.task_id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 204) {
                console.log('Cadre deleted successfully.');
                setIsLoading(false);
                setIsDoneActivity(true);
            } else if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                const res = await response.json();
                setIsLoading(false);
                setIsDoneActivity(true);
                console.log('Cadre deleted successfully', res);
            }

        } catch (error) {
            console.error('Error deleting Cadre:', error);
        }
    }

    return (
        <div className='activity-delete-container'>
            <div className='delete-bg' onClick={openHandler}></div>
            <div className='confirmation'>
                <button className='close-btn' onClick={openHandler}>
                    <Close />
                </button>
                {
                    isDoneActivity ? (
                        <div className='confirmed'>
                            <Tick />
                            <h1>لقد تم حذف المعطيات بنجاح</h1>
                        </div>
                    ) : (
                        <>
                            <h1>حذف بيانات النشاط</h1>
                            {
                                isLoading ? (
                                    <Loader />
                                ) : (
                                    <div className='confirmation-infos'>
                                        <h1>هل أنت متأكد من حذف بيانات هذا النشاط ؟</h1>
                                    </div>
                                )
                            }
                            <div className='confirmation-actions'>
                                <button onClick={openHandler}>
                                    <h1>إلغاء</h1>
                                    <Close />
                                </button>
                                <button onClick={deleteActivity}>
                                    <h1>تأكيد</h1>
                                    <Delete />
                                </button>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )

}

export default DeleteConfirmActivity;