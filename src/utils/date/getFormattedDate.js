import { getPaddedString } from "./getPaddedString";

export const getFormattedDate = (date) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateObj = new Date(date);
  const month = monthNames[dateObj.getMonth()];
  const day = getPaddedString(dateObj.getDate());
  const year = dateObj.getFullYear();
  const hours = getPaddedString(dateObj.getHours());
  const mins = getPaddedString(dateObj.getMinutes());
  const secs = getPaddedString(dateObj.getSeconds());

  return `${month} ${day}, ${year} ${hours}:${mins}:${secs}`;
};
