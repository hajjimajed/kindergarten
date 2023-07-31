import './add-child.styles.scss';
import { useState, useContext, useEffect, useRef } from 'react';

import { TogglesContext } from '../../contexts/toggles.context';
import { IsDoneContext } from '../../contexts/isDone.context';

import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as Tick } from '../../assets/icons/tick.svg';
import Loader from '../loader/loader.component';

const AddChild = () => {

    const { isAddChild, setIsAddChild } = useContext(TogglesContext);
    const { isDone, setIsDone } = useContext(IsDoneContext);
    const [isLoading, setIsLoading] = useState(false);

    const addChildRef = useRef(null);

    const openAddChildHandler = () => {
        setIsAddChild(!isAddChild);
        setIsDone(false);
    }


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [parentName, setParentName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState("ذكر");
    const [paidAt, setPaidAt] = useState('');

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

    const addChild = async () => {
        await fetchToken();

        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch('https://paje.onrender.com/api/kids/createkid', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "first_name": firstName,
                    "last_name": lastName,
                    "parent_name": parentName,
                    "age": age,
                    "gender": gender,
                    "paid_at": paidAt
                }),
            });

            if (response.status === 200) {
                console.log('Child added successfully.');
                setIsLoading(false);
                setIsDone(true);
            } else if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                const res = await response.json();
                setIsLoading(false);
                setIsDone(true);
                console.log('Child added successfully', res);
            }

        } catch (error) {
            console.error('Error adding child:', error);
        }
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
                {
                    isDone ? (
                        <div className='confirmed'>
                            <Tick />
                            <h1>لقد تم إضافة الطفل بنجاح</h1>
                        </div>
                    ) : (
                        <div className='add-child-body'>
                            {
                                isLoading ? (
                                    <Loader />
                                ) : (
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
                                )
                            }

                            <div className='buttons-container'>
                                <button onClick={openAddChildHandler}>
                                    <h1>إلغاء</h1>
                                    <Close />
                                </button>
                                <button onClick={addChild}>
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

export default AddChild;