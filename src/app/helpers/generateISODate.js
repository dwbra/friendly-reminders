export default function generateISODate(data) {
  // Extracting date, dateTime, and timeZone from the input data
  const { date, dateTime } = data;

  const newDate = new Date();

  const day = date.split('/')[0];
  const month = date.split('/')[1];
  const year = '20' + date.split('/')[2];

  const hours = dateTime.split(':')[0];
  const minutes = dateTime.split(':')[1];
  const seconds = dateTime.split(':')[2];

  const timeZoneOffsetInMinutes = newDate.getTimezoneOffset();
  const timeZoneOffsetInHours = timeZoneOffsetInMinutes / 60;

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timeZoneOffsetInHours >= 0 ? '+' : ''}${String(
    timeZoneOffsetInHours
  ).padStart(2, '0')}:00`;
}
