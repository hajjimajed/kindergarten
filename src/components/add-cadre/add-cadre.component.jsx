import './add-cadres.styles.scss';

import { useState, useContext, useEffect, useRef } from 'react';

import { TogglesContext } from '../../contexts/toggles.context';
import { IsDoneContext } from '../../contexts/isDone.context';

import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as Tick } from '../../assets/icons/tick.svg';
import Loader from '../loader/loader.component';

const AddCadre = () => {

    const { isAddCadre, setIsAddCadre } = useContext(TogglesContext);
    const { isDoneCadre, setIsDoneCadre } = useContext(IsDoneContext);
    const [isLoading, setIsLoading] = useState(false);

    const openAddCadreHandler = () => {
        setIsAddCadre(!isAddCadre);
        setIsDoneCadre(false);
    }


    const [teacher_first, setTeacher_first] = useState('');
    const [teacher_last, setTeacher_last] = useState('');
    const [cin, setCin] = useState('');
    const [validation_date, setValidation_date] = useState('');
    const [matricule, setMatricule] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState("ذكر");
    const [study_level, setStudy_level] = useState('');
    const [degree, setDegree] = useState('');

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

    const addCadre = async () => {
        await fetchToken();

        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch('https://paje.onrender.com/api/teacher/createteacher', {
                method: 'POST',
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
                console.log('Cadre added successfully.');
                setIsLoading(false);
                setIsDoneCadre(true);
            } else if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                const res = await response.json();
                setIsLoading(false);
                setIsDoneCadre(true);
                console.log('Cadre added successfully', res);
            }

        } catch (error) {
            console.error('Error adding cadre:', error);
        }
    };


    return (
        <div className='add-cadre-container'>
            <div className='add-bg' onClick={openAddCadreHandler}></div>
            <div className='add-cadre'>
                <div className='add-cadre-header'>
                    <button className='close-btn' onClick={openAddCadreHandler}>
                        <Close />
                    </button>
                    <h1>إضافة إطار</h1>
                </div>
                {
                    isDoneCadre ? (
                        <div className='confirmed'>
                            <Tick />
                            <h1>لقد تم إضافة الطفل بنجاح</h1>
                        </div>
                    ) : (
                        <div className='add-cadre-body'>
                            {
                                isLoading ? (
                                    <Loader />
                                ) : (
                                    <form className='add-cadre-form'>
                                        <label htmlFor="">
                                            الإسم
                                        </label>
                                        <input id='first-name' type="text" value={teacher_first} onChange={handleChangeInput(setTeacher_first)} />
                                        <label htmlFor="">
                                            اللقب
                                        </label>
                                        <input id='last-name' type="text" value={teacher_last} onChange={handleChangeInput(setTeacher_last)} />
                                        <label htmlFor="">
                                            ب.ت.و
                                        </label>
                                        <input id='cin' type="text" value={cin} onChange={handleChangeInput(setCin)} />
                                        <label htmlFor="">
                                            تاريخ الإصدار
                                        </label>
                                        <input id='date' type="text" value={validation_date} onChange={handleChangeInput(setValidation_date)} />
                                        <label htmlFor="">
                                            المعرف الوحيد
                                        </label>
                                        <input id='matricule' type="text" value={matricule} onChange={handleChangeInput(setMatricule)} />
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
                                <button onClick={openAddCadreHandler}>
                                    <h1>إلغاء</h1>
                                    <Close />
                                </button>
                                <button onClick={addCadre}>
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

export default AddCadre;