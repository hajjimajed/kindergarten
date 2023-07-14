import './notification-item.styles.scss'




const NotificationItem = () => {

    return (
        <div className='notification-item-container'>
            <div className='header'>
                <h1>usage monthly report</h1>
                <p>4:30 PM</p>
            </div>
            <div className='body'>
                <h1>
                    notification about the monthly usage status of the current user
                </h1>
            </div>
        </div>
    )

}

export default NotificationItem;