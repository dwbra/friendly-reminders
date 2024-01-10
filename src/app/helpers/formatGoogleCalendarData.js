import { randomiseDate } from '@/app/helpers/randomiseDate';
import generateISODate from './generateISODate';

/**
 * A helper function to return the correct object shape to then pass onto the API call to POST into the users Google Calendar.
 * @param {Object} formValues An object containing all the values from the submitted form.
 * @returns {Object}
 */
export default function formatGoogleCalendarData(formValues) {
  //   console.log(formValues.eventStartDate);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  let newStartDateTime = {};
  newStartDateTime = formValues.eventStartDate
    ? generateISODate({
        date: formValues.eventStartDate,
        dateTime: formValues.eventStartTime,
      })
    : {};

  let newEndDateTime = {};
  newEndDateTime = formValues.eventEndDate
    ? generateISODate({
        date: formValues.eventEndDate,
        dateTime: formValues.eventEndTime,
      })
    : {};

  // Always use the primary calendar of the user if an alt isn't entered.
  let alternativeCalendarId = '';
  alternativeCalendarId = formValues.showCalendarId === true ? formValues.calendarId : 'primary';

  // Use default reminder settings if the user hasn't entered some.
  let calendarReminders = {};
  calendarReminders =
    formValues.showReminders === true
      ? {
          useDefault: false,
          overrides: [
            { method: formValues.reminderOneMethod, minutes: formValues.reminderOneMinutes },
            { method: formValues?.reminderTwoMethod, minutes: formValues?.reminderTwoMinutes },
          ],
        }
      : {};

  if (formValues.dateSelector === 'random') {
    const randomISODates = randomiseDate();

    return {
      summary: formValues.eventTitle,
      calendarId: alternativeCalendarId,
      end: { dateTime: randomISODates.end, timeZone: 'Australia/Sydney' },
      start: {
        dateTime: randomISODates.start,
        timeZone: 'Australia/Sydney',
      },
      description: formValues.eventDescription || '',
      reminders: calendarReminders,
    };
  }

  console.log({
    summary: formValues.eventTitle,
    calendarId: alternativeCalendarId,
    end: { dateTime: newEndDateTime, timeZone: userTimeZone },
    start: {
      dateTime: newStartDateTime,
      timeZone: userTimeZone,
    },
    description: formValues.eventDescription || '',
    reminders: calendarReminders,
  });

  return {
    summary: formValues.eventTitle,
    calendarId: alternativeCalendarId,
    end: { dateTime: newEndDateTime, timeZone: userTimeZone },
    start: {
      dateTime: newStartDateTime,
      timeZone: userTimeZone,
    },
    description: formValues.eventDescription || '',
    reminders: calendarReminders,
  };
}
