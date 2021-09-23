export const wasInLastHour = (someDate: Date) => {
  const now = new Date();
  const diff = now.getTime() - someDate.getTime();
  return diff < 60000;
};

export const isToday = (someDate: Date) => {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

export const wasYesterday = (someDate: Date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  return (
    someDate.getTime() >= yesterday.getTime() &&
    someDate.getTime() < todayStart.getTime()
  );
};

export const wasInPast7Days = (someDate: Date) => {
  const today = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);
  oneWeekAgo.setHours(0, 0, 0, 0);
  return someDate.getTime() > oneWeekAgo.getTime();
};

export const wasInThisYear = (someDate: Date) => {
  const today = new Date();
  return someDate.getFullYear() == today.getFullYear();
};

export const dayOfWeek = (someDate: Date) => {
  const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const day = someDate.getDay();
  return DAYS_OF_WEEK[day];
};

export const getMonthName = (someDate: Date) => {
  const MONTHS_OF_YEAR = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  const month = someDate.getMonth();
  return MONTHS_OF_YEAR[month];
};

export const getAmPm = (someDate: Date) => {
  const hours = someDate.getHours();
  if (hours >= 12) {
    return 'pm';
  }
  return 'am';
};

export const getMinutesAgo = (someDate: Date) => {
  const now = new Date();
  const diff = now.getTime() - someDate.getTime();
  return Math.round(diff / 60000);
};

export const getReadableMinutes = (date: Date) => {
  const minutes = date.getMinutes();
  if (minutes < 10) {
    return `0${minutes}`;
  } else {
    return minutes.toString();
  }
};

export const getReadableHours = (date: Date) => {
  const hours = date.getHours();
  if (hours > 12) {
    return (hours - 12).toString();
  } else {
    return hours.toString();
  }
};
