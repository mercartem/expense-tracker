import { DateRangePicker } from 'rsuite';
import predefinedRanges from '../constants/predifinedRanges';
import '../style/Date.scss';

function DatePick({ fetchData }: { fetchData: () => Promise<void> }) {
  return (
    <DateRangePicker
      ranges={predefinedRanges}
      placeholder='Pick date range'
      style={{ width: 220 }}
      showOneCalendar
      format='dd-MM-yyyy'
      placement='bottomEnd'
      isoWeek
      defaultValue={[new Date(new Date().getFullYear() - 1, 0, 1), new Date()]}
      onClose={() => fetchData()}
    />
  );
}

export default DatePick;
