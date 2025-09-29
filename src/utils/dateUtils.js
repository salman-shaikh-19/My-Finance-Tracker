import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);
export const commonDate = ({ date }) => {
  // console.log(date);
  
  return dayjs(date).format("DD/MM/YYYY");
};


export const getWeekLabel = (date) => {
  // console.log('cal');
  
  const start = dayjs(date).startOf("isoWeek").format("DD MMM");
  const end = dayjs(date).endOf("isoWeek").format("DD MMM");
  return `${start} - ${end}`;
};