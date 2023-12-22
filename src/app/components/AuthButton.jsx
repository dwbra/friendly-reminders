'use client';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useTokens } from '../context/FRContext';

const AuthButton = () => {
  const [tokens, setTokens] = useTokens();

  useEffect(() => {
    console.log(tokens);
  });

  useEffect(() => {
    const getTokens = async googleCode => {
      try {
        const request = await fetch(`/api/googleOAuth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ googleCode }),
        });

        if (!request.ok) {
          throw new Error(`Failed to exchange code for tokens. Status: ${request.status}`);
        } else {
          const googleTokens = await request.json();
          setTokens({ accessToken: googleTokens.access_token, refreshToken: googleTokens.refresh_token });
        }
      } catch (error) {
        console.error('Error during token exchange:', error.message);
        throw error;
      }
    };

    const params = new URLSearchParams(window.location.search);

    if (params.has('code')) {
      const c = params.get('code');
      getTokens(c);
    }
  }, []);

  const grantPermissionsUrl = process.env.NEXT_PUBLIC_PERMISSIONS_URL;

  return (
    <a href={grantPermissionsUrl}>
      <Button variant="contained">Grant Calendar Permissions</Button>
    </a>
  );
};

export default AuthButton;
