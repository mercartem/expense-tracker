import DatePick from '../../../features/DateRangePicker/ui/Date';
import '../style/Dashboard.scss';

function Dashboard() {
  return (
    <div className='dashboard'>
      <div className='dashboard__calendar'>
        <DatePick />
      </div>
    </div>
  );
}

export default Dashboard;
