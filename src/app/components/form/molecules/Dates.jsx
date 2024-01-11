import { useState } from 'react';
import FrTextInput from '../atoms/FrTextInput';
import FrSelectInput from '../atoms/FrSelectInput';
import styles from '../../../page.module.scss';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

import FrModal from '../../../utils/FrModal';

const Dates = ({ values }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className={styles.frFormDateWrapper}>
      <FrModal
        open={openModal}
        handleClose={handleCloseModal}
        ariaLabel="date-modal"
        heading={`<h1>Random vs Select</h1>`}
        description={`<p>You may want to randomise when your event is created and added to your calendar.</p>
          <p>
            We will select a day from the current month. If that day has already past, it will be added to the following
            month.
          </p>
          <p>
            <strong>Why would I want random?</strong> Well you may want to set a friendly reminder for you self to
            message a loved one a kind message. You want it to be a date in the future and to be totally random so that
            the messages timing is totally unpredictable.
          </p>`}
      />
      <div className={styles.frFormDateWrapperQuestion}>
        <h3>Do you want a random date or to select it yourself?</h3>
        <Tooltip
          title="Open info modal"
          onClick={() => {
            handleOpenModal();
          }}
        >
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </div>
      <FrSelectInput
        className={styles.frFormTextInput}
        id="dateSelector"
        name="dateSelector"
        label="Select your method"
        value={values.dateSelector}
        fullWidth
        data={['Random', 'Selected']}
      />
      {values.dateSelector === 'selected' ? (
        <>
          <p>Please fill in the fields below:</p>
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
            <FrTextInput
              className={styles.frFormTextInput}
              id="eventEndDate"
              name="eventEndDate"
              label="End Date"
              value={values.eventEndDate}
            />
            <FrTextInput
              className={styles.frFormTextInput}
              id="eventEndTime"
              name="eventEndTime"
              label="End Time"
              value={values.eventEndTime}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Dates;
