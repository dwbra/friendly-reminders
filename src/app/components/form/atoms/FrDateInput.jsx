import { useState, useEffect } from 'react';
import styles from '../../../page.module.scss';
import FrTextInput from './FrTextInput';
import FrSelectInput from './FrSelectInput';

const DateInput = ({
  inputOneId,
  inputOneLabel,
  inputOneValue,
  inputTwoId,
  inputTwoLabel,
  inputTwoValue,
  selectId,
  selectLabel,
  selectValue,
}) => {
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
        id={inputOneId}
        name={inputOneId}
        label={inputOneLabel}
        value={inputOneValue}
      />
      <FrTextInput
        className={styles.frFormTextInput}
        id={inputTwoId}
        name={inputTwoId}
        label={inputTwoLabel}
        value={inputTwoValue}
      />
      <FrSelectInput
        name={selectId}
        id={selectId}
        label={selectLabel}
        value={selectValue}
        fullWidth
        data={timeZones}
        className={styles.frFormSelect}
      />
    </div>
  );
};

export default DateInput;
