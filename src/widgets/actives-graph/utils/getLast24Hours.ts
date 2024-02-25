import { format, startOfHour, subHours } from 'date-fns';

export const getLast24Hours = () => {
  const now = new Date();
  const hours: string[] = [];

  let currentDate: Date = startOfHour(now);

  for (let i = 0; i < 24; i++) {
    hours.unshift(format(currentDate, 'HH:mm'));
    currentDate = subHours(currentDate, 1);
  }

  return hours;
};
