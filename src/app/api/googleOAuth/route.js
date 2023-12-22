import { NextResponse } from 'next/server';

export async function POST(request) {
  const { googleCode } = await request.json();

  const requestBody = {
    code: googleCode,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    grant_type: 'authorization_code',
  };

  const tokenFetch = async () => {
    try {
      const request = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(requestBody).toString(),
      });

      if (!request.ok) {
        throw new Error(`HTTP error! Status: ${request.status}`);
      } else {
        const tokens = await request.json();
        return tokens;
      }
    } catch (error) {
      console.error('Error during token exchange:', error.message);
      throw error;
    }
  };

  const tokens = await tokenFetch();
  //   console.log(tokens);
  return NextResponse.json(tokens);
}
