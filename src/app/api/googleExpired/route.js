import { NextResponse } from 'next/server';

export async function POST(request) {
  const { refreshToken } = await request.json();

  const requestBody = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  };

  const fetchNewAccessToken = async () => {
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
        return tokens.access_token;
      }
    } catch (error) {
      console.error('Error getting new access_token:', error.message);
      throw error;
    }
  };

  const newAccessToken = await fetchNewAccessToken();
  //   console.log(newAccessToken);
  return NextResponse.json(newAccessToken);
}
