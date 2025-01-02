import './update-project.styles.scss';
import { useState, useContext, useEffect, useRef } from 'react';
import { TogglesContext } from '../../contexts/toggles.context';
import { IsDoneContext } from '../../contexts/isDone.context';
import config from '../../config';
import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as Tick } from '../../assets/icons/tick.svg';
import Loader from '../loader/loader.component';

const UpdateProject = ({ project }) => {

    const { isUpdateProject, setIsUpdateProject } = useContext(TogglesContext);
    const { isDoneProject, setIsDoneProject } = useContext(IsDoneContext);

    const [isLoading, setIsLoading] = useState(false);

    const openUpadteProjectHandler = () => {
        setIsUpdateProject(!isUpdateProject);
        setIsDoneProject(false);
    }


    const [title, setTitle] = useState(project.title);
    const [references, setReferences] = useState(project.references);
    const [ages, setAges] = useState(project.ages);
    const [project_reasons, setProject_reasons] = useState(project.project_reasons);
    const [knowledge_reasons, setKnowledge_reasons] = useState(project.knowladge_reasons);
    const [mvnmt_reasons, setMvnmt_reasons] = useState(project.mvnmt_reasons);
    const [social_reasons, setSocial_reasons] = useState(project.social_reasons);
    const [artistic_reason, setArtistic_reason] = useState(project.artistic_reasons);
    const [logistic_tools, setLogistic_tools] = useState(project.logistic_tools);
    const [duration, setDuration] = useState(project.duration);
    const [creation_date, setCreation_date] = useState(project.creation_date);
    const [people, setPeople] = useState(project.people);
    const [spaces, setSpaces] = useState(project.spaces);
    const [activities, setActivities] = useState(project.activities);
    const [finalizing, setFinalizing] = useState(project.finalizing);
    const [evaluation, setEvaluation] = useState(project.evaluation);
    const [pedagoinvests1, setPedagoinvests1] = useState(project.pedagoinvests1);
    const [pedagoinvests2, setPedagoinvests2] = useState(project.pedagoinvests2);
    const [pedagoinvests3, setPedagoinvests3] = useState(project.pedagoinvests3);
    const [pedagoinvests4, setPedagoinvests4] = useState(project.pedagoinvests4);

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


    const updateProject = async () => {
        setIsLoading(true);
        await fetchToken();
        try {
            const token = localStorage.getItem('accessToken');
            const userData = JSON.parse(localStorage.getItem('userData'));
            const response = await fetch(config.BASE_URL + `api/singleProjects/updateproject?id=${project.project_id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "project_id": project.project_id,
                    "title": title,
                    "references": references,
                    "ages": ages,
                    "project_reasons": project_reasons,
                    "knowladge_reasons": knowledge_reasons,
                    "mvnmt_reasons": mvnmt_reasons,
                    "social_reasons": social_reasons,
                    "artistic_reasons": artistic_reason,
                    "logistic_tools": logistic_tools,
                    "duration": duration,
                    "creation_date": creation_date,
                    "people": people,
                    "spaces": spaces,
                    "activities": activities,
                    "finalizing": finalizing,
                    "evaluation": evaluation,
                    "pedagoinvests1": pedagoinvests1,
                    "pedagoinvests2": pedagoinvests2,
                    "pedagoinvests3": pedagoinvests3,
                    "pedagoinvests4": pedagoinvests4,
                }),
            });

            if (response.status === 200) {
                console.log('project updated successfully.');
                setIsLoading(false);
                setIsDoneProject(true);
            } else if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                const res = await response.json();
                setIsLoading(false);
                setIsDoneProject(true);
                console.log('project updated successfully', res);
            }

        } catch (error) {
            console.error('Error updating project:', error);
        }
    };



    return (
        <div className='update-project-container'>
            <div className='update-bg' onClick={openUpadteProjectHandler}></div>
            <div className='update-project'>
                <div className='update-project-header'>
                    <button className='close-btn' onClick={openUpadteProjectHandler}>
                        <Close />
                    </button>
                    <h1>تعديل مشروع تربوي</h1>
                </div>
                {
                    isDoneProject ? (
                        <div className='confirmed'>
                            <Tick />
                            <h1>لقد تم تعديل المشروع بنجاح</h1>
                        </div>
                    ) : (
                        <div className='update-project-body'>
                            {
                                isLoading ? (
                                    <Loader />
                                ) : (
                                    <form className='update-project-form'>
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
                                                تاريخ الإنجاز
                                            </label>
                                            <input id='date' type="date" value={creation_date} onChange={handleChangeInput(setCreation_date)} />
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
                                        <div className='input-div'>
                                            <label htmlFor="">
                                                الوسيلة الرابعة
                                            </label>
                                            <input id='tools' type="text" value={pedagoinvests3} onChange={handleChangeInput(setPedagoinvests3)} />
                                        </div>
                                    </form>
                                )
                            }
                            <div className='buttons-container'>
                                <button onClick={openUpadteProjectHandler}>
                                    <h1>إلغاء</h1>
                                    <Close />
                                </button>
                                <button onClick={updateProject}>
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

export default UpdateProject;