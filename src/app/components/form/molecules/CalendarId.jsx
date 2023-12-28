import { useState, useEffect } from 'react';
import styles from '../../../page.module.scss';
import FrTextInput from '../atoms/FrTextInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const CalendarId = ({ values, showCalendarId, setFieldValue }) => {
  useEffect(() => {
    console.log(values);
  });
  return (
    <>
      <div className={styles.frFormSwitch}>
        <FormControlLabel
          labelPlacement="start"
          control={
            <Switch
              checked={showCalendarId}
              onChange={() => {
                setFieldValue('showCalendarId', !showCalendarId);
                setFieldValue('calendarId', '');
              }}
            />
          }
          label="Would you like to select a different calendar to your primary calendar?"
        />
      </div>
      {showCalendarId && (
        <FrTextInput
          className={styles.frFormTextInput}
          disabled={!showCalendarId}
          id="calendarId"
          name="calendarId"
          label="Alternative calendarId"
          value={values.calendarId}
          fullWidth
        />
      )}
    </>
  );
};

export default CalendarId;
