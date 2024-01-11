import Modal from '@mui/material/Modal';
import styles from '../page.module.scss';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import xss from 'xss';

const FrModal = ({ open, handleClose, ariaLabel, heading, description }) => {
  const sanitizedHeading = xss(heading);
  const sanitizedDescription = xss(description);
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby={ariaLabel} aria-describedby={ariaLabel}>
      <div className={styles.frModal}>
        <div dangerouslySetInnerHTML={{ __html: sanitizedHeading }} />
        <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
        <Tooltip
          sx={{ position: 'absolute', top: 0, right: 0 }}
          title="Close modal"
          onClick={() => {
            handleClose();
          }}
        >
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Modal>
  );
};

export default FrModal;
