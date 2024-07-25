import startOfMinute from 'date-fns/start_of_minute';

export const getDateFromFormattedTime = (
  formattedTime,
  is24HourClock,
  isAm,
) => {
  const hours = parseInt(formattedTime.substring(0, 2), 10) || 0;

  const newHours = !is24HourClock && !isAm ? hours + 12 : hours;

  const minutes = parseInt(formattedTime.substring(3, 5), 10) || 0;

  const date = startOfMinute(new Date());
  date.setHours(newHours);
  date.setMinutes(minutes);

  return date;
};
