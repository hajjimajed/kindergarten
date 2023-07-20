import './delete-confirm-activity.styles.scss'

import { useContext } from 'react';

import { TogglesContext } from '../../contexts/toggles.context';

import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { ReactComponent as Close } from '../../assets/icons/close.svg';

const DeleteConfirmActivity = ({ activity }) => {

    const { dConfirmationActivity, setDConfirmationActivity } = useContext(TogglesContext);

    const openHandler = () => {
        setDConfirmationActivity(!dConfirmationActivity);
    }

    return (
        <div className='activity-delete-container'>
            <div className='delete-bg' onClick={openHandler}></div>
            <div className='confirmation'>
                <h1>حذف المعطيات</h1>
                <div className='confirmation-infos'>
                    <h1>هل أنت متأكد من حذف هذا المعطى ؟</h1>
                </div>
                <div className='confirmation-actions'>
                    <button onClick={openHandler}>
                        <h1>إلغاء</h1>
                        <Close />
                    </button>
                    <button>
                        <h1>تأكيد</h1>
                        <Delete />
                    </button>
                </div>
            </div>
        </div>
    )

}

export default DeleteConfirmActivity;