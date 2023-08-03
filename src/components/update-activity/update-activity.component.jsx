import './update-activity.styles.scss';
import { useState, useContext, useEffect, useRef } from 'react';

import { TogglesContext } from '../../contexts/toggles.context';
import { IsDoneContext } from '../../contexts/isDone.context';

import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as Tick } from '../../assets/icons/tick.svg';
import Loader from '../loader/loader.component';

const UpdateActivity = ({ activity }) => {

    const { isUpdateActivity, setIsUpdateActivity } = useContext(TogglesContext);
    const { isDoneActivity, setIsDoneActivity } = useContext(IsDoneContext);
    const [isLoading, setIsLoading] = useState(false);

    const openUpdateActivityHandler = () => {
        setIsUpdateActivity(!isUpdateActivity);
        setIsDoneActivity(false);
    }


    const [task_name, setTask_name] = useState(activity.task_name);
    const [task_time, setTask_time] = useState(activity.task_time);
    const [creation_date, setCreation_date] = useState(activity.creation_date.split("T")[0]);
    const [task_reference, setTask_reference] = useState(activity.task_reference);
    const [task_goal, setTask_goal] = useState(activity.task_goal);
    const [demarche, setDemarche] = useState(activity.demarche);
    const [tools, setTools] = useState(activity.tools);
    const [paper_number, setPaper_number] = useState(activity.paper_number);
    const [notes, setNotes] = useState(activity.notes);

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

    const updateActivity = async () => {
        await fetchToken();

        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`https://paje.onrender.com/api/dailytasks/updatetask?id=${activity.task_id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "task_id": activity.task_id,
                    "task_name": task_name,
                    "task_time": task_time,
                    "creation_date": creation_date,
                    "task_reference": task_reference,
                    "task_goal": task_goal,
                    "demarche": demarche,
                    "tools": tools,
                    "paper_number": paper_number,
                    "notes": notes,
                    "user_id": "1"
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
        <div className='update-activity-container'>
            <div className='update-bg' onClick={openUpdateActivityHandler}></div>
            <div className='update-activity'>
                <div className='update-activity-header'>
                    <button className='close-btn' onClick={openUpdateActivityHandler}>
                        <Close />
                    </button>
                    <h1>تعديل معطيات النشاط</h1>
                </div>
                {
                    isDoneActivity ? (
                        <div className='confirmed'>
                            <Tick />
                            <h1>تم تعديل المعطيات بنجاح</h1>
                        </div>
                    ) : (
                        <div className='update-activity-body'>
                            {
                                isLoading ? (
                                    <Loader />
                                ) : (
                                    <form className='update-activity-form'>
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
                                <button onClick={openUpdateActivityHandler}>
                                    <h1>إلغاء</h1>
                                    <Close />
                                </button>
                                <button onClick={updateActivity}>
                                    <h1>تعديل</h1>
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

export default UpdateActivity;