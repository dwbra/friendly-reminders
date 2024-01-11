# Friendly Reminders

**A web app to add events to your Google Calendar.**

---

This is a small web application built to easily add events to your Google Calendar. I find using Googles interface sometimes annoying when you just want to quickly add an event.

Also, I liked the idea of being able to randomise when an event was added. The name Friendly Reminders came from the fact that the original idea for the application was to create events to help remind you of friendly things you should do such as message loved ones, buy someone flowers, suprise someone you care about with a gift and so on.

## Documentation

### Getting Started

Obviously, download the repo locally and then run -

```
npm i
npm run dev
```

#### Env Variables

Next you will need to create a `env.local` file to store the required environmental variables to get this application to work. All of the API keys required you can get from Google Developer Cloud. You will need to know how to configure a project and allow the calendar API.

```
GOOGLE_CLIENT_ID="XYZ"
GOOGLE_CLIENT_SECRET="XYZ"
REDIRECT_URI="http://localhost:3000"
NEXT_PUBLIC_PERMISSIONS_URL="https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/calendar.events.owned&access_type=offline&response_type=code&redirect_uri=http%3A//localhost:3000&client_id=$GOOGLE_CLIENT_ID"
GOOGLE_API_KEY="XYZ"
```

Happy coding!

Thanks,
Daniel
