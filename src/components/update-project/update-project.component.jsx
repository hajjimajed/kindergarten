import './update-project.styles.scss';

import { useState, useContext, useEffect, useRef } from 'react';

import { TogglesContext } from '../../contexts/toggles.context';

import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as Tick } from '../../assets/icons/tick.svg';

const UpdateProject = ({ project }) => {

    const { isUpdateProject, setIsUpdateProject } = useContext(TogglesContext)

    const openUpdateProjectHandler = () => {
        setIsUpdateProject(!isUpdateProject);
    }


    const [title, setTitle] = useState(project.title);
    const [references, setReferences] = useState(project.references);
    const [ages, setAges] = useState(project.ages);
    const [project_reasons, setProject_reasons] = useState(project.project_reasons);
    const [knowledge_reasons, setKnowledge_reasons] = useState(project.knowledge_reasons);
    const [mvnmt_reasons, setMvnmt_reasons] = useState(project.mvnmt_reasons);
    const [social_reasons, setSocial_reasons] = useState(project.social_reasons);
    const [artistic_reason, setArtistic_reason] = useState(project.artistic_reason);
    const [logistic_tools, setLogistic_tools] = useState(project.logistic_tools);
    const [duration, setDuration] = useState(project.duration);
    const [people, setPeople] = useState(project.people);
    const [spaces, setSpaces] = useState(project.spaces);
    const [activities, setActivities] = useState(project.activities);
    const [finalizing, setFinalizing] = useState(project.finalizing);
    const [evaluation, setEvaluation] = useState(project.evaluation);
    const [pedagoinvests1, setPedagoinvests1] = useState(project.pedagoinvests1);
    const [pedagoinvests2, setPedagoinvests2] = useState(project.pedagoinvests2);
    const [pedagoinvests3, setPedagoinvests3] = useState(project.pedagoinvests3);

    const handleChangeInput = (fn) => {
        return (event) => {
            fn(event.target.value);
        };
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted:', {
            title,
            references,
            ages,
            project_reasons,
            knowledge_reasons,
            mvnmt_reasons,
            social_reasons,
            artistic_reason,
            logistic_tools,
            duration,
            people,
            spaces,
            activities,
            finalizing,
            evaluation,
            pedagoinvests1,
            pedagoinvests2,
            pedagoinvests3,
        });
    };



    return (
        <div className='add-project-container'>
            <div className='add-bg' onClick={openUpdateProjectHandler}></div>
            <div className='add-project'>
                <div className='add-project-header'>
                    <button className='close-btn' onClick={openUpdateProjectHandler}>
                        <Close />
                    </button>
                    <h1>إضافة مشروع تربوي</h1>
                </div>
                <div className='add-project-body'>
                    <form className='add-project-form'>
                        <div className='input-div'>
                            <label htmlFor="">
                                عنوان المشروع
                            </label>
                            <input id='task-name' type="text" value={title} onChange={handleChangeInput(setTitle)} />
                        </div>
                        <div className='input-div'>
                            <label htmlFor="">
                                الموارد و المراجع
                            </label>
                            <input id='task-time' type="text" value={references} onChange={handleChangeInput(setReferences)} />
                        </div>
                        <div className='input-div'>
                            <label htmlFor="">
                                الفئة العمرية
                            </label>
                            <input id='task-reference' type="text" value={ages} onChange={handleChangeInput(setAges)} />
                        </div>
                        <div className='input-div'>
                            <label htmlFor="">
                                مبررات المشروع
                            </label>
                            <input id='task-goal' type="text" value={project_reasons} onChange={handleChangeInput(setProject_reasons)} />
                        </div>
                        <div className='input-div'>
                            <label htmlFor="">
                                الأهداف المعرفية
                            </label>
                            <input id='demarche' type="text" value={knowledge_reasons} onChange={handleChangeInput(setKnowledge_reasons)} />
                        </div>
                        <div className='input-div'>
                            <label htmlFor="">
                                الأهداف الحسِ حركية
                            </label>
                            <input id='createtion-date' type="text" value={mvnmt_reasons} onChange={handleChangeInput(setMvnmt_reasons)} />
                        </div>
                        <div className='input-div'>
                            <label htmlFor="">
                                الأهداف الإجتماعية الإنفعالبة و الأخلاقية
                            </label>
                            <input id='tools' type="text" value={social_reasons} onChange={handleChangeInput(setSocial_reasons)} />
                        </div>
                        <div className='input-div'>
                            <label htmlFor="">
                                الأهداف الفنية و الإبداعية
                            </label>
                            <input id='task-reference' type="text" value={artistic_reason} onChange={handleChangeInput(setArtistic_reason)} />
                        </div>
                        <div className='input-div'>
                            <label htmlFor="">
                                الوسائل اللازمة + اللوجستيك
                            </label>
                            <input id='paper-number' type="text" value={logistic_tools} onChange={handleChangeInput(setLogistic_tools)} />                        </div>
                        <div className='input-div'>
                            <label htmlFor="">
                                مدة الإنجاز
                            </label>
                            <input id='notes' type="text" value={duration} onChange={handleChangeInput(setDuration)} />
                        </div>
                        <div className='input-div'>
                            <label htmlFor="">
                                الشركاء
                            </label>
                            <input id='task-name' type="text" value={people} onChange={handleChangeInput(setPeople)} />
                        </div>
                        <div className='input-div'>
                            <label htmlFor="">
                                الفضاءات
                            </label>
                            <input id='task-time' type="text" value={spaces} onChange={handleChangeInput(setSpaces)} />
                        </div>
                        <div className='input-div'>
                            <label htmlFor="">
                                الأنشطة
                            </label>
                            <input id='task-goal' type="text" value={activities} onChange={handleChangeInput(setActivities)} />
                        </div>
                        <div className='input-div'>
                            <label htmlFor="">
                                تتويج المشروع و إنهاؤه
                            </label>
                            <input id='demarche' type="text" value={finalizing} onChange={handleChangeInput(setFinalizing)} />
                        </div>
                        <div className='input-div'>
                            <label htmlFor="">
                                تقييم المشروع
                            </label>
                            <input id='createtion-date' type="text" value={evaluation} onChange={handleChangeInput(setEvaluation)} />
                        </div>
                        <div className='input-div'>
                            <label htmlFor="">
                                الوسيلة الأولى
                            </label>
                            <input id='tools' type="text" value={pedagoinvests1} onChange={handleChangeInput(setPedagoinvests1)} />
                        </div>
                        <div className='input-div'>
                            <label htmlFor="">
                                الوسيلة الثانية
                            </label>
                            <input id='tools' type="text" value={pedagoinvests2} onChange={handleChangeInput(setPedagoinvests2)} />
                        </div>
                        <div className='input-div'>
                            <label htmlFor="">
                                الوسيلة الثالثة
                            </label>
                            <input id='tools' type="text" value={pedagoinvests3} onChange={handleChangeInput(setPedagoinvests3)} />
                        </div>
                    </form>
                    <div className='buttons-container'>
                        <button onClick={openUpdateProjectHandler}>
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

export default UpdateProject;