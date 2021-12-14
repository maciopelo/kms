const DATE = new Date();

export const getCurrentDayObject = (date) => {
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
};

export const getUrlDateFormat = (date) => {
  let result;
  result = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}/`;
  return result;
};

export const getDBDateFormat = (date) => {
  let result;
  result = `${date.getFullYear()}-${
    date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
  return result;
};

export const getFormDateFormat = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};

export const getCalendarDate = (date) => {
  let result;
  result = `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}.${
    date.getMonth() < 10 ? "0" + date.getMonth() + 1 : date.getMonth() + 1
  }.${date.getFullYear()}`;
  return result;
};

export const getTime = (date) => {
  let result;

  result = `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;
  return result;
};

export const getDateAndTimeString = (date) => {
  return getCalendarDate(date) + " | " + getTime(date);
};

const isLeapYear = (year) => {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) return true;
  return false;
};

export const months = [
  { name: "Styczeń", days: 31 },
  { name: "Luty", days: isLeapYear(DATE) ? 29 : 28 },
  { name: "Marzec", days: 31 },
  { name: "Kwiecień", days: 30 },
  { name: "Maj", days: 31 },
  { name: "Czerwiec", days: 30 },
  { name: "Lipiec", days: 31 },
  { name: "Sierpień", days: 31 },
  { name: "Wrzesień", days: 30 },
  { name: "Październik", days: 31 },
  { name: "Listopad", days: 30 },
  { name: "Grudzień", days: 31 },
];

export const days = ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "So"];
