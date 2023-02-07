import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import predefinedRanges from '../constants/predifinedRanges';
import '../style/Date.scss';

function DatePick({ fetchData }: { fetchData: (dates: DateRange | null) => Promise<void> }) {
  const allTime: [Date, Date] = [new Date(new Date().getFullYear() - 1, 0, 1), new Date()];
  return (
    <DateRangePicker
      ranges={predefinedRanges}
      placeholder='Pick date range'
      style={{ width: 220 }}
      showOneCalendar
      format='dd-MM-yyyy'
      placement='bottomEnd'
      isoWeek
      defaultValue={allTime}
      onChange={(value) => {
        fetchData(value);
      }}
    />
  );
}

export default DatePick;
