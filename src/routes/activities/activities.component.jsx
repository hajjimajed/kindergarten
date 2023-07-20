import './activities.styles.scss'
import { useState, useContext, useEffect, useRef, Fragment } from 'react';
import { TogglesContext } from '../../contexts/toggles.context';

import { ReactComponent as Pencil } from '../../assets/icons/pencil.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { ReactComponent as Filter } from '../../assets/icons/filter.svg';
import { ReactComponent as Paper } from '../../assets/icons/paper.svg';
import { ReactComponent as AddUser } from '../../assets/icons/add-user.svg';
import { ReactComponent as Clock } from '../../assets/icons/clock.svg';
import { ReactComponent as Alphabet } from '../../assets/icons/alphabet.svg';

import SearchBox from '../../components/search-box/search-box.component';
import DeleteConfirmActivity from '../../components/delete-confirm-activity/delete-confirm-activity.component';
import AddActivity from '../../components/add-activity/add-activity.component';
import UpdateActivity from '../../components/update-activity/update-activity.component';


const data = [
    {
        task_name: "مهمة 1", task_time: "2 ساعات", creation_date: "2023-07-10", task_reference: "مرجع 123", task_goal: "هدف مهمة 1", demarche: "طريقة مهمة 1", tools: "أدوات مهمة 1", paper_number: "رقم وثيقة 1", notes: "ملاحظات مهمة 1",
    },
    {
        task_name: "مهمة 2", task_time: "3 ساعات", creation_date: "2023-05-10", task_reference: "مرجع 456", task_goal: "هدف مهمة 2", demarche: "طريقة مهمة 2", tools: "أدوات مهمة 2", paper_number: "رقم وثيقة 2", notes: "ملاحظات مهمة 2",
    },
];


const Activities = () => {

    const { isAddActivity, setIsAddActivity, isUpdateActivity, setIsUpdateActivity, dConfirmationActivity, setDConfirmationActivity } = useContext(TogglesContext);

    const addActivityHandler = () => {
        setIsAddActivity(!isAddActivity);
    }

    const [selectedactivity, setSelectedactivity] = useState(null);

    const updateactivityHandler = (row) => {
        setSelectedactivity(row);
        setIsUpdateActivity(!isUpdateActivity);
    };

    const deleteConfirmOpen = (row) => {
        setSelectedactivity(row);
        setDConfirmationActivity(!dConfirmationActivity);
    }

    const [isopenFilter, setIsOpenFilter] = useState(false);
    const filterRef = useRef(null);
    const [filteredData, setFilteredData] = useState(data);

    const openFilterHandler = () => {
        setIsOpenFilter(!isopenFilter);
    }

    useEffect(() => {
        const handleOutsideFilter = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsOpenFilter(false);
            }
        }

        document.addEventListener('click', handleOutsideFilter);

        return () => {
            document.removeEventListener('click', handleOutsideFilter);
        }

    }, [])

    function getCurrentDateTime() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        const dateTime = `${day}/${month}/${year} ${hours}:${minutes}`;
        return dateTime;
    }

    const currentDateTime = getCurrentDateTime();



    const filterByDateHandler = () => {
        const sortedData = data.sort((a, b) => new Date(a.creation_date) - new Date(b.creation_date));
        setFilteredData([...sortedData]);
    };

    const filterByAlphabeticHandler = () => {
        const sortedData = data.sort((a, b) => a.task_name.localeCompare(b.task_name));
        setFilteredData([...sortedData]);
    };

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    useEffect(() => {
        function handleResize() {
            setIsSmallScreen(window.innerWidth <= 800);
        }

        // Add event listener to listen for window resize
        window.addEventListener('resize', handleResize);

        // Call handleResize once on component mount
        handleResize();

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='activities-container'>
            <div className='top-container'>
                <div className='top-container-header'>
                    <h1>قاعدة بيانات الأنشطة اليومية</h1>
                </div>
                <div className='top-container-body'>
                    <button className='print-btn' >
                        <h1>طباعة</h1>
                        <Paper />
                    </button>
                    <button className='add-btn' onClick={addActivityHandler} >
                        <h1>أضف</h1>
                        <AddUser />
                    </button>
                </div>
            </div>

            <div className='activities-list'>
                <div className='activities-list-header'>
                    {
                        isSmallScreen ? (<h2>search</h2>) : (<SearchBox />)
                    }
                    <h1>قائمة الأنشطة اليومية</h1>
                </div>
                <div className='filter' ref={filterRef}>
                    <button className='filterBtn' onClick={openFilterHandler}>
                        <h1>عرض</h1>
                        <Filter></Filter>
                    </button>
                    {
                        isopenFilter && (
                            <div onClick={openFilterHandler} className='filters-list'>
                                <div className='filter-item' onClick={filterByDateHandler}>
                                    <h1>حسب التاريخ</h1>
                                    <Clock />
                                </div>
                                <div className='filter-item' onClick={filterByAlphabeticHandler}>
                                    <h1>حسب الحروف</h1>
                                    <Alphabet />
                                </div>
                            </div>
                        )
                    }
                </div>
                {
                    isSmallScreen ? (
                        filteredData.map((row, index) => (
                            <table key={index} className='shrinked-activity-table'>
                                <tbody>
                                    <tr>
                                        <td>{row.task_name}</td>
                                        <td>إسم النشاط</td>
                                    </tr>
                                    <tr>
                                        <td>{row.task_time}</td>
                                        <td>التوقيت</td>
                                    </tr>
                                    <tr>
                                        <td>{row.creation_date}</td>
                                        <td>تاريخ الإنجاز</td>
                                    </tr>
                                    <tr>
                                        <td>{row.task_goal}</td>
                                        <td>هدف النشاط</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='action-btns'>
                                                <button onClick={() => deleteConfirmOpen(row)}>
                                                    <Delete />
                                                </button>
                                                <button onClick={() => updateactivityHandler(row)}>
                                                    <Pencil />
                                                </button>
                                            </div>
                                        </td>
                                        <td>الإجراءت</td>
                                    </tr>
                                </tbody>
                            </table>
                        ))
                    ) :
                        (
                            <table className='activities-list-table'>
                                <thead>
                                    <tr>
                                        <th>الإجراءت</th>
                                        <th>هدف النشاط</th>
                                        <th>تاريخ الإنجاز</th>
                                        <th>التوقيت</th>
                                        <th>إسم النشاط</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {filteredData.map((row, index) => (
                                        <Fragment key={index}>
                                            <tr key={index}>
                                                <td>
                                                    <div className='action-btns'>
                                                        <button onClick={() => deleteConfirmOpen(row)}>
                                                            <Delete />
                                                        </button>
                                                        <button onClick={() => updateactivityHandler(row)}>
                                                            <Pencil />
                                                        </button>
                                                    </div>
                                                </td>

                                                <td>{row.task_goal}</td>
                                                <td>{row.creation_date}</td>
                                                <td>{row.task_time}</td>
                                                <td>{row.task_name}</td>
                                            </tr>
                                        </Fragment>
                                    ))}

                                </tbody>
                            </table>
                        )
                }

                {isUpdateActivity && <UpdateActivity activity={selectedactivity} />}
                {dConfirmationActivity && <DeleteConfirmActivity activity={selectedactivity} />}
            </div>
            {
                isAddActivity && <AddActivity />
            }

        </div>
    )

}

export default Activities;