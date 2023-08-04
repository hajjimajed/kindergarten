import './add-activity.styles.scss'


import { useState, useContext, useEffect, useRef } from 'react';

import { TogglesContext } from '../../contexts/toggles.context';
import { IsDoneContext } from '../../contexts/isDone.context';

import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as Tick } from '../../assets/icons/tick.svg';
import Loader from '../loader/loader.component';

const AddActivity = () => {

    const { isAddActivity, setIsAddActivity } = useContext(TogglesContext);
    const { isDoneActivity, setIsDoneActivity } = useContext(IsDoneContext);
    const [isLoading, setIsLoading] = useState(false);

    const openAddActivityHandler = () => {
        setIsAddActivity(!isAddActivity);
        setIsDoneActivity(false);
    }


    const [task_name, setTask_name] = useState('');
    const [task_time, setTask_time] = useState('');
    const [creation_date, setCreation_date] = useState('');
    const [task_reference, setTask_reference] = useState('');
    const [task_goal, setTask_goal] = useState('');
    const [demarche, setDemarche] = useState('');
    const [tools, setTools] = useState('');
    const [paper_number, setPaper_number] = useState('');
    const [notes, setNotes] = useState('');

    const handleChangeInput = (fn) => {
        return (event) => {
            fn(event.target.value);
        };
    };

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

    const addActivity = async () => {
        await fetchToken();

        try {
            const token = localStorage.getItem('accessToken');
            const userData = JSON.parse(localStorage.getItem('userData'));
            const response = await fetch('https://paje.onrender.com/api/dailytasks/createtask', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "task_name": task_name,
                    "task_time": task_time,
                    "creation_date": creation_date,
                    "task_reference": task_reference,
                    "task_goal": task_goal,
                    "demarche": demarche,
                    "tools": tools,
                    "paper_number": paper_number,
                    "notes": notes,
                    "user_id": userData.userId
                }),
            });

            if (response.status === 200) {
                console.log('activity added successfully.');
                setIsLoading(false);
                setIsDoneActivity(true);
            } else if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                const res = await response.json();
                setIsLoading(false);
                setIsDoneActivity(true);
                console.log('activity added successfully', res);
            }

        } catch (error) {
            console.error('Error adding activity:', error);
        }
    };



    return (
        <div className='add-activity-container'>
            <div className='add-bg' onClick={openAddActivityHandler}></div>
            <div className='add-activity'>
                <div className='add-activity-header'>
                    <button className='close-btn' onClick={openAddActivityHandler}>
                        <Close />
                    </button>
                    <h1>إضافة نشاط</h1>
                </div>
                {
                    isDoneActivity ? (
                        <div className='confirmed'>
                            <Tick />
                            <h1>لقد تم إضافة الإطار بنجاح</h1>
                        </div>
                    ) : (
                        <div className='add-activity-body'>
                            {
                                isLoading ? (
                                    <Loader />
                                ) : (
                                    <form className='add-activity-form'>
                                        <label htmlFor="">
                                            إسم النشاط
                                        </label>
                                        <input id='task-name' type="text" value={task_name} onChange={handleChangeInput(setTask_name)} />
                                        <label htmlFor="">
                                            التوقيت
                                        </label>
                                        <input id='task-time' type="text" value={task_time} onChange={handleChangeInput(setTask_time)} />
                                        <label htmlFor="">
                                            المرجع
                                        </label>
                                        <input id='task-reference' type="text" value={task_reference} onChange={handleChangeInput(setTask_reference)} />
                                        <label htmlFor="">
                                            هدف النشاط
                                        </label>
                                        <input id='task-goal' type="text" value={task_goal} onChange={handleChangeInput(setTask_goal)} />
                                        <label htmlFor="">
                                            التمشي البيداغوجي
                                        </label>
                                        <input id='demarche' type="text" value={demarche} onChange={handleChangeInput(setDemarche)} />
                                        <label htmlFor="">
                                            تاريخ الإنجاز
                                        </label>
                                        <input id='createtion-date' type="date" value={creation_date} onChange={handleChangeInput(setCreation_date)} />
                                        <label htmlFor="">
                                            الوسائل والمحامل
                                        </label>
                                        <input id='tools' type="text" value={tools} onChange={handleChangeInput(setTools)} />
                                        <label htmlFor="">
                                            عدد الجذاذة التقنية
                                        </label>
                                        <input id='paper-number' type="text" value={paper_number} onChange={handleChangeInput(setPaper_number)} />
                                        <label htmlFor="">
                                            الملاحظات والتقييم
                                        </label>
                                        <input id='notes' type="text" value={notes} onChange={handleChangeInput(setNotes)} />
                                    </form>
                                )
                            }
                            <div className='buttons-container'>
                                <button onClick={openAddActivityHandler}>
                                    <h1>إلغاء</h1>
                                    <Close />
                                </button>
                                <button onClick={addActivity}>
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

export default AddActivity;