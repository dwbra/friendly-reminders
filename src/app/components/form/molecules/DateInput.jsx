import { useState, useEffect } from 'react';
import styles from '../../../page.module.scss';
import FrTextInput from '../atoms/FrTextInput';
import FrSelectInput from '../atoms/FrSelectInput';

const DateInput = ({ values }) => {
  const [timeZones, setTimeZones] = useState([]);
  useEffect(() => {
    const getTimeZones = async () => {
      const request = await fetch('https://worldtimeapi.org/api/timezone');
      try {
        if (!request.ok) {
          throw new Error(`Failed to get timezones. Status: ${request.status}`);
        } else {
          const timezones = await request.json();
          setTimeZones(timezones);
        }
      } catch (error) {
        console.error('Error getting timezones:', error.message);
        throw error;
      }
    };
    getTimeZones();
  }, []);

  return (
    <div className={styles.frFormDate}>
      <FrTextInput
        className={styles.frFormTextInput}
        id="eventStartDate"
        name="eventStartDate"
        label="Start Date"
        value={values.eventStartDate}
      />
      <FrTextInput
        className={styles.frFormTextInput}
        id="eventStartTime"
        name="eventStartTime"
        label="Start Time"
        value={values.eventStartTime}
      />
      <FrSelectInput
        name="eventStartTimeZone"
        id="eventStartTimeZone"
        label="Start Time Zone"
        value={values.eventStartTimeZone}
        fullWidth
        data={timeZones}
        className={styles.frFormSelect}
      />
    </div>
  );
};

export default DateInput;
