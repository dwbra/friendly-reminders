'use client';
import styles from '../../../page.module.scss';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import FrTextInput from '../atoms/FrTextInput';
import CalendarId from '../molecules/CalendarId';

const googleFormValidationSchema = Yup.object({
  eventTitle: Yup.string().min(3, 'Must be 3 characters or more').required('Event title is a required field.'),
  eventDescription: Yup.string().max(5000, 'Too many words. Please use a shorter description'),
  calendarId: Yup.string(),

  // email: Yup.string().email('Invalid email address').required('Required'),
  // acceptedTerms: Yup.boolean().required('Required').oneOf([true], 'You must accept the terms and conditions.'),
  // jobType: Yup.string().oneOf(['designer', 'development', 'product', 'other'], 'Invalid Job Type').required('Required'),
});

const googleFormInitialValues = {
  eventTitle: '',
  eventDescription: '',
  calendarId: '',
  // end: '',
  // start: '',
  // reminders: '',
  // summary: '',
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
        {({ values }) => (
          <Form>
            <FrTextInput id="eventTitle" name="eventTitle" label="Event Title" value={values.eventTitle} fullWidth />
            <FrTextInput
              id="eventDescription"
              name="eventDescription"
              label="Event Description"
              value={values.eventDescription}
              fullWidth
              multiline
            />
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
