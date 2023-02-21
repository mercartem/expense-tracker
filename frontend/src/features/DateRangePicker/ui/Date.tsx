import { useTranslation } from 'react-i18next';
import { CustomProvider, DatePicker, DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { rangesLocale, data } from '../constants/predifinedRanges';
import '../style/Date.scss';

export function DatePick(props: {
  fetchData: (dates: DateRange | null) => Promise<void> | void;
  handleDate?: (dates: DateRange | null) => void;
  period: DateRange | null;
  value?: DateRange;
}) {
  const { fetchData, handleDate, period, value } = props;
  const { t, i18n } = useTranslation();
  const locale = data[i18n.language];
  return (
    <CustomProvider locale={locale}>
      <DateRangePicker
        ranges={rangesLocale[i18n.language]}
        placeholder={`${t('date.period')}`}
        showOneCalendar
        format='dd-MM-yyyy'
        placement='bottomEnd'
        isoWeek
        defaultValue={period}
        value={value}
        onChange={(values) => {
          fetchData(values);
          if (handleDate) {
            handleDate(values);
          }
        }}
      />
    </CustomProvider>
  );
}

export function DatePickOne(props: {
  initialDate: Date;
  fetchData: (dates: Date) => Promise<void> | void;
}) {
  const { fetchData, initialDate } = props;
  const { t, i18n } = useTranslation();
  const locale = data[i18n.language];

  return (
    <CustomProvider locale={locale}>
      <DatePicker
        placeholder={`${t('date.placeholder')}`}
        isoWeek
        format='dd-MM-yyyy HH:mm'
        placement='bottomEnd'
        calendarDefaultDate={initialDate}
        ranges={[
          {
            label: `${t('date.now')}`,
            value: new Date(),
          },
        ]}
        onChange={(value) => {
          if (value) {
            fetchData(value);
          }
        }}
      />
    </CustomProvider>
  );
}
