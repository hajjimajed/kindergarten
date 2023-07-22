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

    const printActivitiesInfo = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>قائمة الأنشطة اليومية</title></head><body>');
        printWindow.document.write('<style>@page { size: A4; margin: 0; }</style>');
        printWindow.document.write(`
    <style>
        body {
            margin: 20px;
        }
        h1 {
            text-align: center;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 8px;
            text-align: right;
        }
        th {
            background-color: #e5e5e5 !important;
            border-bottom: 1px solid #e5e5e5;
            border-top: 1px solid #e5e5e5;
        }
        td {
            border-bottom: 1px solid #e5e5e5;
        }
        td:first-child, th:first-child{
            border-left: 1px solid #e5e5e5;
        }
        td:last-child, th:last-child{
            border-right: 1px solid #e5e5e5;
        }
        svg{
            width:50px;
            height:auto;
        }
        div{
            width:100%;
            height:60px;
            display: flex;
            justify-content:space-between;
            align-items:center;
        }
        .date{
            width:75px
        }
    </style>
`);
        printWindow.document.write('<div>');
        printWindow.document.write(`<p>${currentDateTime}</p>`);
        printWindow.document.write('<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#e63946" stroke="none"><path d="M249 4206 c-134 -54 -216 -157 -239 -297 -14 -89 -14 -2610 1 -2699 20 -126 102 -234 217 -288 l57 -27 2275 0 2275 0 57 27 c117 55 198 163 218 294 7 47 10 489 8 1389 -3 1259 -4 1322 -22 1371 -37 104 -127 194 -231 233 l-56 21 -2252 0 -2252 0 -56 -24z m2531 -787 c115 -26 266 -103 359 -181 309 -261 403 -701 226 -1065 -217 -446 -763 -627 -1202 -399 -224 117 -390 325 -454 571 -30 113 -30 317 0 430 67 253 246 472 477 581 193 92 382 112 594 63z"/><path d="M2429 3160 c-182 -46 -338 -172 -416 -335 -84 -178 -82 -362 6 -540 50 -101 112 -171 205 -233 105 -70 177 -93 311 -99 120 -6 196 8 290 51 55 25 179 115 171 124 -3 3 -32 -7 -64 -21 -137 -62 -279 -59 -420 8 -191 90 -309 313 -274 518 56 326 397 514 694 380 32 -14 61 -24 64 -21 12 12 -137 110 -211 140 -72 28 -93 32 -200 34 -66 2 -136 -1 -156 -6z"/><path d="M2637 2903 c-4 -3 -7 -61 -7 -127 l0 -121 -117 -40 c-159 -54 -159 -64 -1 -118 l117 -40 3 -126 c3 -118 4 -126 23 -129 15 -2 37 20 90 92 39 53 75 95 80 96 6 0 59 -16 119 -35 84 -26 113 -32 123 -23 18 15 15 21 -61 127 -36 50 -66 93 -66 96 0 3 30 46 66 96 76 106 79 112 61 127 -11 9 -38 4 -123 -23 -60 -19 -113 -35 -119 -35 -5 0 -41 43 -78 95 -63 88 -90 109 -110 88z"/></g></svg>');
        printWindow.document.write('</div>');
        printWindow.document.write('<br />');
        printWindow.document.write('<h1>قائمة الأنشطة اليومية</h1>');
        printWindow.document.write('<br />');
        printWindow.document.write('<br />');
        printWindow.document.write('<table>');
        printWindow.document.write('<tr><th>هدف النشاط</th><th>تاريخ الإنجاز</th><th>التوقيت</th><th>إسم النشاط</th></tr>');

        data.forEach(activity => {
            printWindow.document.write('<tr>');
            printWindow.document.write(`<td>${activity.task_goal}</td>`);
            printWindow.document.write(`<td>${activity.creation_date}</td>`);
            printWindow.document.write(`<td>${activity.task_time}</td>`);
            printWindow.document.write(`<td>${activity.task_name}</td>`);
            printWindow.document.write('</tr>');
        });

        printWindow.document.write('</table>');
        printWindow.document.write('</body></html>');
        printWindow.print();
    };


    const printActivityInfo = (act) => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>بطاقة نشاط يومي</title></head><body>');
        printWindow.document.write('<style>@page { size: A4; margin: 0; }</style>');
        printWindow.document.write(`
    <style>
        body {
            margin: 20px;
        }
        h1 {
            text-align: center;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding:20px 8px;
            text-align: right;
            font-size:20px;
        }
        td {
            border-right: 1px solid #e5e5e5;
            border-left: 1px solid #e5e5e5;
            border-bottom: 1px solid #e5e5e5;
        }
        td:first-child{
            border-top: 1px solid #e5e5e5;
        }
        th {
            border-right: 1px solid #e5e5e5;
            border-bottom: 1px solid #e5e5e5;
        }
        th{
            border-top: 1px solid #e5e5e5;
        }
        svg{
            width:50px;
            height:auto;
        }
        div{
            width:100%;
            height:60px;
            display: flex;
            justify-content:space-between;
            align-items:center;
        }
        .date{
            width:75px
        }
    </style>
`);
        printWindow.document.write('<div>');
        printWindow.document.write(`<p>${currentDateTime}</p>`);
        printWindow.document.write('<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#e63946" stroke="none"><path d="M249 4206 c-134 -54 -216 -157 -239 -297 -14 -89 -14 -2610 1 -2699 20 -126 102 -234 217 -288 l57 -27 2275 0 2275 0 57 27 c117 55 198 163 218 294 7 47 10 489 8 1389 -3 1259 -4 1322 -22 1371 -37 104 -127 194 -231 233 l-56 21 -2252 0 -2252 0 -56 -24z m2531 -787 c115 -26 266 -103 359 -181 309 -261 403 -701 226 -1065 -217 -446 -763 -627 -1202 -399 -224 117 -390 325 -454 571 -30 113 -30 317 0 430 67 253 246 472 477 581 193 92 382 112 594 63z"/><path d="M2429 3160 c-182 -46 -338 -172 -416 -335 -84 -178 -82 -362 6 -540 50 -101 112 -171 205 -233 105 -70 177 -93 311 -99 120 -6 196 8 290 51 55 25 179 115 171 124 -3 3 -32 -7 -64 -21 -137 -62 -279 -59 -420 8 -191 90 -309 313 -274 518 56 326 397 514 694 380 32 -14 61 -24 64 -21 12 12 -137 110 -211 140 -72 28 -93 32 -200 34 -66 2 -136 -1 -156 -6z"/><path d="M2637 2903 c-4 -3 -7 -61 -7 -127 l0 -121 -117 -40 c-159 -54 -159 -64 -1 -118 l117 -40 3 -126 c3 -118 4 -126 23 -129 15 -2 37 20 90 92 39 53 75 95 80 96 6 0 59 -16 119 -35 84 -26 113 -32 123 -23 18 15 15 21 -61 127 -36 50 -66 93 -66 96 0 3 30 46 66 96 76 106 79 112 61 127 -11 9 -38 4 -123 -23 -60 -19 -113 -35 -119 -35 -5 0 -41 43 -78 95 -63 88 -90 109 -110 88z"/></g></svg>');
        printWindow.document.write('</div>');
        printWindow.document.write('<br />');
        printWindow.document.write('<h1>بطاقة نشاط يومي</h1>');
        printWindow.document.write('<br />');
        printWindow.document.write('<br />');
        printWindow.document.write('<table>');

        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${act.task_name}</td>`); // Left column with the data
        printWindow.document.write('<th>إسم النشاط</th>'); // Right column with the header
        printWindow.document.write('</tr>');

        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${act.task_reference}</td>`); // Left column with the data
        printWindow.document.write('<th>المرجع</th>'); // Right column with the header
        printWindow.document.write('</tr>');

        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${act.task_time}</td>`); // Left column with the data
        printWindow.document.write('<th>التوقيت</th>'); // Right column with the header
        printWindow.document.write('</tr>');

        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${act.creation_date}</td>`); // Left column with the data
        printWindow.document.write('<th>تاريخ الإنجاز</th>'); // Right column with the header
        printWindow.document.write('</tr>');

        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${act.task_goal}</td>`); // Left column with the data
        printWindow.document.write('<th>هدف النشاط</th>'); // Right column with the header
        printWindow.document.write('</tr>');

        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${act.demarche}</td>`); // Left column with the data
        printWindow.document.write('<th>التمشي البيداغوجي</th>'); // Right column with the header
        printWindow.document.write('</tr>');

        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${act.tools}</td>`); // Left column with the data
        printWindow.document.write('<th>الوسائل و المحامل</th>'); // Right column with the header
        printWindow.document.write('</tr>');

        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${act.paper_number}</td>`); // Left column with the data
        printWindow.document.write('<th>عدد الجذاذة التقنية</th>'); // Right column with the header
        printWindow.document.write('</tr>');

        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${act.notes}</td>`); // Left column with the data
        printWindow.document.write('<th>الملاحظات و التقييم</th>'); // Right column with the header
        printWindow.document.write('</tr>');

        printWindow.document.write('</table>');

        printWindow.document.write('</body></html>');
        printWindow.print();
    };

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

    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (value) => {
        setSearchQuery(value);
    };

    useEffect(() => {
        const filteredData = data.filter((activity) =>
            activity.task_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filteredData);
    }, [data, searchQuery]);

    return (
        <div className='activities-container'>
            <div className='top-container'>
                <div className='top-container-header'>
                    <h1>قاعدة بيانات الأنشطة اليومية</h1>
                </div>
                <div className='top-container-body'>
                    <button className='print-btn' onClick={printActivitiesInfo}>
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
                    <SearchBox onSearchChange={handleSearchChange} />
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
                                                <button onClick={() => printActivityInfo(row)}>
                                                    <Paper />
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
                                                        <button onClick={() => printActivityInfo(row)}>
                                                            <Paper />
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