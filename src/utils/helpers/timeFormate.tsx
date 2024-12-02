import { minutesToHours } from "date-fns";

export const timeFormate = (number: number) => {
    const hours = minutesToHours(number);
    const minutes = number -  (hours * 60);
  return `${hours}ч ${minutes}м`
};
