import { useState } from 'react';
import DateInput from '../atoms/FrDateInput';
import FrSelectInput from '../atoms/FrSelectInput';
import styles from '../../../page.module.scss';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

import Modal from '@mui/material/Modal';

const Dates = ({ value }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className={styles.frFormDateWrapper}>
      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="date-modal" aria-describedby="date-modal">
        <div className={styles.frModal}>
          <h1>Random vs Select</h1>
          <p>You may want to randomise when your event is created and added to your calendar.</p>
          <p>
            We will select a day from the current month. If that day has already past, it will be added to the following
            month.
          </p>
          <p>By selecting random, an all day event will be created and added.</p>
          <p>
            <strong>Why would I want random?</strong> Well you may want to set a friendly reminder for you self to
            message a loved one a kind message. You want it to be a date in the future and to be totally random so that
            the messages timing is totally unpredictable.
          </p>
          <Tooltip
            sx={{ position: 'absolute', top: 0, right: 0 }}
            title="Close modal"
            onClick={() => {
              handleCloseModal();
            }}
          >
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Modal>
      <div className={styles.frFormDateWrapperQuestion}>
        <h3>Do you want random dates or to select them yourself?</h3>
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
        value={value.dateSelector}
        fullWidth
        data={['Random', 'Selected']}
      />
      {value.dateSelector === 'selected' ? (
        <>
          <p>Please fill in the fields below:</p>
          <DateInput
            inputOneId="eventStartDate"
            inputOneLabel="Start Date"
            inputOneValue={value.eventStartDate}
            inputTwoId="eventStartTime"
            inputTwoLabel="Start Time"
            inputTwoValue={value.eventStartTime}
            selectId="eventStartTimeZone"
            selectLabel="Start Time Zone"
            selectValue={value.eventStartTimeZone}
          />
          <DateInput
            inputOneId="eventEndDate"
            inputOneLabel="End Date"
            inputOneValue={value.eventEndDate}
            inputTwoId="eventEndTime"
            inputTwoLabel="End Time"
            inputTwoValue={value.eventEndTime}
            selectId="eventEndTimeZone"
            selectLabel="End Time Zone"
            selectValue={value.eventEndTimeZone}
          />
        </>
      ) : null}
    </div>
  );
};

export default Dates;
