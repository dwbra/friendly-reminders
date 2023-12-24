'use client';
import { useEffect, useState } from 'react';
import styles from '../../../page.module.scss';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import FrTextInput from '../atoms/FrTextInput';
import CalendarId from '../molecules/CalendarId';
import DateInput from '../molecules/DateInput';

const googleFormValidationSchema = Yup.object({
  eventTitle: Yup.string().min(3, 'Must be 3 characters or more').required('Event title is a required field.'),
  eventDescription: Yup.string().max(5000, 'Too many words. Please use a shorter description'),
  calendarId: Yup.string(),

  eventStartDate: Yup.string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/,
      "You're date needs to be in the following format: dd/mm/yy. Eg: 24/12/23",
      {
        excludeEmptyString: true,
      }
    )
    .required('Start date is a required field.'),
  eventStartTime: Yup.string()
    .matches(
      /^(1[0-2]|0?[1-9]):([0-5][0-9]):([0-5][0-9])\s*(am|pm)$/i,
      "You're time needs to be in the following format: hr/min/second/meridiem. Eg: 12:30:00pm",
      { excludeEmptyString: true }
    )
    .required('Start time is a required field.'),
  eventEndDate: Yup.string().required('End date is a required field.'),
  eventEndTime: Yup.string().required('End time is a required field.'),
  // email: Yup.string().email('Invalid email address').required('Required'),
  // acceptedTerms: Yup.boolean().required('Required').oneOf([true], 'You must accept the terms and conditions.'),
  // jobType: Yup.string().oneOf(['designer', 'development', 'product', 'other'], 'Invalid Job Type').required('Required'),
});

const GoogleCalendarForm = () => {
  const googleFormInitialValues = {
    eventTitle: '',
    eventDescription: '',
    calendarId: '',
    eventStartDate: '',
    eventStartTime: '',
    eventStartTimeZone: '',
    eventEndDate: '',
    eventEndTime: '',

    // reminders: '',
    // summary: '',
  };

  return (
    <div className={styles.frForm}>
      <h1>Add Events To Your Google Calendar</h1>
      <Formik
        initialValues={googleFormInitialValues}
        validationSchema={googleFormValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values }) => (
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
            />
            <DateInput values={values} />
            <CalendarId values={values} />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GoogleCalendarForm;
