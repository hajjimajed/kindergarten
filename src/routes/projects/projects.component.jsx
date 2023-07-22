import './projects.styles.scss'
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
import DeleteConfirmProject from '../../components/delete-confirm-project/delete-confirm-project.component';
import AddProject from '../../components/add-project/add-project.component';
import UpdateProject from '../../components/update-project/update-project.component';


const data = [
    {
        title: "عنوان الأول", references: "مراجع الأول", ages: "الأعمار الأول", project_reasons: "أسباب المشروع الأول", knowledge_reasons: "أسباب المعرفة الأول", mvnmt_reasons: "أسباب الحركة الأول", social_reasons: "أسباب اجتماعية الأول", artistic_reason: "السبب الفني الأول", duration: "المدة الأول", people: "الأشخاص الأول", spaces: "المساحات الأول", logistic_tools: "أدوات اللوجستية الأول", activities: "الأنشطة الأول", pedagoinvests: "الاستثمارات التعليمية الأول", pedagoinvests1: "الاستثمارات التعليمية الأول 1", pedagoinvests2: "الاستثمارات التعليمية الأول 2", pedagoinvests3: "الاستثمارات التعليمية الأول 3", pedagoinvests4: "الاستثمارات التعليمية الأول 4", finalizing: "الانتهاء الأول", evaluation: "التقييم الأول", creation_date: "2023-07-10"
    },
    {
        title: "عنوان الثاني", references: "مراجع الثاني", ages: "الأعمار الثاني", project_reasons: "أسباب المشروع الثاني", knowledge_reasons: "أسباب المعرفة الثاني", mvnmt_reasons: "أسباب الحركة الثاني", social_reasons: "أسباب اجتماعية الثاني", artistic_reason: "السبب الفني الثاني", duration: "المدة الثاني", people: "الأشخاص الثاني", spaces: "المساحات الثاني", logistic_tools: "أدوات اللوجستية الثاني", activities: "الأنشطة الثاني", pedagoinvests: "الاستثمارات التعليمية الثاني", pedagoinvests1: "الاستثمارات التعليمية الثاني 1", pedagoinvests2: "الاستثمارات التعليمية الثاني 2", pedagoinvests3: "الاستثمارات التعليمية الثاني 3", pedagoinvests4: "الاستثمارات التعليمية الثاني 4", finalizing: "الانتهاء الثاني", evaluation: "التقييم الثاني", creation_date: "2023-05-10"
    },
    {
        title: "عنوان الثالث", references: "مراجع الثالث", ages: "الأعمار الثالث", project_reasons: "أسباب المشروع الثالث", knowledge_reasons: "أسباب المعرفة الثالث", mvnmt_reasons: "أسباب الحركة الثالث", social_reasons: "أسباب اجتماعية الثالث", artistic_reason: "السبب الفني الثالث", duration: "المدة الثالث", people: "الأشخاص الثالث", spaces: "المساحات الثالث", logistic_tools: "أدوات اللوجستية الثالث", activities: "الأنشطة الثالث", pedagoinvests: "الاستثمارات التعليمية الثالث", pedagoinvests1: "الاستثمارات التعليمية الثالث 1", pedagoinvests2: "الاستثمارات التعليمية الثالث 2", pedagoinvests3: "الاستثمارات التعليمية الثالث 3", pedagoinvests4: "الاستثمارات التعليمية الثالث 4", finalizing: "الانتهاء الثالث", evaluation: "التقييم الثالث", creation_date: "2023-02-10"
    }
];

const Projects = () => {

    const { isAddProject, setIsAddProject, isUpdateProject, setIsUpdateProject, dConfirmationProject, setDConfirmationProject } = useContext(TogglesContext);

    const addProjectHandler = () => {
        setIsAddProject(!isAddProject);
    }

    const [selectedProject, setSelectedProject] = useState(null);

    const updateProjectHandler = (row) => {
        setSelectedProject(row);
        setIsUpdateProject(!isUpdateProject);
    };

    const deleteConfirmOpen = (row) => {
        setSelectedProject(row);
        setDConfirmationProject(!dConfirmationProject);
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
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
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
        <div className='projects-container'>
            <div className='top-container'>
                <div className='top-container-header'>
                    <h1>قاعدة بيانات المشاريع التربوية</h1>
                </div>
                <div className='top-container-body'>
                    <button className='print-btn' >
                        <h1>طباعة</h1>
                        <Paper />
                    </button>
                    <button className='add-btn' onClick={addProjectHandler} >
                        <h1>أضف</h1>
                        <AddUser />
                    </button>
                </div>
            </div>

            <div className='projects-list'>
                <div className='projects-list-header'>
                    <SearchBox />
                    <h1>قائمة المشاريع التربوية</h1>
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
                            <table key={index} className='shrinked-project-table'>
                                <tbody>
                                    <tr>
                                        <td>{row.title}</td>
                                        <td>عنوان المشروع</td>
                                    </tr>
                                    <tr>
                                        <td>{row.creation_date}</td>
                                        <td>تاريخ الإنجاز</td>
                                    </tr>
                                    <tr>
                                        <td>{row.duration}</td>
                                        <td>مدة الإنجاز</td>
                                    </tr>
                                    <tr>
                                        <td>{row.ages}</td>
                                        <td>الفئة العمرية</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='action-btns'>
                                                <button onClick={() => deleteConfirmOpen(row)}>
                                                    <Delete />
                                                </button>
                                                <button onClick={() => updateProjectHandler(row)}>
                                                    <Pencil />
                                                </button>
                                                <button onClick={() => updateProjectHandler(row)}>
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
                            <table className='projects-list-table'>
                                <thead>
                                    <tr>
                                        <th>الإجراءت</th>
                                        <th>الفئة العمرية</th>
                                        <th>مدة الإنجاز</th>
                                        <th>تاريخ الإنجاز</th>
                                        <th>عنوان المشروع</th>
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
                                                        <button onClick={() => updateProjectHandler(row)}>
                                                            <Pencil />
                                                        </button>
                                                        <button onClick={() => updateProjectHandler(row)}>
                                                            <Paper />
                                                        </button>
                                                    </div>
                                                </td>

                                                <td>{row.ages}</td>
                                                <td>{row.duration}</td>
                                                <td>{row.creation_date}</td>
                                                <td>{row.title}</td>
                                            </tr>
                                        </Fragment>
                                    ))}

                                </tbody>
                            </table>
                        )
                }

                {isUpdateProject && <UpdateProject project={selectedProject} />}
                {dConfirmationProject && <DeleteConfirmProject project={selectedProject} />}
            </div>
            {
                isAddProject && <AddProject />
            }

        </div>
    )

}

export default Projects;