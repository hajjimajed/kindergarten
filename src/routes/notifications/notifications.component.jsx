import './notifications.styles.scss';
import { useState, useContext, useEffect, useRef, Fragment } from 'react';
import { motion } from 'framer-motion';
import config from '../../config';

import { TogglesContext } from '../../contexts/toggles.context';
import { IsDoneContext } from '../../contexts/isDone.context';
import SearchBox from '../../components/search-box/search-box.component';
import DeleteConfirm from '../../components/delete-confirm/delete-confirm.component';
import UpdateChild from '../../components/update-child/update-child.component';
import AddNotif from '../../components/add-notif/add-notif.component';
import Loader from '../../components/loader/loader.component';
import SentNotification from '../../components/send-notification/send-notification.component';
import DeleteNotif from '../../components/delete-notif/delete-notif.component';

import { ReactComponent as Pencil } from '../../assets/icons/pencil.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { ReactComponent as Filter } from '../../assets/icons/filter.svg';
import { ReactComponent as Paper } from '../../assets/icons/paper.svg';
import { ReactComponent as AddUser } from '../../assets/icons/add-user.svg';
import { ReactComponent as Clock } from '../../assets/icons/clock.svg';
import { ReactComponent as Alphabet } from '../../assets/icons/alphabet.svg';
import { ReactComponent as Left } from '../../assets/icons/left.svg';
import { ReactComponent as Right } from '../../assets/icons/right.svg';
import { ReactComponent as NotificationIcon } from '../../assets/icons/notification.svg';


const Notifications = () => {

    const { dConfirmation, setDConfirmation, isAddChild, setIsAddChild, isUpdateChild, setIsUpdateChild, isSendNotif, setIsSendNotif } = useContext(TogglesContext);
    const { isDone } = useContext(IsDoneContext);

    const addChildHandler = () => {
        setIsAddChild(!isAddChild);
    }

    const [selectedChild, setSelectedChild] = useState(null);

    const updateChildHandler = (row) => {
        setSelectedChild(row);
        setIsUpdateChild(!isUpdateChild);
    };

    const deleteConfirmOpen = (row) => {
        setSelectedChild(row);
        setDConfirmation(!dConfirmation);
    }
    
    const sendNotifHandler = (row) => {
        setSelectedChild(row);
        setIsSendNotif(!isSendNotif);
    };

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

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    useEffect(() => {
        function handleResize() {
            setIsSmallScreen(window.innerWidth <= 800);
        }

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const [dt, setDt] = useState([]);
    const [allKids, setAllKids] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [pages, setPages] = useState(0);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, isDone]);

    // useEffect(() => {
    //     fetchAllData();
    // }, [isDone])

    const handleRightButtonClick = () => {
        if (currentPage > 1) {
            setIsLoading(true);
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleLeftButtonClick = () => {
        setIsLoading(true);
        setCurrentPage((prevPage) => prevPage + 1);
    };


    const fetchToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await fetch(config.BASE_URL + 'api/Account/RefreshToken', {
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
            return true; // Indicate success
        } catch (error) {
            console.error('Error fetching token:', error);
            return false; // Indicate failure
        }
    };

    // const fetchData = async (p) => {
    //     try {
    //         // Make the API call using the Axios instance
    //         const response = await api.get(`/api/kids/getPaginatedkids?pageNumber=${p}`);
            
    //         // Parse the response data
    //         const jsonData = response.data;
            
    //         // Update the state with the fetched data
    //         setDt(jsonData.items); // Assuming `setDt` is available in scope
    //         setPages(jsonData.totalPages); // Assuming `setPages` is available in scope
    //         setIsLoading(false); // Assuming `setIsLoading` is available in scope
            
    //         console.log('Fetch successful', jsonData.items);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };
    
    const fetchData = async (p) => {
        try {
            const tokenRefreshed = await fetchToken();
            if (!tokenRefreshed) {
                throw new Error('Token refresh failed');
            }
    
            const token = localStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
    
            const response = await fetch(config.BASE_URL + `api/activities/getPaginatedActivities?pageNumber=${p}`, { headers });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const jsonData = await response.json();
            setDt(jsonData.items);
            setPages(jsonData.totalPages);
            setIsLoading(false);
            console.log('Fetch successful', jsonData.items);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
  

  
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



    const filterByAlphabeticHandler = () => {
        const sortedData = dt.sort((a, b) => a.activityTitle.localeCompare(b.activityTitle));
        setDt([...sortedData]);
    };





    return (
        <div className='children-container'>
            <motion.div
                initial={{ translateY: 50, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{
                    type: "tween",
                    duration: 0.4
                }}
                className='top-container'>
                <div className='top-container-header'>
                    <h1>قاعدة بيانات الاشعارات</h1>
                </div>
                <div className='top-container-body'>
                    <button className='add-btn' onClick={addChildHandler}>
                        <h1>أضف</h1>
                        <AddUser />
                    </button>
                </div>
            </motion.div>
            <motion.div
                initial={{ translateY: 50, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{
                    type: "tween",
                    duration: 0.4,
                    delay: 0.2
                }}
                className='children-list'>
                <div className='children-list-header'>
                    <h1>قائمة الاشعارات</h1>
                </div>
                {
                    isLoading ? (<Loader />) : (
                        dt.length > 0 ? (
                            <>
                                <div className='filter' ref={filterRef}>
                                    <button className='filterBtn' onClick={openFilterHandler}>
                                        <h1>عرض</h1>
                                        <Filter></Filter>
                                    </button>
                                    {
                                        isopenFilter && (
                                            <motion.div
                                                initial={{ translateY: 25, opacity: 0 }}
                                                animate={{ translateY: 0, opacity: 1 }}
                                                transition={{
                                                    type: "tween",
                                                    duration: 0.2
                                                }}
                                                onClick={openFilterHandler} className='filters-list'>
                                             
                                                <div className='filter-item' onClick={filterByAlphabeticHandler}>
                                                    <h1>حسب الحروف</h1>
                                                    <Alphabet />
                                                </div>
                                            </motion.div>
                                        )
                                    }
                                </div>
                                {
                                    isSmallScreen ? (
                                        dt.map((row, index) => (
                                            <table key={index} className='shrinked-child-table'>
                                                <tbody>
                                                    <tr>
                                                        <td>{row.activityTitle}</td>
                                                        <td>العنوان</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{row.activityDescription}</td>
                                                        <td>المحتوى</td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td>
                                                            <div className='action-btns'>
                                                                <button onClick={() => deleteConfirmOpen(row)}>
                                                                    <Delete />
                                                                </button>
                                                               
                                                                 <button onClick={() => sendNotifHandler(row)}>
                                                                    <NotificationIcon />
                                                                    </button>
                                                            </div>
                                                        </td>
                                                        <td>الإجراءت</td>
                                                    </tr>
                                                </tbody>
                                            </table>)
                                        )
                                    ) :
                                        (<table className='children-list-table'>
                                            <thead>
                                                <tr>
                                                    <th>الإجراءت</th>
                                                    <th>المحتوى</th>
                                                    <th>العنوان</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {dt.map((row, index) => (
                                                    <Fragment key={index}>
                                                        <tr key={index}>
                                                            <td>
                                                                <div className='action-btns'>
                                                                    <button onClick={() => deleteConfirmOpen(row)}>
                                                                        <Delete />
                                                                    </button>
                                                                    <button onClick={() => sendNotifHandler(row)}>
                                                                    <NotificationIcon />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            
                                                            <td>{row.activityDescription}</td>
                                                            <td>{row.activityTitle}</td>
                                                        </tr>
                                                    </Fragment>
                                                ))}

                                            </tbody>
                                        </table>
                                        )
                                }
                            </>
                        ) : (
                            <div className='no-data'>
                                <h1>لا توجد معلومات إلى الأن، يمكنك إضافة الاشعارات</h1>
                            </div>
                        )
                    )
                }

                <div className='pagination'>
                    <div className='p-btn left-button' onClick={handleLeftButtonClick}>
                        <Left />
                    </div>
                    {currentPage === pages ? (
                        <>

                            <div className='p-page active'>
                                <h2>{pages}</h2>
                            </div>
                            {pages > 1 && (
                                <div onClick={() => { setIsLoading(true); setCurrentPage(1); }} className='p-page'>
                                    <h2>1</h2>
                                </div>
                            )}
                        </>
                    ) : currentPage === 1 ? (
                        <>
                            {pages > 2 && (
                                <div onClick={() => { setIsLoading(true); setCurrentPage(pages); }} className='p-page'>
                                    <h2>{pages}</h2>
                                </div>
                            )}
                            {pages > 1 && (
                                <div onClick={() => { setIsLoading(true); setCurrentPage(1 + 1); }} className='p-page'>
                                    <h2>{1 + 1}</h2>
                                </div>
                            )}

                            <div className='p-page active'>
                                <h2>{1}</h2>
                            </div>
                        </>
                    ) : (
                        <>
                            {currentPage !== pages && (
                                <div onClick={() => { setIsLoading(true); setCurrentPage(pages); }} className='p-page'>
                                    <h2>{pages}</h2>
                                </div>
                            )}
                            <div className='p-page active'>
                                <h2>{currentPage}</h2>
                            </div>

                            <div onClick={() => { setIsLoading(true); setCurrentPage(1); }} className='p-page'>
                                <h2>{1}</h2>
                            </div>
                        </>
                    )}
                    <div className='p-btn right-button' onClick={handleRightButtonClick}>
                        <Right />
                    </div>
                </div>
                {dConfirmation && <DeleteNotif child={selectedChild} />}
                {isSendNotif && <SentNotification child={selectedChild} />}
            </motion.div>
            {
                isAddChild && <AddNotif />
            }
        </div>
    )

}

export default Notifications;