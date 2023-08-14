import './notification-item.styles.scss'




const NotificationItem = () => {

    return (
        <div className='notification-item-container'>
            <div className='header'>
                <h1>Bienvenue</h1>
                <p>16:30</p>
            </div>
            <div className='body'>
                <h1>
                    Commencez à gérer vos données en toute sécurité
                </h1>
            </div>
        </div>
    )

}

export default NotificationItem;