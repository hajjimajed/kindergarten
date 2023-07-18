import './children.styles.scss';
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
import DeleteConfirm from '../../components/delete-confirm/delete-confirm.component';
import AddChild from '../../components/add-child/add-child.component';
import UpdateChild from '../../components/update-child/update-child.component';

const data = [
    { first_name: 'John', last_name: 'Doe', parent_name: 'Jane Doe', age: 25, gender: 'ذكر', paid_at: '2023-07-10', isPaid: false },
    { first_name: 'Alice', last_name: 'Smith', parent_name: 'Bob Smith', age: 32, gender: 'أنثى', paid_at: '2023-07-11', isPaid: true },
    { first_name: 'Michael', last_name: 'Johnson', parent_name: 'Emily Johnson', age: 42, gender: 'ذكر', paid_at: '2023-07-12', isPaid: false },
    { first_name: 'Sarah', last_name: 'Williams', parent_name: 'David Williams', age: 19, gender: 'أنثى', paid_at: '2023-07-13', isPaid: true },
    { first_name: 'James', last_name: 'Brown', parent_name: 'Linda Brown', age: 50, gender: 'ذكر', paid_at: '2023-07-14', isPaid: true },
    { first_name: 'Emma', last_name: 'Lee', parent_name: 'Robert Lee', age: 28, gender: 'أنثى', paid_at: '2023-07-15', isPaid: true },
];

const Children = () => {

    const { dConfirmation, setDConfirmation, isAddChild, setIsAddChild, isUpdateChild, setIsUpdateChild } = useContext(TogglesContext);

    const addChildHandler = () => {
        setIsAddChild(!isAddChild);
    }

    const [selectedChild, setSelectedChild] = useState(null);


    const updateChildHandler = (row) => {
        setSelectedChild(row);
        setIsUpdateChild(!isUpdateChild);
    };

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

    const deleteConfirmOpen = () => {
        setDConfirmation(!dConfirmation);
    }

    function getCurrentDateTime() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        const dateTime = `${day}/${month}/${year} ${hours}:${minutes}`;
        return dateTime;
    }

    const currentDateTime = getCurrentDateTime();


    const printChildInfo = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>القائمة الإسمية للأطفال</title></head><body>');
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
        img{
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
    </style>
`);
        printWindow.document.write('<div>');
        printWindow.document.write(`<p>${currentDateTime}</p>`);
        printWindow.document.write('<img src="https://i.ibb.co/KxLxc6G/tunisia.png" alt="Image">');
        printWindow.document.write('</div>');
        printWindow.document.write('<br />');
        printWindow.document.write('<h1>القائمة الإسمية للأطفال</h1>');
        printWindow.document.write('<br />');
        printWindow.document.write('<br />');
        printWindow.document.write('<table>');
        printWindow.document.write('<tr><th>الجنس</th><th>العمر</th><th>اسم الولي</th><th>اللقب</th><th>الإسم</th></tr>');

        data.forEach(child => {
            printWindow.document.write('<tr>');
            printWindow.document.write(`<td>${child.gender}</td>`);
            printWindow.document.write(`<td>${child.age}</td>`);
            printWindow.document.write(`<td>${child.parent_name}</td>`);
            printWindow.document.write(`<td>${child.last_name}</td>`);
            printWindow.document.write(`<td>${child.first_name}</td>`);
            printWindow.document.write('</tr>');
        });

        printWindow.document.write('</table>');
        printWindow.document.write('</body></html>');
        printWindow.print();
    };

    const filterByDateHandler = () => {
        const sortedData = data.sort((a, b) => new Date(a.paid_at) - new Date(b.paid_at));
        setFilteredData([...sortedData]); // Update filteredData state with sorted data
    };

    const filterByAlphabeticHandler = () => {
        const sortedData = data.sort((a, b) => a.first_name.localeCompare(b.first_name));
        setFilteredData([...sortedData]); // Update filteredData state with sorted data
    };

    return (
        <div className='children-container'>
            <div className='top-container'>
                <div className='top-container-header'>
                    <h1>قاعدة بيانات الأطفال</h1>
                </div>
                <div className='top-container-body'>
                    <button className='print-btn' onClick={printChildInfo}>
                        <h1>طباعة</h1>
                        <Paper />
                    </button>
                    <button className='add-btn' onClick={addChildHandler}>
                        <h1>أضف</h1>
                        <AddUser />
                    </button>
                </div>
            </div>
            <div className='children-list'>
                <div className='children-list-header'>
                    <SearchBox />
                    <h1>قائمة الأطفال</h1>
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
                <table className='children-list-table'>
                    <thead>
                        <tr>
                            <th>الإجراءت</th>
                            <th>الخلاص</th>
                            <th>تاريخ التسجيل</th>
                            <th>الجنس</th>
                            <th>العمر</th>
                            <th>إسم الولي</th>
                            <th>اللقب</th>
                            <th>الإسم</th>
                        </tr>
                    </thead>
                    <tbody>

                        {filteredData.map((row, index) => (
                            <Fragment key={index}>
                                <tr key={index}>
                                    <td>
                                        <div className='action-btns'>
                                            <button onClick={deleteConfirmOpen}>
                                                <Delete />
                                            </button>
                                            <button onClick={() => updateChildHandler(row)}>
                                                <Pencil />
                                            </button>
                                        </div>
                                    </td>
                                    <td className='status'>
                                        {
                                            row.isPaid ?
                                                (<div className='done'>
                                                    <p>نعم</p>
                                                </div>) :
                                                (<div className='pending'>
                                                    <p>لا</p>
                                                </div>)
                                        }
                                    </td>
                                    <td>{row.paid_at}</td>
                                    <td>{row.gender}</td>
                                    <td>{row.age}</td>
                                    <td>{row.parent_name}</td>
                                    <td>{row.last_name}</td>
                                    <td>{row.first_name}</td>
                                </tr>
                                {
                                    dConfirmation && (<DeleteConfirm child={row} />)
                                }

                            </Fragment>
                        ))}

                    </tbody>
                </table>
                {isUpdateChild && <UpdateChild child={selectedChild} />}
            </div>
            {
                isAddChild && <AddChild />
            }
        </div>
    )

}

export default Children;