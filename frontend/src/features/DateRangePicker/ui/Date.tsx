import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import predefinedRanges from '../constants/predifinedRanges';
import '../style/Date.scss';

const allTime = (): DateRange => [new Date(new Date().getFullYear() - 1, 0, 1), new Date()];

function DatePick({
  fetchData,
  period,
}: {
  fetchData: (dates: DateRange | null) => Promise<void> | void;
  period: DateRange | null;
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
      }}
    />
  );
}

export default DatePick;
