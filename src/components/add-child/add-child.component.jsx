import './add-child.styles.scss';
import { useState, useContext, useEffect, useRef } from 'react';

import { TogglesContext } from '../../contexts/toggles.context';

import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as Tick } from '../../assets/icons/tick.svg';

const AddChild = () => {

    const { isAddChild, setIsAddChild } = useContext(TogglesContext)

    const addChildRef = useRef(null);

    const openAddChildHandler = () => {
        setIsAddChild(!isAddChild);
    }


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [parentName, setParentName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [paidAt, setPaidAt] = useState('');

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
        <div className='add-child-container'>
            <div className='add-bg' onClick={openAddChildHandler}></div>
            <div className='add-child' ref={addChildRef}>
                <div className='add-child-header'>
                    <button className='close-btn' onClick={openAddChildHandler}>
                        <Close />
                    </button>
                    <h1>إضافة طفل</h1>
                </div>
                <div className='add-child-body'>
                    <form className='add-child-form'>
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
                        <button onClick={openAddChildHandler}>
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

export default AddChild;