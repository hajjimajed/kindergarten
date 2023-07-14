import './children.styles.scss'

import { ReactComponent as Pencil } from '../../assets/icons/pencil.svg'
import { ReactComponent as Delete } from '../../assets/icons/delete.svg'
import SearchBox from '../../components/search-box/search-box.component';

const data = [
    { firstName: 'John', lastName: 'Doe', parentName: 'Jane Doe', age: 25, gender: 'ذكر', date: '2023-07-10', payment: false },
    { firstName: 'Alice', lastName: 'Smith', parentName: 'Bob Smith', age: 32, gender: 'أنثى', date: '2023-07-11', payment: true },
    { firstName: 'Michael', lastName: 'Johnson', parentName: 'Emily Johnson', age: 42, gender: 'ذكر', date: '2023-07-12', payment: false },
    { firstName: 'Sarah', lastName: 'Williams', parentName: 'David Williams', age: 19, gender: 'أنثى', date: '2023-07-13', payment: true },
    { firstName: 'James', lastName: 'Brown', parentName: 'Linda Brown', age: 50, gender: 'ذكر', date: '2023-07-14', payment: true },
    { firstName: 'Emma', lastName: 'Lee', parentName: 'Robert Lee', age: 28, gender: 'أنثى', date: '2023-07-15', payment: true }
];

const Children = () => {

    return (
        <div className='children-container'>
            <div className='top-container'>

            </div>
            <div className='children-list'>
                <div className='children-list-header'>
                    <SearchBox />
                    <h1>قائمة الأطفال</h1>
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
                            <tr key={index}>
                                <td>
                                    <div className='action-btns'>
                                        <button>
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
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default Children;