import './children.styles.scss';
import { useState, useContext, useEffect, useRef } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';

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
import ChildPDF from '../../components/child-pdf/child-pdf.component';

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

    const updateChildHandler = () => {
        setIsUpdateChild(!isUpdateChild)
    }

    const [isopenFilter, setIsOpenFilter] = useState(false);
    const filterRef = useRef(null);

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


    const [isPDFGenerating, setIsPDFGenerating] = useState(false);

    const handlePDFGenerate = () => {
        setIsPDFGenerating(true);
    };

    return (
        <div className='children-container'>
            <div className='top-container'>
                <div className='top-container-header'>
                    <h1>قاعدة بيانات الأطفال</h1>
                </div>
                <div className='top-container-body'>
                    <PDFDownloadLink className='pdf-area' document={<ChildPDF childrenData={data} />} fileName='children-list.pdf'>

                        <button className='print-btn' onClick={handlePDFGenerate}>
                            <h1>طباعة</h1>
                            <Paper />
                        </button>

                    </PDFDownloadLink>
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
                                <div className='filter-item'>
                                    <h1>حسب التاريخ</h1>
                                    <Clock />
                                </div>
                                <div className='filter-item'>
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

                        {data.map((row, index) => (
                            <>
                                <tr key={index}>
                                    <td>
                                        <div className='action-btns'>
                                            <button onClick={deleteConfirmOpen}>
                                                <Delete />
                                            </button>
                                            <button onClick={updateChildHandler}>
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
                                {
                                    isUpdateChild && <UpdateChild child={row} />
                                }
                            </>
                        ))}

                    </tbody>
                </table>
            </div>
            {
                isAddChild && <AddChild />
            }
        </div>
    )

}

export default Children;