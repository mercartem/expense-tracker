import { DateRangePicker } from 'rsuite';
import predefinedRanges from '../constants/predifinedRanges';
import '../style/Date.scss';

function DatePick() {
  return (
    <div>
      <DateRangePicker
        ranges={predefinedRanges}
        placeholder='Pick date range'
        style={{ width: 250 }}
        showOneCalendar
      />
    </div>
  );
}

export default DatePick;
