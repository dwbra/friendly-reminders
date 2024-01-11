'use client';
import Button from '@mui/material/Button';
import { useAuthentication } from '../context/FRContext';
import styles from '../page.module.scss';

const AuthButton = () => {
  const [authentication] = useAuthentication();

  const grantPermissionsUrl = process.env.NEXT_PUBLIC_PERMISSIONS_URL;

  return !authentication.hasAccess ? (
    <div className={styles.frAuth}>
      <p>You have to be signed in to submit the form and create an event.</p>
      <a href={grantPermissionsUrl}>
        <Button variant="contained">Sign in with Google OAuth</Button>
      </a>
    </div>
  ) : (
    <p>You're signed in.</p>
  );
};

export default AuthButton;
