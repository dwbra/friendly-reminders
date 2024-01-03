import styles from '../../../page.module.scss';
import FrTextInput from '../atoms/FrTextInput';
import FrSelectInput from '../atoms/FrSelectInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Reminders = ({ option1, option2, showReminders, setFieldValue }) => {
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
              id={option1.method.id}
              name={option1.method.id}
              label={option1.method.label}
              value={option1.method.value}
              fullWidth
              data={['Popup', 'Email']}
            />
            <FrTextInput
              className={styles.frFormTextInput}
              disabled={!showReminders}
              id={option1.minutes.id}
              name={option1.minutes.id}
              label={option1.minutes.label}
              value={option1.minutes.value}
              fullWidth
            />
          </div>
          {option2.method.id && (
            <div>
              <FrSelectInput
                className={styles.frFormTextInput}
                disabled={!showReminders}
                id={option2.method.id}
                name={option2.method.id}
                label={option2.method.label}
                value={option2.method.value}
                fullWidth
                data={['Popup', 'Email']}
              />
              <FrTextInput
                className={styles.frFormTextInput}
                disabled={!showReminders}
                id={option2.minutes.id}
                name={option2.minutes.id}
                label={option2.minutes.label}
                value={option2.minutes.value}
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
