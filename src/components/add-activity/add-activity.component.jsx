import './add-activity.styles.scss'


import { useState, useContext, useEffect, useRef } from 'react';

import { TogglesContext } from '../../contexts/toggles.context';

import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as Tick } from '../../assets/icons/tick.svg';

const AddActivity = () => {

    const { isAddActivity, setIsAddActivity } = useContext(TogglesContext)

    const openAddActivityHandler = () => {
        setIsAddActivity(!isAddActivity);
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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted:', {
            task_name,
            task_time,
            creation_date,
            task_reference,
            task_goal,
            demarche,
            tools,
            paper_number,
            notes,
        });
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
                <div className='add-activity-body'>
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
                    <div className='buttons-container'>
                        <button onClick={openAddActivityHandler}>
                            <h1>إلغاء</h1>
                            <Close />
                        </button>
                        <button onClick={handleSubmit}>
                            <h1>أضف</h1>
                            <Tick />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AddActivity;