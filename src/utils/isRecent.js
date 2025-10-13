import dayjs from "dayjs";


 function isRecent(date, { threshold = 5, unit = "minute" } = {}) {
  if (!date) return false;
  return dayjs().diff(dayjs(date), unit) <= threshold;
}
export default isRecent;