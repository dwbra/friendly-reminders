'use client';
import styles from '../../../page.module.scss';
import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import FrTextInput from '../atoms/FrTextInput';
import CalendarId from '../molecules/CalendarId';
import Dates from '../molecules/Dates';
import Reminders from '../molecules/Reminders';
import { useTokens } from '../../../context/FRContext';
import formatGoogleCalendarData from '../../../helpers/formatGoogleCalendarData';
import { googleFormValidationSchema } from '../validation/calendarValidation';

const postEvent = async eventData => {
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
    eventEndDate: '',
    eventEndTime: '',
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

          setSubmitting(false);
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
