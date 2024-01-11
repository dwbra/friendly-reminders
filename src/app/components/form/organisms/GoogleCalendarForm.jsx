'use client';
import { useState } from 'react';
import styles from '../../../page.module.scss';
import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import FrTextInput from '../atoms/FrTextInput';
import CalendarId from '../molecules/CalendarId';
import Dates from '../molecules/Dates';
import Reminders from '../molecules/Reminders';
import { useAuthentication } from '../../../context/FRContext';
import formatGoogleCalendarData from '../../../helpers/formatGoogleCalendarData';
import { googleFormValidationSchema } from '../validation/calendarValidation';
import FrModal from '../../../utils/FrModal';

/**
 * A frontend fetch call to the backend nodeJS API to create the event.
 * @param {Object} eventData A formatted object containing the data.
 */
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
      return response;
    }
  } catch (error) {
    console.error('Error during event POST:', error.message);
    throw error;
  }
};

const GoogleCalendarForm = () => {
  const [authentication] = useAuthentication();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
      <FrModal
        open={openModal}
        handleClose={handleCloseModal}
        ariaLabel="sucessful form submission"
        heading={`<h1>Your event was created!</h1>`}
        description={`<p>You should now see the event in your google calendar.</p>`}
      />
      <h1>Add Events To Your Google Calendar</h1>
      <Formik
        initialValues={googleFormInitialValues}
        validationSchema={googleFormValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const formattedData = formatGoogleCalendarData(values);
          const submitEvent = await postEvent(formattedData);

          if (submitEvent.added) {
            handleOpenModal();
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
            <Dates values={values} />
            <Reminders values={values} showReminders={values.showReminders} setFieldValue={setFieldValue} />
            <CalendarId values={values} showCalendarId={values.showCalendarId} setFieldValue={setFieldValue} />
            <Button disabled={authentication.hasAccess ? false : true} variant="contained" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GoogleCalendarForm;
