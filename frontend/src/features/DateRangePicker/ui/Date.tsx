import { DatePicker, DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import predefinedRanges from '../constants/predifinedRanges';
import '../style/Date.scss';

export function DatePick(props: {
  fetchData: (dates: DateRange | null) => Promise<void> | void;
  handleDate?: (dates: DateRange | null) => void;
  period: DateRange | null;
}) {
  const { fetchData, handleDate, period } = props;
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
        if (handleDate) {
          handleDate(value);
        }
      }}
    />
  );
}

export function DatePickOne(props: {
  fetchData: (dates: DateRange | null) => Promise<void> | void;
}) {
  const { fetchData } = props;
  return (
    <DatePicker
      placeholder='Pick date'
      format='dd-MM-yyyy'
      placement='bottomEnd'
      calendarDefaultDate={new Date()}
      ranges={[
        {
          label: 'Now',
          value: new Date(),
        },
      ]}
      onChange={(value) => {
        if (value) {
          fetchData([value, value]);
        }
      }}
    />
  );
}
