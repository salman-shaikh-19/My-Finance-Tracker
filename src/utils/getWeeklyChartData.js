import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);


export const getWeeklyChartData = ({ items, dateKey, valueKey, referenceDate }) => {
  if (!items || !items.length) return [];

  const startOfWeek = dayjs(referenceDate).startOf("isoWeek");
  const weekDays = {};

  for (let i = 0; i < 7; i++) {
    const day = startOfWeek.add(i, "day");
    weekDays[day.format("ddd")] = 0;
  }

  items.forEach((item) => {
    if (!item?.[dateKey]) return;
    const date = dayjs(item[dateKey]);
    const dayLabel = date.format("ddd");
    if (dayLabel in weekDays) {
      weekDays[dayLabel] += parseFloat(item[valueKey]) || 0;
    }
  });

  return Object.keys(weekDays).map((day) => ({
    day,
    total: weekDays[day],
  }));
};
