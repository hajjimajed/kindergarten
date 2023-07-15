import './children.styles.scss';
import { useState, useContext } from 'react';

import { TogglesContext } from '../../contexts/toggles.context';

import { ReactComponent as Pencil } from '../../assets/icons/pencil.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { ReactComponent as Filter } from '../../assets/icons/filter.svg';
import { ReactComponent as Paper } from '../../assets/icons/paper.svg';
import { ReactComponent as AddUser } from '../../assets/icons/add-user.svg';
import SearchBox from '../../components/search-box/search-box.component';
import DeleteConfirm from '../../components/delete-confirm/delete-confirm.component';

const data = [
    { firstName: 'John', lastName: 'Doe', parentName: 'Jane Doe', age: 25, gender: 'ذكر', date: '2023-07-10', payment: false },
    { firstName: 'Alice', lastName: 'Smith', parentName: 'Bob Smith', age: 32, gender: 'أنثى', date: '2023-07-11', payment: true },
    { firstName: 'Michael', lastName: 'Johnson', parentName: 'Emily Johnson', age: 42, gender: 'ذكر', date: '2023-07-12', payment: false },
    { firstName: 'Sarah', lastName: 'Williams', parentName: 'David Williams', age: 19, gender: 'أنثى', date: '2023-07-13', payment: true },
    { firstName: 'James', lastName: 'Brown', parentName: 'Linda Brown', age: 50, gender: 'ذكر', date: '2023-07-14', payment: true },
    { firstName: 'Emma', lastName: 'Lee', parentName: 'Robert Lee', age: 28, gender: 'أنثى', date: '2023-07-15', payment: true }
];

const Children = () => {

    const [isopenFilter, setIsOpenFilter] = useState(false);

    const openFilterHandler = () => {
        setIsOpenFilter(!isopenFilter);
    }

    const { dConfirmation, setDConfirmation } = useContext(TogglesContext);

    const deleteConfirmOpen = () => {
        setDConfirmation(!dConfirmation);
    }

    return (
        <div className='children-container'>
            <div className='top-container'>
                <div className='top-container-header'>
                    <h1>قاعدة بيانات الأطفال</h1>
                </div>
                <div className='top-container-body'>
                    <button>
                        <h1>طباعة</h1>
                        <Paper />
                    </button>
                    <button>
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
                <div className='filter'>
                    <button className='filterBtn' onClick={openFilterHandler}>
                        <Filter></Filter>
                        <h1>عرض</h1>
                    </button>
                    {
                        isopenFilter && (
                            <div onClick={openFilterHandler} className='filters-list'>

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
                                            <button>
                                                <Pencil />
                                            </button>
                                        </div>
                                    </td>
                                    <td className='status'>
                                        {
                                            row.payment ?
                                                (<div className='done'>
                                                    <p>نعم</p>
                                                </div>) :
                                                (<div className='pending'>
                                                    <p>لا</p>
                                                </div>)
                                        }
                                    </td>
                                    <td>{row.date}</td>
                                    <td>{row.gender}</td>
                                    <td>{row.age}</td>
                                    <td>{row.parentName}</td>
                                    <td>{row.lastName}</td>
                                    <td>{row.firstName}</td>
                                </tr>
                                {
                                    dConfirmation && (<DeleteConfirm student={row} />)
                                }
                            </>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default Children;