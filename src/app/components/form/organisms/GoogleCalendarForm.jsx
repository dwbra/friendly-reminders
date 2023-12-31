'use client';
import styles from '../../../page.module.scss';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import FrTextInput from '../atoms/FrTextInput';
import CalendarId from '../molecules/CalendarId';
import Dates from '../molecules/Dates';
import Reminders from '../molecules/Reminders';
import { useTokens } from '../../../context/FRContext';
import formatGoogleCalendarData from '../../../helpers/formatGoogleCalendarData';

// NB: Conditional validation requires the then to be a callback.
const googleFormValidationSchema = Yup.object({
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
          /^(1[0-2]|0?[1-9]):([0-5][0-9]):([0-5][0-9])\s*(am|pm)$/i,
          'Your time needs to be in the following format: hr/min/second/meridiem. Eg: 12:30:00pm'
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
          /^(1[0-2]|0?[1-9]):([0-5][0-9]):([0-5][0-9])\s*(am|pm)$/i,
          'Your time needs to be in the following format: hr/min/second/meridiem. Eg: 12:30:00pm'
        )
        .required('End time is a required field.'),
  }),
  eventStartTimeZone: Yup.string().when('dateSelector', {
    is: 'selected',
    then: () => Yup.string().required('Start time zone is a required field.').label('Start Time Zone'),
  }),
  eventEndTimeZone: Yup.string().when('dateSelector', {
    is: 'selected',
    then: () => Yup.string().required('End time zone is a required field.').label('End Time Zone'),
  }),
});

const postEvent = async eventData => {
  console.log(eventData);
  try {
    const request = await fetch(`/api/googleCalendar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...eventData }),
    });

    if (!request.ok) {
      throw new Error(`Failed to POST event. Status: ${request.status}`);
    } else {
      const response = await request.json();
      console.log(response);
      return response;
    }
  } catch (error) {
    console.error('Error during event POST:', error.message);
    throw error;
  }
};

const GoogleCalendarForm = () => {
  const [tokens] = useTokens();

  const googleFormInitialValues = {
    eventTitle: '',
    eventDescription: '',
    showCalendarId: false,
    calendarId: '',
    showReminders: false,
    dateSelector: '',
    eventStartDate: '',
    eventStartTime: '',
    eventStartTimeZone: '',
    eventEndDate: '',
    eventEndTime: '',
    eventEndTimeZone: '',
    reminderOneMethod: '',
    reminderOneMinutes: '',
    reminderTwoMethod: '',
    reminderTwoMinutes: '',
  };

  return (
    <div className={styles.frForm}>
      <h1>Add Events To Your Google Calendar</h1>
      <Formik
        initialValues={googleFormInitialValues}
        validationSchema={googleFormValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const formattedData = formatGoogleCalendarData(values);
          const postData = { ...formattedData, ...tokens };
          const posted = await postEvent(postData);

          if (posted) {
            alert('Event has been added to your calendar.');
          }

          // setTimeout(async () => {
          //   // alert(JSON.stringify(values, null, 2));
          //   const posted = await postEvent(postData);
          //   console.log(posted);
          //   setSubmitting(false);
          // }, 400);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <FrTextInput
              className={styles.frFormTextInput}
              id="eventTitle"
              name="eventTitle"
              label="Event Title"
              value={values.eventTitle}
              fullWidth
            />
            <FrTextInput
              className={styles.frFormTextInput}
              id="eventDescription"
              name="eventDescription"
              label="Event Description"
              value={values.eventDescription}
              fullWidth
              multiline
              minRows={2}
            />
            <Dates value={values} />
            <Reminders
              showReminders={values.showReminders}
              setFieldValue={setFieldValue}
              option1={{
                method: { value: values.reminderOneMethod, label: 'Method', id: 'reminderOneMethod' },
                minutes: { value: values.reminderOneMinutes, label: 'Minutes before event', id: 'reminderOneMinutes' },
              }}
              option2={{
                method: { value: values.reminderTwoMethod, label: 'Method', id: 'reminderTwoMethod' },
                minutes: { value: values.reminderTwoMinutes, label: 'Minutes before event', id: 'reminderTwoMinutes' },
              }}
            />
            <CalendarId values={values} showCalendarId={values.showCalendarId} setFieldValue={setFieldValue} />
            <Button disabled={tokens.accessToken ? false : true} variant="contained" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GoogleCalendarForm;
