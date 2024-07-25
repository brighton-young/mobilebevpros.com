import { eachDay, getDay } from 'date-fns';

import { DateLocale, getStartOfWeek } from '../../../../i18n/dates';
import { formatDate } from '../../../../util/formatDate';

export const groupDatesByWeek = (dates, locale: DateLocale) => {
  const daySubtraction = getStartOfWeek(locale) === 'monday' ? 1 : 0;
  const numberOfEmptyDays = getDay(dates[0]) - daySubtraction;
  const newNumberOfEmptyDays =
    numberOfEmptyDays < 0 ? numberOfEmptyDays + 7 : numberOfEmptyDays;
  const emptyDatesArray =
    newNumberOfEmptyDays > 0 ? Array.from(new Array(newNumberOfEmptyDays)) : [];
  const groups = [emptyDatesArray];

  dates.forEach((date) => {
    if (groups[groups.length - 1].length === 7) {
      groups.push([date]);
    } else if (groups[groups.length - 1].length < 7) {
      groups[groups.length - 1].push(date);
    }
  });

  return groups;
};

export const getDaysOfWeek = (locale: DateLocale) => {
  const dayAddition = getStartOfWeek(locale) === 'monday' ? 1 : 0;

  return eachDay(
    new Date(2014, 9, 5 + dayAddition),
    new Date(2014, 9, 11 + dayAddition),
  ).map((date) => {
    return formatDate(date, 'dd', locale);
  });
};
