import DatePick from '../../../features/DateRangePicker/ui/Date';
import {UserPageLayout} from '../../../shared/ui/UserPageLayout/UserPageLayout';
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
