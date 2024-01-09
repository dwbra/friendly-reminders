import { randomiseDate } from '@/app/helpers/randomiseDate';

/**
 * A helper function to return the correct object shape to then pass onto the API call to POST into the users Google Calendar.
 * @param {Object} formValues An object containing all the values from the submitted form.
 * @returns {Object}
 */
export default function formatGoogleCalendarData(formValues) {
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

  return {
    summary: formValues.eventTitle,
    calendarId: alternativeCalendarId,
    end: { date: formValues.eventEndDate, dateTime: formValues.eventEndTime, timeZone: formValues.eventEndTimeZone },
    start: {
      date: formValues.eventStartDate,
      dateTime: formValues.eventStartTime,
      timeZone: formValues.eventStartTimeZone,
    },
    description: formValues.eventDescription || '',
    reminders: calendarReminders,
  };
}
