/**
 * A helper function to get how many days are in a month.
 * @param {Number} year
 * @param {String} month
 * @returns {Number}
 */
function calculateDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

/**
 * A helper function to generate a start and end ISO date for the event.
 * @returns {Object}
 */
export function randomiseDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Randomly pick a number that lies within the months days
  const daysInMonth = calculateDaysInMonth(year, month);
  const randomNumber = Math.floor(Math.random() * daysInMonth + 1);

  let monthValue = month;
  let newMonth = '';

  if (monthValue === '12') {
    newMonth = '01';
  } else {
    let array = monthValue.split('');
    let newVal = ++array[1];
    array[1] = newVal.toString();
    newMonth = array.join('');
  }

  let hourValue = hours;
  let newHours = ++hourValue;
  if (newHours === 23) {
    newHours = '00';
  } else {
    newHours.toString();
  }

  const timeZoneOffsetInMinutes = date.getTimezoneOffset();
  const timeZoneOffsetInHours = timeZoneOffsetInMinutes / 60;

  // Check if we've past that date already
  if (day > randomNumber) {
    //If we have, look at the next month, calculate a possible date and assign it.

    // Check how many days are in the new month and if our day doesn't fit manually set it to 9th.
    const newDaysInMonth = calculateDaysInMonth(year, newMonth);

    if (day > newDaysInMonth) {
      const isoDateStart = `${year}-${newMonth}-${'09'}T${hours}:${minutes}:${seconds}${
        timeZoneOffsetInHours >= 0 ? '+' : ''
      }${String(timeZoneOffsetInHours).padStart(2, '0')}:00`;

      const isoDateEnd = `${year}-${newMonth}-${'09'}T${newHours}:${minutes}:${seconds}${
        timeZoneOffsetInHours >= 0 ? '+' : ''
      }${String(timeZoneOffsetInHours).padStart(2, '0')}:00`;

      return { start: isoDateStart, end: isoDateEnd };
    } else {
      const isoDateStart = `${year}-${newMonth}-${day}T${hours}:${minutes}:${seconds}${
        timeZoneOffsetInHours >= 0 ? '+' : ''
      }${String(timeZoneOffsetInHours).padStart(2, '0')}:00`;

      const isoDateEnd = `${year}-${newMonth}-${day}T${newHours}:${minutes}:${seconds}${
        timeZoneOffsetInHours >= 0 ? '+' : ''
      }${String(timeZoneOffsetInHours).padStart(2, '0')}:00`;

      return { start: isoDateStart, end: isoDateEnd };
    }
  } else if (randomNumber > day) {
    // If we haven't, calculate a day in the current month and assign it.
    const isoDateStart = `${year}-${month}-${randomNumber}T${hours}:${minutes}:${seconds}${
      timeZoneOffsetInHours >= 0 ? '+' : ''
    }${String(timeZoneOffsetInHours).padStart(2, '0')}:00`;

    const isoDateEnd = `${year}-${month}-${randomNumber}T${newHours}:${minutes}:${seconds}${
      timeZoneOffsetInHours >= 0 ? '+' : ''
    }${String(timeZoneOffsetInHours).padStart(2, '0')}:00`;

    return { start: isoDateStart, end: isoDateEnd };
  } else {
    // Days are the same do something
    const newDaysInMonth = calculateDaysInMonth(year, newMonth);

    if (day > newDaysInMonth) {
      const isoDateStart = `${year}-${newMonth}-${'09'}T${hours}:${minutes}:${seconds}${
        timeZoneOffsetInHours >= 0 ? '+' : ''
      }${String(timeZoneOffsetInHours).padStart(2, '0')}:00`;

      const isoDateEnd = `${year}-${newMonth}-${'09'}T${newHours}:${minutes}:${seconds}${
        timeZoneOffsetInHours >= 0 ? '+' : ''
      }${String(timeZoneOffsetInHours).padStart(2, '0')}:00`;

      return { start: isoDateStart, end: isoDateEnd };
    } else {
      const isoDateStart = `${year}-${newMonth}-${day}T${hours}:${minutes}:${seconds}${
        timeZoneOffsetInHours >= 0 ? '+' : ''
      }${String(timeZoneOffsetInHours).padStart(2, '0')}:00`;

      const isoDateEnd = `${year}-${newMonth}-${day}T${newHours}:${minutes}:${seconds}${
        timeZoneOffsetInHours >= 0 ? '+' : ''
      }${String(timeZoneOffsetInHours).padStart(2, '0')}:00`;

      return { start: isoDateStart, end: isoDateEnd };
    }
  }
}
