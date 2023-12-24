'use client';
import React from 'react';
import styles from '../page.module.scss';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';

const googleFormValidationSchema = Yup.object({
  firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
  lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  acceptedTerms: Yup.boolean().required('Required').oneOf([true], 'You must accept the terms and conditions.'),
  jobType: Yup.string().oneOf(['designer', 'development', 'product', 'other'], 'Invalid Job Type').required('Required'),
});

const googleFormInitialValues = {
  calendarId: '',
  end: '',
  start: '',
  reminders: '',
  summary: '',
  description: '',
};

const GoogleCalendarForm = () => {
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
        <Form>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default GoogleCalendarForm;
