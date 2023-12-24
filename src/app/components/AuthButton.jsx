'use client';
import Button from '@mui/material/Button';
import { useTokens } from '../context/FRContext';

const AuthButton = () => {
  const [tokens] = useTokens();

  const grantPermissionsUrl = process.env.NEXT_PUBLIC_PERMISSIONS_URL;

  return !tokens.accessToken ? (
    <a href={grantPermissionsUrl}>
      <Button variant="contained">Sign in with Google OAuth</Button>
    </a>
  ) : (
    <p>You're signed in.</p>
  );
};

export default AuthButton;
