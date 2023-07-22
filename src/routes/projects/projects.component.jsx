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

    const printProjectsInfo = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>قائمة المشاريع التربوية</title></head><body>');
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
        printWindow.document.write('<h1>قائمة المشاريع التربوية</h1>');
        printWindow.document.write('<br />');
        printWindow.document.write('<br />');
        printWindow.document.write('<table>');
        printWindow.document.write('<tr><th>الفئة العمرية</th><th>مدة الإنجاز</th><th>تاريخ الإنجاز</th><th>عنوان المشروع</th></tr>');

        data.forEach(project => {
            printWindow.document.write('<tr>');
            printWindow.document.write(`<td>${project.ages}</td>`);
            printWindow.document.write(`<td>${project.duration}</td>`);
            printWindow.document.write(`<td>${project.creation_date}</td>`);
            printWindow.document.write(`<td>${project.title}</td>`);
            printWindow.document.write('</tr>');
        });

        printWindow.document.write('</table>');
        printWindow.document.write('</body></html>');
        printWindow.print();
    };

    const printProjectInfo = (pro) => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>جذاذة إعداد مشروع تربوي</title></head><body>');
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
            padding:10px 8px;
            text-align: right;
            font-size:18px;
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
        printWindow.document.write('<h1>جذاذة إعداد مشروع تربوي</h1>');
        printWindow.document.write('<br />');
        printWindow.document.write('<br />');
        printWindow.document.write('<table>');
        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${pro.title}</td>`); // Left column with the data
        printWindow.document.write('<th>عنوان المشروع</th>'); // Right column with the header
        printWindow.document.write('</tr>');
        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${pro.references}</td>`); // Left column with the data
        printWindow.document.write('<th>الموارد و المراجع</th>'); // Right column with the header
        printWindow.document.write('</tr>');
        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${pro.ages}</td>`); // Left column with the data
        printWindow.document.write('<th>الفئة العمرية</th>'); // Right column with the header
        printWindow.document.write('</tr>');
        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${pro.project_reasons}</td>`); // Left column with the data
        printWindow.document.write('<th>مبررات المشروع</th>'); // Right column with the header
        printWindow.document.write('</tr>');
        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${pro.knowledge_reasons}</td>`); // Left column with the data
        printWindow.document.write('<th>الأهداف المعرفية</th>'); // Right column with the header
        printWindow.document.write('</tr>');
        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${pro.mvnmt_reasons}</td>`); // Left column with the data
        printWindow.document.write('<th>الأهداف الحسِ حركية</th>'); // Right column with the header
        printWindow.document.write('</tr>');
        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${pro.social_reasons}</td>`); // Left column with the data
        printWindow.document.write('<th>الأهداف الإجتماعية الإنفعالبة و الأخلاقية</th>'); // Right column with the header
        printWindow.document.write('</tr>');
        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${pro.artistic_reason}</td>`); // Left column with the data
        printWindow.document.write('<th>الأهداف الفنية و الإبداعية</th>'); // Right column with the header
        printWindow.document.write('</tr>');
        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${pro.duration}</td>`); // Left column with the data
        printWindow.document.write('<th>مدة الإنجاز</th>'); // Right column with the header
        printWindow.document.write('</tr>');
        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${pro.people}</td>`); // Left column with the data
        printWindow.document.write('<th>الشركاء</th>'); // Right column with the header
        printWindow.document.write('</tr>');
        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${pro.spaces}</td>`); // Left column with the data
        printWindow.document.write('<th>الفضاءات</th>'); // Right column with the header
        printWindow.document.write('</tr>');
        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${pro.logistic_tools}</td>`); // Left column with the data
        printWindow.document.write('<th>الوسائل اللازمة + اللوجستيك</th>'); // Right column with the header
        printWindow.document.write('</tr>');
        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${pro.activities}</td>`); // Left column with the data
        printWindow.document.write('<th>الأنشطة</th>'); // Right column with the header
        printWindow.document.write('</tr>');
        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${pro.finalizing}</td>`); // Left column with the data
        printWindow.document.write('<th>تتويج المشروع و إنهاؤه</th>'); // Right column with the header
        printWindow.document.write('</tr>');
        printWindow.document.write('<tr>');
        printWindow.document.write(`<td>${pro.evaluation}</td>`); // Left column with the data
        printWindow.document.write('<th>تقييم المشروع</th>'); // Right column with the header
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

    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (value) => {
        setSearchQuery(value);
    };

    useEffect(() => {
        const filteredData = data.filter((project) =>
            project.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filteredData);
    }, [data, searchQuery]);

    return (
        <div className='projects-container'>
            <div className='top-container'>
                <div className='top-container-header'>
                    <h1>قاعدة بيانات المشاريع التربوية</h1>
                </div>
                <div className='top-container-body'>
                    <button className='print-btn' onClick={printProjectsInfo}>
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
                    <SearchBox onSearchChange={handleSearchChange} />
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
                                                <button onClick={() => printProjectInfo(row)}>
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
                                                        <button onClick={() => printProjectInfo(row)}>
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