import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  const cookieStore = cookies();
  const tokens = cookieStore.get('tokens');
  const accessToken = JSON.parse(tokens.value).accessToken;

  const { calendarId, end, start, reminders, summary, description } = await request.json();

  const postEvent = async () => {
    try {
      const request = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${process.env.GOOGLE_API_KEY}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            calendarId,
            end,
            start,
            reminders,
            summary,
            description,
          }),
        }
      );

      if (!request.ok) {
        throw new Error(`HTTP error! Status: ${request.status}`);
      } else {
        const response = await request.json();
        return { message: 'Event successfully added to your calendar!', url: response.htmlLink, added: true };
      }
    } catch (error) {
      console.error('Error during POST request', error.message);
      throw error;
    }
  };

  const event = await postEvent();
  return NextResponse.json(event);
}
