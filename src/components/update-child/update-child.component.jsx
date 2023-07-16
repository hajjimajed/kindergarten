import './update-child.styles.scss';
import { useState, useContext, useEffect, useRef } from 'react';

import { TogglesContext } from '../../contexts/toggles.context';

import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as Tick } from '../../assets/icons/tick.svg';


const UpdateChild = ({ child }) => {

    const { isUpdateChild, setIsUpdateChild } = useContext(TogglesContext)

    const updateChildRef = useRef(null);

    const openUpdateChildHandler = () => {
        setIsUpdateChild(!isUpdateChild);
    }

    const [firstName, setFirstName] = useState(child.first_name);
    const [lastName, setLastName] = useState(child.last_name);
    const [parentName, setParentName] = useState(child.parent_name);
    const [age, setAge] = useState(child.age);
    const [gender, setGender] = useState(child.gender);
    const [paidAt, setPaidAt] = useState(child.paid_at);

    const handleChangeInput = (fn) => {
        return (event) => {
            fn(event.target.value);
        };
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform form submission logic here
        console.log('Form submitted:', {
            firstName,
            lastName,
            parentName,
            age,
            gender,
            paidAt,
        });
    };


    return (
        <div className='update-child-container'>
            <div className='update-bg' onClick={openUpdateChildHandler}></div>
            <div className='update-child' ref={updateChildRef}>
                <div className='update-child-header'>
                    <button className='close-btn' onClick={openUpdateChildHandler}>
                        <Close />
                    </button>
                    <h1>تعديل معطيات الطفل</h1>
                </div>
                <div className='update-child-body'>
                    <form className='update-child-form'>
                        <label htmlFor="">
                            الإسم
                        </label>
                        <input id='first-name' type="text" value={firstName} onChange={handleChangeInput(setFirstName)} />
                        <label htmlFor="">
                            اللقب
                        </label>
                        <input id='last-name' type="text" value={lastName} onChange={handleChangeInput(setLastName)} />
                        <label htmlFor="">
                            إسم الولي
                        </label>
                        <input id='parent-name' type="text" value={parentName} onChange={handleChangeInput(setParentName)} />
                        <label htmlFor="">
                            العمر
                        </label>
                        <input id='age' type="number" value={age} onChange={handleChangeInput(setAge)} />
                        <label htmlFor="">
                            الجنس
                        </label>
                        <select id='gender' value={gender} onChange={handleChangeInput(setGender)}>
                            <option value="ذكر">ذكر</option>
                            <option value="أنثى">أنثى</option>
                        </select>
                        <label htmlFor="">
                            التاريخ
                        </label>
                        <input id='date' type="date" value={paidAt} onChange={handleChangeInput(setPaidAt)} />
                    </form>
                    <div className='buttons-container'>
                        <button onClick={openUpdateChildHandler}>
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

export default UpdateChild;