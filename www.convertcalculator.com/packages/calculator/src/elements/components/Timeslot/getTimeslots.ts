import {
  addMinutes,
  endOfDay,
  getDay,
  isAfter,
  isBefore,
  isPast,
  subMinutes,
} from 'date-fns';

export const getDayFromNumber = (dayNumber) => {
  switch (dayNumber) {
    case 0:
      return 'sunday';
    case 1:
      return 'monday';
    case 2:
      return 'tuesday';
    case 3:
      return 'wednesday';
    case 4:
      return 'thursday';
    case 5:
      return 'friday';
    case 6:
      return 'saturday';
    default:
      return '';
  }
};

export const getAvailabilityRules = (date, availabilityRules) => {
  const dayNumber = getDay(date);
  const day = getDayFromNumber(dayNumber);

  const rules = [];

  // Add below to get overrideRules (rules for exact dates)
  // const overrideRules = availabilityRules.filter((rule) => rule.type === 'date' && isSameDay(date, rule.date));

  const weekdayRule = availabilityRules
    .filter((rule) => {
      return rule.enabled;
    })
    .find((rule) => {
      return rule.type === 'weekday' && rule.weekday === day;
    });

  if (weekdayRule) {
    rules.push(weekdayRule);
  }

  return rules;
};

export const getStartBookingTime = (
  date: Date,
  interval: { from: string; to: string },
  duration: number,
  afterBufferTime: number,
  minBookingTime: number,
) => {
  let startDate = new Date(date);
  const intervalFromSplit = interval.from.split(':');

  const startHours = parseFloat(intervalFromSplit[0]);
  const startMinutes = parseFloat(intervalFromSplit[1]);

  startDate.setHours(startHours, startMinutes);

  const currentDate = new Date();

  const startBookingTime = addMinutes(currentDate, minBookingTime);

  while (isAfter(startBookingTime, startDate)) {
    startDate = addMinutes(
      startDate,
      startMinutes + (duration + afterBufferTime),
    );
  }

  return startDate;
};

export const getTimeslotsFromInterval = (
  interval,
  date,
  { duration, afterBufferTime, minBookingTime },
) => {
  const startBookingTime = getStartBookingTime(
    date,
    interval,
    duration,
    afterBufferTime,
    minBookingTime,
  );

  const endDate = new Date(date);
  const [endHours, endMinutes] = interval.to.split(':');
  endDate.setHours(endHours, endMinutes);

  const timeslots = [];

  if (
    isAfter(startBookingTime, subMinutes(endDate, duration + afterBufferTime))
  ) {
    return timeslots;
  }

  timeslots.push(startBookingTime);

  while (
    isBefore(
      timeslots[timeslots.length - 1],
      subMinutes(endDate, duration + afterBufferTime),
    )
  ) {
    timeslots.push(
      addMinutes(timeslots[timeslots.length - 1], duration + afterBufferTime),
    );
  }

  return timeslots;
};

const getTimeslots = (date, timeslot) => {
  if (!date) return false;
  if (isPast(endOfDay(date))) return false;

  const { duration, afterBufferTime, minBookingTime } = timeslot;
  const availabilityRules = getAvailabilityRules(
    date,
    timeslot.availabilityRules,
  );

  if (!availabilityRules.length) return [];

  const intervals = availabilityRules.reduce((intervalsArray, rule) => {
    // TODO don't overlap intervals
    // TODO prioritize `date` rules over `weekday` rules
    return [...intervalsArray, ...rule.intervals];
  }, []);

  const timeslots = [];
  intervals.forEach((interval) => {
    const intervalTimeslots = getTimeslotsFromInterval(interval, date, {
      duration,
      afterBufferTime,
      minBookingTime,
    });

    timeslots.push(...intervalTimeslots);
  });

  return timeslots;
};

export default getTimeslots;
