import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import predefinedRanges from '../constants/predifinedRanges';
import '../style/Date.scss';

function DatePick({
  fetchData,
  handleDate,
  period,
}: {
  fetchData: (dates: DateRange | null) => Promise<void>;
  handleDate: (dates: DateRange | null) => void;
  period: [Date, Date];
}) {
  return (
    <DateRangePicker
      ranges={predefinedRanges}
      placeholder='Pick date range'
      showOneCalendar
      format='dd-MM-yyyy'
      placement='bottomEnd'
      isoWeek
      defaultValue={period}
      onChange={(value) => {
        fetchData(value);
        handleDate(value);
      }}
    />
  );
}

export default DatePick;
