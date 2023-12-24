import { useState } from 'react';
import styles from '../../../page.module.scss';
import FrTextInput from '../atoms/FrTextInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const CalendarId = ({ values }) => {
  const [calendarIdChecked, setCalendarIdChecked] = useState(false);

  const handleCalendarIdChange = event => {
    setCalendarIdChecked(event.target.checked);
  };

  return (
    <>
      <div className={styles.frFormSwitch}>
        <FormControlLabel
          labelPlacement="start"
          control={<Switch checked={calendarIdChecked} onChange={handleCalendarIdChange} />}
          label="Would you like to select a different calendar to your primary calendar?"
        />
      </div>
      {calendarIdChecked && (
        <FrTextInput
          className={styles.frFormTextInput}
          disabled={!calendarIdChecked}
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
