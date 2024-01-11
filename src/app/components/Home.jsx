'use client';
import { useEffect, useState } from 'react';
import AuthButton from './AuthButton';
import GoogleCalendarForm from './form/organisms/GoogleCalendarForm';
import { useAuthentication } from '../context/FRContext';

const Home = () => {
  const [authentication, setAuthentication] = useAuthentication();
  const [code, setCode] = useState(null);

  // Checking to see if a user has attempted an OAuth. If they have and the urls updated, set the code which will trigger
  // the subsequent getTokens function call.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.has('code')) {
      const c = params.get('code');
      setCode(c);
    }
  }, []);

  useEffect(() => {
    /**
     * A function to grab the access & refresh tokens. It makes an API call to the server, which then makes a second call
     * to retreive the tokens. This ensures env variables are secured stored on the server.
     * @param {String} googleCode The code from the url params once a user has successfully OAuthed and been redirected to the /.
     */
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
          const response = await request.json();
          setAuthentication(response);
        }
      } catch (error) {
        console.error('Error during token exchange:', error.message);
        throw error;
      }
    };

    // Only make the api call if a code exists in state.
    if (code !== null) {
      // Make API Call
      getTokens(code);
      // Clear browser of search params.
      window.history.replaceState(null, '', window.location.pathname);
      // Reset state to default.
      setCode(null);
    }
  }, [code, setAuthentication]);
  return (
    <>
      <AuthButton />
      <GoogleCalendarForm />
    </>
  );
};

export default Home;
