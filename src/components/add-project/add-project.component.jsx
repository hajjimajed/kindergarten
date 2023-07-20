import './add-project.styles.scss';

import { useState, useContext, useEffect, useRef } from 'react';

import { TogglesContext } from '../../contexts/toggles.context';

import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as Tick } from '../../assets/icons/tick.svg';

const AddProject = () => {

    const { isAddProject, setIsAddProject } = useContext(TogglesContext)

    const openAddProjectHandler = () => {
        setIsAddProject(!isAddProject);
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
        <div className='add-project-container'>
            <div className='add-bg' onClick={openAddProjectHandler}></div>
            <div className='add-project'>
                <div className='add-project-header'>
                    <button className='close-btn' onClick={openAddProjectHandler}>
                        <Close />
                    </button>
                    <h1>إضافة مشروع تربوي</h1>
                </div>
                <div className='add-project-body'>
                    <form className='add-project-form'>
                        <div className='input-div'>
                            <input id='task-name' type="text" value={task_name} onChange={handleChangeInput(setTask_name)} />
                            <label htmlFor="">
                                إسم النشاط
                            </label>
                        </div>
                        <div className='input-div'>
                            <input id='task-time' type="text" value={task_time} onChange={handleChangeInput(setTask_time)} />
                            <label htmlFor="">
                                التوقيت
                            </label>
                        </div>
                        <div className='input-div'>
                            <input id='task-reference' type="text" value={task_reference} onChange={handleChangeInput(setTask_reference)} />
                            <label htmlFor="">
                                المرجع
                            </label>
                        </div>
                        <div className='input-div'>
                            <input id='task-goal' type="text" value={task_goal} onChange={handleChangeInput(setTask_goal)} />
                            <label htmlFor="">
                                هدف النشاط
                            </label>
                        </div>
                        <div className='input-div'>
                            <input id='demarche' type="text" value={demarche} onChange={handleChangeInput(setDemarche)} />
                            <label htmlFor="">
                                التمشي البيداغوجي
                            </label>
                        </div>
                        <div className='input-div'>
                            <input id='createtion-date' type="date" value={creation_date} onChange={handleChangeInput(setCreation_date)} />
                            <label htmlFor="">
                                تاريخ الإنجاز
                            </label>
                        </div>
                        <div className='input-div'>
                            <input id='tools' type="text" value={tools} onChange={handleChangeInput(setTools)} />
                            <label htmlFor="">
                                الوسائل والمحامل
                            </label>
                        </div>
                        <div className='input-div'>
                            <input id='paper-number' type="text" value={paper_number} onChange={handleChangeInput(setPaper_number)} />
                            <label htmlFor="">
                                عدد الجذاذة التقنية
                            </label>
                        </div>
                        <div className='input-div'>
                            <input id='notes' type="text" value={notes} onChange={handleChangeInput(setNotes)} />
                            <label htmlFor="">
                                الملاحظات والتقييم
                            </label>
                        </div>
                    </form>
                    <div className='buttons-container'>
                        <button onClick={openAddProjectHandler}>
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

export default AddProject;