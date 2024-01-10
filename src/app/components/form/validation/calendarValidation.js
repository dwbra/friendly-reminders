import * as Yup from 'yup';

// NB: Conditional validation requires the then to be a callback.
export const googleFormValidationSchema = Yup.object({
  eventTitle: Yup.string().min(3, 'Must be 3 characters or more').required('Event title is a required field.'),
  eventDescription: Yup.string().max(5000, 'Too many words. Please use a shorter description'),
  showCalendarId: Yup.boolean(),
  calendarId: Yup.string().when('showCalendarId', {
    is: true,
    then: () => Yup.string().required('This is a required field.'),
  }),
  showReminders: Yup.boolean(),
  reminderOneMethod: Yup.string().when('showReminders', {
    is: true,
    then: () => Yup.string().required('This is a required field.'),
  }),
  reminderOneMinutes: Yup.string().when('showReminders', {
    is: true,
    then: () => Yup.string().required('This is a required field. Please enter a value between 0 and 40320 in minutes.'),
  }),
  dateSelector: Yup.mixed().oneOf(['selected', 'random']).required('This is a required field.'),
  eventStartDate: Yup.string().when('dateSelector', {
    is: 'selected',
    then: () =>
      Yup.string()
        .matches(
          /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/,
          "You're date needs to be in the following format: dd/mm/yy. Eg: 24/12/23",
          { excludeEmptyString: true }
        )
        .required('Start date is a required field.'),
  }),
  eventStartTime: Yup.string().when('dateSelector', {
    is: 'selected',
    then: () =>
      Yup.string()
        .matches(
          /^(1[0-2]|0?[1-9]):([0-5][0-9]):([0-5][0-9])$/i,
          'Your time needs to be in the following format: hr/min/second. Eg: 12:30:00. It is in 24 hr time.'
        )
        .required('Start time is a required field.'),
  }),
  eventEndDate: Yup.string().when('dateSelector', {
    is: 'selected',
    then: () =>
      Yup.string()
        .matches(
          /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/,
          "You're date needs to be in the following format: dd/mm/yy. Eg: 24/12/23",
          { excludeEmptyString: true }
        )
        .required('End date is a required field.'),
  }),
  eventEndTime: Yup.string().when('dateSelector', {
    is: 'selected',
    then: () =>
      Yup.string()
        .matches(
          /^(1[0-2]|0?[1-9]):([0-5][0-9]):([0-5][0-9])$/i,
          'Your time needs to be in the following format: hr/min/second. Eg: 12:30:00. It is in 24 hr time.'
        )
        .required('End time is a required field.'),
  }),
});
