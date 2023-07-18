import './update-cadre.styles.scss'
import { useState, useContext, useEffect, useRef } from 'react';

import { TogglesContext } from '../../contexts/toggles.context';

import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as Tick } from '../../assets/icons/tick.svg';


const UpdateCadre = ({ cadre }) => {

    const { isUpdateCadre, setIsUpdateCadre } = useContext(TogglesContext)

    const openUpdateCadreHandler = () => {
        setIsUpdateCadre(!isUpdateCadre);
    }

    const [teacher_first, setTeacher_first] = useState(cadre.teacher_first);
    const [teacher_last, setTeacher_last] = useState(cadre.teacher_last);
    const [cin, setCin] = useState(cadre.cin);
    const [validation_date, setValidation_date] = useState(cadre.validation_date);
    const [matricule, setMatricule] = useState(cadre.matricule);
    const [birthday, setBirthday] = useState(cadre.birthday);
    const [gender, setGender] = useState(cadre.gender);
    const [study_level, setStudy_level] = useState(cadre.study_level);
    const [degree, setDegree] = useState(cadre.degree);

    const handleChangeInput = (fn) => {
        return (event) => {
            fn(event.target.value);
        };
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform form submission logic here
        console.log('Form submitted:', {
            teacher_first,
            teacher_last,
            cin,
            validation_date,
            matricule,
            birthday,
            gender,
            study_level,
            degree,
        });
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
                <div className='update-cadre-body'>
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
                    <div className='buttons-container'>
                        <button onClick={openUpdateCadreHandler}>
                            <h1>إلغاء</h1>
                            <Close />
                        </button>
                        <button onClick={handleSubmit}>
                            <h1>تعديل</h1>
                            <Tick />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default UpdateCadre;