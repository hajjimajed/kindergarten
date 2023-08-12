import './dashboard.styles.scss';
import DoughnutChart from '../../components/charts/charts.component';


const Dashboard = () => {

    return (
        <div className='dashboard-container'>
            <DoughnutChart />
        </div>
    )

}

export default Dashboard;