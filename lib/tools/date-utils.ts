/**
 * Date and time utility functions
 */

export function timestampToDate(timestamp: number): Date {
  return new Date(timestamp * 1000);
}

export function dateToTimestamp(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

export function calculateDateDifference(date1: Date, date2: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const diff = Math.abs(date2.getTime() - date1.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export function addTimeToDate(date: Date, amount: number, unit: "days" | "hours" | "minutes" | "seconds"): Date {
  const newDate = new Date(date);
  switch (unit) {
    case "days":
      newDate.setDate(newDate.getDate() + amount);
      break;
    case "hours":
      newDate.setHours(newDate.getHours() + amount);
      break;
    case "minutes":
      newDate.setMinutes(newDate.getMinutes() + amount);
      break;
    case "seconds":
      newDate.setSeconds(newDate.getSeconds() + amount);
      break;
  }
  return newDate;
}

export function calculateAge(birthDate: Date): {
  years: number;
  months: number;
  days: number;
} {
  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

export function convertTimezone(date: Date, fromTz: string, toTz: string): Date {
  // Simple timezone conversion using Intl API
  const fromDate = new Date(date.toLocaleString("en-US", { timeZone: fromTz }));
  const toDate = new Date(date.toLocaleString("en-US", { timeZone: toTz }));
  const diff = toDate.getTime() - fromDate.getTime();
  return new Date(date.getTime() + diff);
}

export function getTimezoneList(): string[] {
  return Intl.supportedValuesOf("timeZone");
}





