import { NextResponse } from 'next/server';

export async function POST(request) {
  const {
    accessToken,
    calendarId = 'primary',
    end,
    start,
    originalStartTime,
    recurrence,
    reminders,
    summary,
    description,
  } = await request.json();

  const postEvent = async () => {
    try {
      const request = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
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
          originalStartTime,
          recurrence,
          reminders,
          summary,
          description,
        }),
      });

      if (!request.ok) {
        throw new Error(`HTTP error! Status: ${request.status}`);
      } else {
        const response = await request.json();
        return response.htmlLink;
      }
    } catch (error) {
      console.error('Error during POST request', error.message);
      throw error;
    }
  };

  const event = await postEvent();
  console.log(event);
  return NextResponse.json(event);
}
