import dayjs from "dayjs";

export const commonDate = ({ date }) => {
  return dayjs(date).format("DD/MM/YYYY");
};
