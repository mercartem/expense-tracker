/* eslint-disable import/no-duplicates */
import { ruRU, enUS, Locale } from 'rsuite/locales';
import subDays from 'date-fns/subDays';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';
import { Range } from '../lib/types/date';

const placement = window.innerWidth > 500 ? 'left' : 'bottom';

const predefinedRanges: Range[] = [
  {
    label: 'Today',
    value: [new Date(), new Date()],
    placement,
  },
  {
    label: 'Yesterday',
    value: [addDays(new Date(), -1), addDays(new Date(), -1)],
    placement,
  },
  {
    label: 'This week',
    value: [startOfWeek(new Date()), endOfWeek(new Date())],
    placement,
  },
  {
    label: 'Last 7 days',
    value: [subDays(new Date(), 6), new Date()],
    placement,
  },
  {
    label: 'Last 30 days',
    value: [subDays(new Date(), 29), new Date()],
    placement,
  },
  {
    label: 'This month',
    value: [startOfMonth(new Date()), new Date()],
    placement,
  },
  {
    label: 'Last month',
    value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))],
    placement,
  },
  {
    label: 'This year',
    value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
    placement,
  },
  {
    label: 'Last year',
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date(new Date().getFullYear(), 0, 0)],
    placement,
  },
  {
    label: 'All time',
    value: [new Date(new Date().getFullYear() - 5, 0, 1), new Date()],
    placement,
  },
];

const predefinedRangesRu: Range[] = [
  {
    label: 'Сегодня',
    value: [new Date(), new Date()],
    placement,
  },
  {
    label: 'Вчера',
    value: [addDays(new Date(), -1), addDays(new Date(), -1)],
    placement,
  },
  {
    label: 'Эта неделя',
    value: [startOfWeek(new Date()), endOfWeek(new Date())],
    placement,
  },
  {
    label: 'Последние 7 дней',
    value: [subDays(new Date(), 6), new Date()],
    placement,
  },
  {
    label: 'Последние 30 дней',
    value: [subDays(new Date(), 29), new Date()],
    placement,
  },
  {
    label: 'Текущий месяц',
    value: [startOfMonth(new Date()), new Date()],
    placement,
  },
  {
    label: 'Прошлый месяц',
    value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))],
    placement,
  },
  {
    label: 'Этот год',
    value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
    placement,
  },
  {
    label: 'Прошлый год',
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date(new Date().getFullYear(), 0, 0)],
    placement,
  },
  {
    label: 'Все время',
    value: [new Date(new Date().getFullYear() - 5, 0, 1), new Date()],
    placement,
  },
];

export const rangesLocale: {[key: string]: Range[] } = {
  'ru': predefinedRangesRu,
  'en': predefinedRanges,
  'ru-RU': predefinedRangesRu,
  'en-US': predefinedRanges
};

export const data: {[key: string]: Locale } = {
  'ru': ruRU,
  'en': enUS,
  'ru-RU': ruRU,
  'en-US': enUS
};

export default predefinedRanges;
