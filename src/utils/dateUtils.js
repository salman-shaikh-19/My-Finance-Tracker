import dayjs from "dayjs";

export const commonDate = ({ date }) => {
  console.log(date);
  
  return dayjs(date).format("DD/MM/YYYY");
};
