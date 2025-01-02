import './update-cadre.styles.scss'
import { useState, useContext, useRef } from 'react';
import config from '../../config';
import { TogglesContext } from '../../contexts/toggles.context';
import { IsDoneContext } from '../../contexts/isDone.context';
import Loader from '../loader/loader.component';

import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as Tick } from '../../assets/icons/tick.svg';


const UpdateCadre = ({ cadre }) => {

    const { isUpdateCadre, setIsUpdateCadre } = useContext(TogglesContext);
    const { isDoneCadre, setIsDoneCadre } = useContext(IsDoneContext);
    const [isLoading, setIsLoading] = useState(false);

    const openUpdateCadreHandler = () => {
        setIsUpdateCadre(!isUpdateCadre);
        setIsDoneCadre(false);
    }

    const [teacher_first, setTeacher_first] = useState(cadre.teacher_first);
    const [teacher_last, setTeacher_last] = useState(cadre.teacher_last);
    const [cin, setCin] = useState(cadre.cin);
    const [validation_date, setValidation_date] = useState(cadre.validation_date);
    const [matricule, setMatricule] = useState(cadre.matricule);
    const [birthday, setBirthday] = useState(cadre.birthday.split("T")[0]);
    const [gender, setGender] = useState(cadre.gender || "ذكر");
    const [study_level, setStudy_level] = useState(cadre.study_level);
    const [degree, setDegree] = useState(cadre.degree);

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

    const updateCadre = async () => {
        setIsLoading(true);
        await fetchToken();
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(config.BASE_URL + `api/teacher/updateteacher?id=${cadre.teacher_id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "teacher_first": teacher_first,
                    "teacher_last": teacher_last,
                    "cin": cin,
                    "validation_date": validation_date,
                    "matricule": matricule,
                    "birthday": birthday,
                    "gender": gender,
                    "study_level": study_level,
                    "degree": degree,
                }),
            });

            if (response.status === 200) {
                console.log('Cadre updated successfully.');
                setIsLoading(false);
                setIsDoneCadre(true);
            } else if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                const res = await response.json();
                setIsLoading(false);
                setIsDoneCadre(true);
                console.log('Cadre updated successfully', res);
            }

        } catch (error) {
            console.error('Error updating cadre:', error);
        }
    };


    return (
        <div className='update-cadre-container'>
            <div className='update-bg' onClick={openUpdateCadreHandler}></div>
            <div className='update-cadre'>
                <div className='update-cadre-header'>
                    <button className='close-btn' onClick={openUpdateCadreHandler}>
                        <Close />
                    </button>
                    <h1>تعديل معطيات الإطار</h1>
                </div>
                {
                    isDoneCadre ? (
                        <div className='confirmed'>
                            <Tick />
                            <h1>تم تعديل المعطيات بنجاح</h1>
                        </div>
                    ) : (
                        <div className='update-cadre-body'>
                            {
                                isLoading ? (
                                    <Loader />
                                ) : (
                                    <form className='update-cadre-form'>
                                        <label htmlFor="">
                                            الإسم
                                        </label>
                                        <input id='first-name' type="text" value={teacher_first} onChange={handleChangeInput(setTeacher_first)} />
                                        <label htmlFor="">
                                            اللقب
                                        </label>
                                        <input id='last-name' type="text" value={teacher_last} onChange={handleChangeInput(setTeacher_last)} />
                                        <label htmlFor="">
                                            تاريخ الولادة
                                        </label>
                                        <input id='birthday' type="date" value={birthday} onChange={handleChangeInput(setBirthday)} />
                                        <label htmlFor="">
                                            الجنس
                                        </label>
                                        <select id='gender' value={gender} onChange={handleChangeInput(setGender)}>
                                            <option value="ذكر">ذكر</option>
                                            <option value="أنثى">أنثى</option>
                                        </select>
                                        <label htmlFor="">
                                            ب.ت.و
                                        </label>
                                        <input id='cin' type="number" value={cin} onChange={handleChangeInput(setCin)} />
                                        <label htmlFor="">
                                            تاريخ الإصدار
                                        </label>
                                        <input id='date' type="date" value={validation_date} onChange={handleChangeInput(setValidation_date)} />
                                        <label htmlFor="">
                                            المعرف الوحيد
                                        </label>
                                        <input id='matricule' type="text" value={matricule} onChange={handleChangeInput(setMatricule)} />
                                        <label htmlFor="">
                                            المستوى التعليمي
                                        </label>
                                        <input id='education' type="text" value={study_level} onChange={handleChangeInput(setStudy_level)} />
                                        <label htmlFor="">
                                            الشهادة العلمية
                                        </label>
                                        <input id='degree' type="text" value={degree} onChange={handleChangeInput(setDegree)} />
                                    </form>
                                )
                            }
                            <div className='buttons-container'>
                                <button onClick={openUpdateCadreHandler}>
                                    <h1>إلغاء</h1>
                                    <Close />
                                </button>
                                <button onClick={updateCadre}>
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

export default UpdateCadre;