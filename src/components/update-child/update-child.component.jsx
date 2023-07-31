import './update-child.styles.scss';
import { useState, useContext, useEffect, useRef } from 'react';

import { TogglesContext } from '../../contexts/toggles.context';
import { IsDoneContext } from '../../contexts/isDone.context';

import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as Tick } from '../../assets/icons/tick.svg';
import Loader from '../loader/loader.component';


const UpdateChild = ({ child }) => {

    const { isUpdateChild, setIsUpdateChild } = useContext(TogglesContext)
    const { isDone, setIsDone } = useContext(IsDoneContext);
    const [isLoading, setIsLoading] = useState(false);

    const updateChildRef = useRef(null);

    const openUpdateChildHandler = () => {
        setIsUpdateChild(!isUpdateChild);
        setIsDone(false);
    }

    const [firstName, setFirstName] = useState(child.first_name);
    const [lastName, setLastName] = useState(child.last_name);
    const [parentName, setParentName] = useState(child.parent_name);
    const [age, setAge] = useState(child.age);
    const [gender, setGender] = useState(child.gender || "ذكر");
    const [paidAt, setPaidAt] = useState(child.paid_at);



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

    const updateChild = async () => {
        await fetchToken();

        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`https://paje.onrender.com/api/kids/updatekid?id=${child.kid_id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "first_name": firstName,
                    "last_name": lastName,
                    "parent_name": parentName ? parentName : "dsds",
                    "age": age,
                    "gender": gender,
                    "paid_at": paidAt
                }),
            });

            if (response.status === 200) {
                console.log('Child updated successfully.');
                setIsLoading(false);
                setIsDone(true);
            } else if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                const res = await response.json();
                setIsLoading(false);
                setIsDone(true);
                console.log('Child updated successfully', res);
            }

        } catch (error) {
            console.error('Error updating child:', error);
        }
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
                {
                    isDone ? (
                        <div className='confirmed'>
                            <Tick />
                            <h1>لقد تم إضافة الطفل بنجاح</h1>
                        </div>
                    ) : (
                        <div className='update-child-body'>
                            {
                                isLoading ? (
                                    <Loader />
                                ) : (
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
                                )
                            }
                            <div className='buttons-container'>
                                <button onClick={openUpdateChildHandler}>
                                    <h1>إلغاء</h1>
                                    <Close />
                                </button>
                                <button onClick={updateChild}>
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

export default UpdateChild;