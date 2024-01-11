'use server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

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
        cookies().set(
          'tokens',
          JSON.stringify({
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            accessExpiry: tokens.expires_in,
          }),
          { httpOnly: true, sameSite: 'lax' }
        );
        return { message: 'Succesfully retrieved tokens.', hasAccess: true };
      }
    } catch (error) {
      console.error('Error during token exchange:', error.message);
      throw error;
    }
  };

  const tokens = await tokenFetch();
  return NextResponse.json(tokens);
}
