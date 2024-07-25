import format from 'date-fns/format';
import getDay from 'date-fns/get_day';
import getMonth from 'date-fns/get_month';

import {
  type DateLocale,
  getWeekdayValues,
  getDateFormat,
  getMonthValues,
} from '../i18n/dates';

type FormatDate = (
  date: Date | string | number,
  pattern: string,
  locale: DateLocale,
) => string;

export const formatDate: FormatDate = (date, pattern, locale) => {
  if (pattern === 'MMMM YYYY') {
    const monthNumber = getMonth(date);

    const monthValue = getMonthValues(locale);
    return `${monthValue[monthNumber]} ${format(date, 'YYYY')}`;
  }

  if (pattern === 'dd') {
    const dayNumber = getDay(date);

    const weekdayValue = getWeekdayValues(locale);

    return weekdayValue[dayNumber];
  }

  if (pattern === 'P') {
    return format(date, getDateFormat(locale));
  }

  return format(date, pattern);
};
