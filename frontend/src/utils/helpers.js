export const getCurrentDayObject = (date) => {
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
};

export const getCalendarDate = (date) => {
  let result;
  result = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  return result;
};

export const getTime = (date) => {
  let result;

  result = `${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;
  return result;
};

export const getDateAndTimeString = (date) => {
  return getCalendarDate(date) + " | " + getTime(date);
};
