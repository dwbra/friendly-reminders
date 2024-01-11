import { DateTime, Settings } from 'luxon';

/**
 * A helper function to create a valid ISO timestamp.
 * @param {Object} data An object containing the date and time values from the form.
 * @returns {String}
 */
export default function generateISODate(data) {
  const { date, dateTime } = data;
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Set Luxon to use the user's timezone globally
  Settings.defaultZoneName = userTimeZone;

  const day = date.split('/')[0];
  const month = date.split('/')[1];
  const year = '20' + date.split('/')[2];

  const hours = dateTime.split(':')[0];
  const minutes = dateTime.split(':')[1];
  const seconds = dateTime.split(':')[2];

  const localTime = DateTime.fromObject({
    year: year,
    month: month,
    day: day,
    hour: hours,
    minute: minutes,
    second: seconds,
  });

  // Convert local time to UTC
  const utcTime = localTime.toUTC();

  // Reset Luxon's default timezone to UTC for future use
  Settings.defaultZoneName = 'UTC';

  return utcTime.toISO();
}
