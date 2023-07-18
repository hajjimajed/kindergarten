import './add-cadres.styles.scss';

import { useState, useContext, useEffect, useRef } from 'react';

import { TogglesContext } from '../../contexts/toggles.context';

import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as Tick } from '../../assets/icons/tick.svg';

const AddCadre = () => {

    const { isAddCadre, setIsAddCadre } = useContext(TogglesContext)

    const openAddCadreHandler = () => {
        setIsAddCadre(!isAddCadre);
    }


    const [teacher_first, setTeacher_first] = useState('');
    const [teacher_last, setTeacher_last] = useState('');
    const [cin, setCin] = useState('');
    const [validation_date, setValidation_date] = useState('');
    const [matricule, setMatricule] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [study_level, setStudy_level] = useState('');
    const [degree, setDegree] = useState('');

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
        <div className='add-cadre-container'>
            <div className='add-bg' onClick={openAddCadreHandler}></div>
            <div className='add-cadre'>
                <div className='add-cadre-header'>
                    <button className='close-btn' onClick={openAddCadreHandler}>
                        <Close />
                    </button>
                    <h1>إضافة إطار</h1>
                </div>
                <div className='add-cadre-body'>
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
                    <div className='buttons-container'>
                        <button onClick={openAddCadreHandler}>
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

export default AddCadre;