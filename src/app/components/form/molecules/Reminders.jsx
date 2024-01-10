import styles from '../../../page.module.scss';
import FrTextInput from '../atoms/FrTextInput';
import FrSelectInput from '../atoms/FrSelectInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Reminders = ({ values, showReminders, setFieldValue }) => {
  return (
    <>
      <div className={styles.frFormSwitch}>
        <FormControlLabel
          labelPlacement="start"
          control={
            <Switch
              checked={showReminders}
              onChange={() => {
                setFieldValue('showReminders', !showReminders);
                setFieldValue(option1.method.id, '');
                setFieldValue(option1.minutes.id, '');
                setFieldValue(option2.method.id, '');
                setFieldValue(option2.minutes.id, '');
              }}
            />
          }
          label={
            <>
              <p>
                Would you like to set <strong>custom</strong> reminder alerts for this event? We will automatically use
                the default reminders if you do not choose to set custom ones.
              </p>
            </>
          }
        />
      </div>
      {showReminders && (
        <div className={styles.frFormReminders}>
          <div>
            <FrSelectInput
              className={styles.frFormTextInput}
              disabled={!showReminders}
              id="reminderOneMethod"
              name="reminderOneMethod"
              label="Method"
              value={values.reminderOneMethod}
              fullWidth
              data={['Popup', 'Email']}
            />
            <FrTextInput
              className={styles.frFormTextInput}
              disabled={!showReminders}
              id="reminderOneMinutes"
              name="reminderOneMinutes"
              label="Minutes before event"
              value={values.reminderOneMinutes}
              fullWidth
            />
          </div>
          {option2.method.id && (
            <div>
              <FrSelectInput
                className={styles.frFormTextInput}
                disabled={!showReminders}
                id="reminderTwoMethod"
                name="reminderTwoMethod"
                label="Method"
                value={values.reminderTwoMethod}
                fullWidth
                data={['Popup', 'Email']}
              />
              <FrTextInput
                className={styles.frFormTextInput}
                disabled={!showReminders}
                id="reminderTwoMinutes"
                name="reminderTwoMinutes"
                label="Minutes before event"
                value={values.reminderTwoMinutes}
                fullWidth
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Reminders;
