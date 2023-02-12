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
  initialDate: Date,
  fetchData: (dates: Date) => Promise<void> | void;
}) {
  const { fetchData, initialDate } = props;
  return (
    <DatePicker
      placeholder='Pick date and time'
      format='dd-MM-yyyy HH:mm'
      placement='bottomEnd'
      calendarDefaultDate={initialDate}
      ranges={[
        {
          label: 'Now',
          value: new Date(),
        },
      ]}
      onChange={(value) => {
        if (value) {
          fetchData(value);
        }
      }}
    />
  );
}
