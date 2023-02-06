import { DateRangePicker } from 'rsuite';
import predefinedRanges from '../constants/predifinedRanges';
import '../style/Date.scss';

function DatePick() {
  return (
    <DateRangePicker
      ranges={predefinedRanges}
      placeholder='Pick date range'
      style={{ width: 250 }}
      showOneCalendar
      format='dd-MM-yyyy'
      placement='bottomEnd'
      isoWeek
    />
  );
}

export default DatePick;
