'use client';
import { useEffect, useState } from 'react';
import styles from '../../../page.module.scss';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import FrTextInput from '../atoms/FrTextInput';
import CalendarId from '../molecules/CalendarId';
import Dates from '../molecules/Dates';

import Reminders from '../molecules/Reminders';

const googleFormValidationSchema = Yup.object({
  eventTitle: Yup.string().min(3, 'Must be 3 characters or more').required('Event title is a required field.'),
  eventDescription: Yup.string().max(5000, 'Too many words. Please use a shorter description'),
  showCalendarId: Yup.boolean(),
  calendarId: Yup.string().when('showCalendarId', {
    is: true,
    then: () => Yup.string().required('This is a required field.'),
    otherwise: Yup.string().nullable(),
  }),
  showReminders: Yup.boolean(),
  reminderOneMethod: Yup.string().when('showReminders', {
    is: true,
    then: () => Yup.string().required('This is a required field.'),
    otherwise: Yup.string().nullable(),
  }),
  reminderOneMinutes: Yup.string().when('showReminders', {
    is: true,
    then: () => Yup.string().required('This is a required field. Please enter a value between 0 and 40320 in minutes.'),
    otherwise: Yup.string().nullable(),
  }),
  dateSelector: Yup.string().required('This is a required field.'),
  eventStartDate: Yup.string()
    .test({
      name: 'custom',
      test: function (value) {
        const dateSelector = this.parent.dateSelector;

        if (dateSelector === 'selected') {
          return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/.test(value);
        }

        return true; // Validation is not triggered if dateSelector is not 'selected'
      },
      message: 'Your date needs to be in the following format: dd/mm/yy. Eg: 24/12/23',
    })
    .required('Start date is a required field.'),
  eventStartTime: Yup.string()
    .test({
      name: 'custom',
      test: function (value) {
        const dateSelector = this.parent.dateSelector;

        if (dateSelector === 'selected') {
          return /^(1[0-2]|0?[1-9]):([0-5][0-9]):([0-5][0-9])\s*(am|pm)$/i.test(value);
        }

        return true; // Validation is not triggered if timeSelector is not 'selected'
      },
      message: 'Your time needs to be in the following format: hr/min/second/meridiem. Eg: 12:30:00pm',
    })
    .required('Start time is a required field.'),
  eventEndDate: Yup.string()
    .test({
      name: 'custom',
      test: function (value) {
        const dateSelector = this.parent.dateSelector;

        if (dateSelector === 'selected') {
          return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/.test(value);
        }

        return true; // Validation is not triggered if dateSelector is not 'selected'
      },
      message: "You're date needs to be in the following format: dd/mm/yy. Eg: 24/12/23",
    })
    .required('End date is a required field.'),
  eventEndTime: Yup.string()
    .test({
      name: 'custom',
      test: function (value) {
        const dateSelector = this.parent.dateSelector;

        if (dateSelector === 'selected') {
          return /^(1[0-2]|0?[1-9]):([0-5][0-9]):([0-5][0-9])\s*(am|pm)$/i.test(value);
        }

        return true; // Validation is not triggered if timeSelector is not 'selected'
      },
      message: "You're time needs to be in the following format: hr/min/second/meridiem. Eg: 12:30:00pm",
    })
    .required('End time is a required field.'),
  eventStartTimeZone: Yup.string().required('Start time zone is a required field.').label('Start Time Zone'),
  eventEndTimeZone: Yup.string().required('End time zone is a required field.').label('End Time Zone'),
});

const GoogleCalendarForm = () => {
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

  // const dataShape = {
  //   summary: eventTitle,
  //   calendarId,
  //   end: { date: eventEndDate, dateTime: eventEndTime, timeZone: eventEndTimeZone },
  //   start: { date: eventStartDate, dateTime: eventStartTime, timeZone: eventStartTimeZone },
  //   description: eventDescription,
  //   reminders: {
  //     useDefault: false,
  //     overrides: [
  //       { method: 'email', minutes: 30 },
  //       { method: 'popup', minutes: 10 },
  //     ],
  //   },
  // };

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
                minutes: { value: values.reminderOneMinutes, label: 'Minutes', id: 'reminderOneMinutes' },
              }}
              option2={{
                method: { value: values.reminderTwoMethod, label: 'Method', id: 'reminderTwoMethod' },
                minutes: { value: values.reminderTwoMinutes, label: 'Minutes', id: 'reminderTwoMinutes' },
              }}
            />
            <CalendarId values={values} showCalendarId={values.showCalendarId} setFieldValue={setFieldValue} />
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
